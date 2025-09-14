import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { sahasranamData } from '../data/sahasranamData';
import BackgroundGradient from '../components/BackgroundGradient';
import SacredCard from '../components/SacredCard';

const MeaningsScreen: React.FC = () => {
  const { colors } = useTheme();
  const { favorites, toggleFavorite } = useAudio();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = sahasranamData.filter(item =>
    item.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderVerseItem = ({ item, index }: { item: any; index: number }) => (
    <SacredCard style={styles.verseCard}>
      <View style={styles.verseHeader}>
        <Text style={[styles.verseNumber, { color: colors.textSecondary }]}>
          #{index + 1}
        </Text>
        <Ionicons 
          name={favorites.includes(index) ? "heart" : "heart-outline"} 
          size={20} 
          color={favorites.includes(index) ? "#FF6B6B" : colors.textSecondary}
          onPress={() => toggleFavorite(index)}
        />
      </View>
      
      <Text style={[styles.sanskrit, { color: colors.primary }]}>
        {item.sanskrit}
      </Text>
      
      <Text style={[styles.transliteration, { color: colors.text }]}>
        {item.transliteration}
      </Text>
      
      <Text style={[styles.meaning, { color: colors.textSecondary }]}>
        {item.meaning}
      </Text>
    </SacredCard>
  );

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search verses..."
            placeholderTextColor={colors.textSecondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Results */}
        <FlatList
          data={filteredData.slice(0, 20)} // Limit for performance
          renderItem={renderVerseItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  verseCard: {
    marginBottom: 12,
  },
  verseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  verseNumber: {
    fontSize: 12,
    fontWeight: '600',
  },
  sanskrit: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transliteration: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  meaning: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MeaningsScreen;