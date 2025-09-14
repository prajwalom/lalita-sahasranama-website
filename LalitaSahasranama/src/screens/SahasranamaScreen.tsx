import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { sahasranamData } from '../data/sahasranamData';
import BackgroundGradient from '../components/BackgroundGradient';
import SacredCard from '../components/SacredCard';
import AudioControls from '../components/AudioControls';

const SahasranamaScreen: React.FC = () => {
  const { colors, toggleTheme, isDark } = useTheme();
  const { currentVerse, favorites, toggleFavorite } = useAudio();
  const [dailyVerse, setDailyVerse] = useState(0);

  useEffect(() => {
    // Set daily verse based on current date
    const today = new Date().getDate();
    setDailyVerse(today % sahasranamData.length);
  }, []);

  const currentVerseData = sahasranamData[currentVerse] || sahasranamData[0];
  const dailyVerseData = sahasranamData[dailyVerse];

  const showSettings = () => {
    Alert.alert(
      'Settings',
      'Choose an option',
      [
        { text: `Switch to ${isDark ? 'Light' : 'Dark'} Theme`, onPress: toggleTheme },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <BackgroundGradient>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.primary }]}>
            ॐ श्री ललिता सहस्रनाम
          </Text>
          <TouchableOpacity onPress={showSettings} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Daily Verse Banner */}
        <SacredCard style={styles.dailyBanner}>
          <View style={styles.dailyHeader}>
            <Ionicons name="star" size={20} color={colors.accent} />
            <Text style={[styles.dailyTitle, { color: colors.accent }]}>
              Today's Divine Name
            </Text>
          </View>
          <Text style={[styles.dailySanskrit, { color: colors.text }]}>
            {dailyVerseData.sanskrit}
          </Text>
          <Text style={[styles.dailyTransliteration, { color: colors.textSecondary }]}>
            {dailyVerseData.transliteration}
          </Text>
        </SacredCard>

        {/* Audio Controls */}
        <AudioControls />

        {/* Current Verse */}
        <SacredCard style={styles.verseCard}>
          <View style={styles.verseHeader}>
            <Text style={[styles.verseNumber, { color: colors.textSecondary }]}>
              Verse {currentVerse + 1}
            </Text>
            <TouchableOpacity 
              onPress={() => toggleFavorite(currentVerse)}
              style={styles.favoriteButton}
            >
              <Ionicons 
                name={favorites.includes(currentVerse) ? "heart" : "heart-outline"} 
                size={24} 
                color={favorites.includes(currentVerse) ? "#FF6B6B" : colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.sanskrit, { color: colors.primary }]}>
            {currentVerseData.sanskrit}
          </Text>
          
          <Text style={[styles.transliteration, { color: colors.text }]}>
            {currentVerseData.transliteration}
          </Text>
          
          <Text style={[styles.meaning, { color: colors.textSecondary }]}>
            {currentVerseData.meaning}
          </Text>
        </SacredCard>

        {/* Stats */}
        <SacredCard style={styles.statsCard}>
          <Text style={[styles.statsTitle, { color: colors.primary }]}>
            Your Spiritual Journey
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>
                {favorites.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorites</Text>
            </View>
          </View>
        </SacredCard>
      </ScrollView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  dailyBanner: {
    marginBottom: 16,
  },
  dailyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dailySanskrit: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dailyTransliteration: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  verseCard: {
    marginBottom: 16,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  verseNumber: {
    fontSize: 14,
  },
  favoriteButton: {
    padding: 4,
  },
  sanskrit: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  transliteration: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  meaning: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default SahasranamaScreen;