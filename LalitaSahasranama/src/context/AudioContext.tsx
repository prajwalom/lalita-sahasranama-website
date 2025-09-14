import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AudioContextType {
  isPlaying: boolean;
  currentVerse: number;
  autoScroll: boolean;
  scrollSpeed: number;
  volume: number;
  shuffle: boolean;
  favorites: number[];
  playPause: () => void;
  nextVerse: () => void;
  prevVerse: () => void;
  setCurrentVerse: (verse: number) => void;
  setAutoScroll: (auto: boolean) => void;
  setScrollSpeed: (speed: number) => void;
  setVolume: (vol: number) => void;
  setShuffle: (shuffle: boolean) => void;
  toggleFavorite: (verse: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [volume, setVolume] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadSettings();
    setupAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoScroll && isPlaying) {
      interval = setInterval(() => {
        nextVerse();
      }, scrollSpeed * 1000);
    }
    return () => clearInterval(interval);
  }, [autoScroll, isPlaying, scrollSpeed, shuffle]);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('audioSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        setAutoScroll(parsed.autoScroll ?? true);
        setScrollSpeed(parsed.scrollSpeed ?? 5);
        setVolume(parsed.volume ?? 70);
        setShuffle(parsed.shuffle ?? false);
      }
      
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        autoScroll,
        scrollSpeed,
        volume,
        shuffle,
      };
      await AsyncStorage.setItem('audioSettings', JSON.stringify(settings));
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextVerse = () => {
    if (shuffle) {
      setCurrentVerse(Math.floor(Math.random() * 1000));
    } else {
      setCurrentVerse(prev => (prev + 1) % 1000);
    }
  };

  const prevVerse = () => {
    if (shuffle) {
      setCurrentVerse(Math.floor(Math.random() * 1000));
    } else {
      setCurrentVerse(prev => (prev - 1 + 1000) % 1000);
    }
  };

  const toggleFavorite = (verse: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(verse)
        ? prev.filter(v => v !== verse)
        : [...prev, verse];
      
      // Save to AsyncStorage
      AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  useEffect(() => {
    saveSettings();
  }, [autoScroll, scrollSpeed, volume, shuffle, favorites]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentVerse,
        autoScroll,
        scrollSpeed,
        volume,
        shuffle,
        favorites,
        playPause,
        nextVerse,
        prevVerse,
        setCurrentVerse,
        setAutoScroll,
        setScrollSpeed,
        setVolume,
        setShuffle,
        toggleFavorite,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};