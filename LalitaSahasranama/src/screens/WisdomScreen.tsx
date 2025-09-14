import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { spiritualQuotes, festivals } from '../data/sahasranamData';
import BackgroundGradient from '../components/BackgroundGradient';
import SacredCard from '../components/SacredCard';

const WisdomScreen: React.FC = () => {
  const { colors } = useTheme();
  const { favorites } = useAudio();
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % spiritualQuotes.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setCurrentQuote(prev => (prev + 1) % spiritualQuotes.length);
  };

  return (
    <BackgroundGradient>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Sacred Wisdom */}
        <SacredCard style={styles.wisdomCard}>
          <View style={styles.wisdomHeader}>
            <Ionicons name="book" size={20} color={colors.accent} />
            <Text style={[styles.wisdomTitle, { color: colors.accent }]}>
              Sacred Wisdom
            </Text>
            <TouchableOpacity onPress={nextQuote}>
              <Ionicons name="refresh" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.quoteContainer}>
            <Text style={[styles.quoteSanskrit, { color: colors.primary }]}>
              {spiritualQuotes[currentQuote].sanskrit}
            </Text>
            <Text style={[styles.quoteTransliteration, { color: colors.text }]}>
              {spiritualQuotes[currentQuote].transliteration}
            </Text>
            <Text style={[styles.quoteMeaning, { color: colors.textSecondary }]}>
              {spiritualQuotes[currentQuote].meaning}
            </Text>
            <Text style={[styles.quoteSource, { color: colors.textSecondary }]}>
              — {spiritualQuotes[currentQuote].source}
            </Text>
          </View>

          {/* Quote indicators */}
          <View style={styles.indicators}>
            {spiritualQuotes.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentQuote(index)}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentQuote ? colors.primary : colors.border
                  }
                ]}
              />
            ))}
          </View>
        </SacredCard>

        {/* Sacred Festivals */}
        <SacredCard style={styles.festivalsCard}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Sacred Festivals
          </Text>
          {festivals.map((festival, index) => (
            <View key={index} style={styles.festivalItem}>
              <View style={[styles.festivalBorder, { backgroundColor: colors.accent }]} />
              <View style={styles.festivalContent}>
                <Text style={[styles.festivalName, { color: colors.text }]}>
                  {festival.name}
                </Text>
                <Text style={[styles.festivalDate, { color: colors.textSecondary }]}>
                  {festival.date}
                </Text>
                <Text style={[styles.festivalDescription, { color: colors.textSecondary }]}>
                  {festival.description}
                </Text>
                <Text style={[styles.festivalSignificance, { color: colors.accent }]}>
                  {festival.significance}
                </Text>
              </View>
            </View>
          ))}
        </SacredCard>

        {/* Spiritual Journey Stats */}
        <SacredCard style={styles.journeyCard}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Your Spiritual Journey
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
              <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
                Keep up the daily practice!
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Reading Sessions</Text>
              <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
                Hours of divine connection
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>
                {favorites.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Favorite Verses</Text>
              <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
                Sacred names close to heart
              </Text>
            </View>
          </View>
        </SacredCard>

        {/* Meditation Guide */}
        <SacredCard style={styles.meditationCard}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>
            Daily Practice
          </Text>
          <View style={styles.practiceItem}>
            <Ionicons name="flower" size={24} color={colors.accent} />
            <View style={styles.practiceContent}>
              <Text style={[styles.practiceTitle, { color: colors.text }]}>
                Morning Recitation
              </Text>
              <Text style={[styles.practiceDescription, { color: colors.textSecondary }]}>
                Begin your day by reciting the divine names with devotion and focus.
              </Text>
            </View>
          </View>
          
          <View style={styles.practiceItem}>
            <Ionicons name="heart" size={24} color={colors.accent} />
            <View style={styles.practiceContent}>
              <Text style={[styles.practiceTitle, { color: colors.text }]}>
                Contemplative Reading
              </Text>
              <Text style={[styles.practiceDescription, { color: colors.textSecondary }]}>
                Reflect deeply on the meaning of each name and its spiritual significance.
              </Text>
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
  wisdomCard: {
    marginTop: 10,
    marginBottom: 16,
  },
  wisdomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  wisdomTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  quoteContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteSanskrit: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteTransliteration: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  quoteMeaning: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  quoteSource: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  festivalsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  festivalItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  festivalBorder: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  festivalContent: {
    flex: 1,
  },
  festivalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  festivalDate: {
    fontSize: 12,
    marginBottom: 8,
  },
  festivalDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  festivalSignificance: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  journeyCard: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statBox: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  statSubtext: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  meditationCard: {
    marginBottom: 20,
  },
  practiceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  practiceContent: {
    flex: 1,
    marginLeft: 12,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  practiceDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default WisdomScreen;