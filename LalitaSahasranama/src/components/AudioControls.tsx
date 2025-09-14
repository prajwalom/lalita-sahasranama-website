import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import SacredCard from './SacredCard';

const AudioControls: React.FC = () => {
  const {
    isPlaying,
    currentVerse,
    autoScroll,
    scrollSpeed,
    volume,
    shuffle,
    playPause,
    nextVerse,
    prevVerse,
    setAutoScroll,
    setScrollSpeed,
    setVolume,
    setShuffle,
  } = useAudio();
  
  const { colors } = useTheme();

  return (
    <SacredCard style={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>Controls</Text>
      
      {/* Playback Controls */}
      <View style={styles.playbackControls}>
        <TouchableOpacity onPress={prevVerse} style={styles.controlButton}>
          <Ionicons name="play-skip-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={playPause} style={[styles.playButton, { backgroundColor: colors.primary }]}>
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={28} 
            color={colors.background} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={nextVerse} style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          Verse {currentVerse + 1} of 1000
        </Text>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: colors.primary,
                width: `${((currentVerse + 1) / 1000) * 100}%`
              }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          {Math.round(((currentVerse + 1) / 1000) * 100)}% complete
        </Text>
      </View>

      {/* Settings */}
      <View style={styles.settingsContainer}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Auto Scroll</Text>
          <TouchableOpacity 
            onPress={() => setAutoScroll(!autoScroll)}
            style={[styles.toggle, { backgroundColor: autoScroll ? colors.primary : colors.border }]}
          >
            <View style={[styles.toggleThumb, { 
              backgroundColor: colors.surface,
              transform: [{ translateX: autoScroll ? 20 : 2 }]
            }]} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Speed: {scrollSpeed}s</Text>
          <Slider
            style={styles.slider}
            minimumValue={2}
            maximumValue={30}
            value={scrollSpeed}
            onValueChange={setScrollSpeed}
            step={1}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
            thumbStyle={{ backgroundColor: colors.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>Shuffle</Text>
          <TouchableOpacity 
            onPress={() => setShuffle(!shuffle)}
            style={[styles.toggle, { backgroundColor: shuffle ? colors.primary : colors.border }]}
          >
            <View style={[styles.toggleThumb, { 
              backgroundColor: colors.surface,
              transform: [{ translateX: shuffle ? 20 : 2 }]
            }]} />
          </TouchableOpacity>
        </View>
      </View>
    </SacredCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    padding: 12,
    marginHorizontal: 8,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  settingsContainer: {
    gap: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    flex: 1,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
  },
  slider: {
    flex: 1,
    marginLeft: 16,
  },
});

export default AudioControls;