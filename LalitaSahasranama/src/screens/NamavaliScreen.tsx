import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { sahasranamData } from '../data/sahasranamData';
import BackgroundGradient from '../components/BackgroundGradient';
import SacredCard from '../components/SacredCard';

const NamavaliScreen: React.FC = () => {
  const { colors } = useTheme();
  const { setCurrentVerse } = useAudio();

  const renderNameItem = ({ item, index }: { item: any; index: number }) => (
    <SacredCard 
      style={styles.nameCard}
      onPress={() => setCurrentVerse(index)}
    >
      <View style={styles.nameContent}>
        <Text style={[styles.nameNumber, { color: colors.textSecondary }]}>
          #{index + 1}
        </Text>
        <View style={styles.nameTexts}>
          <Text style={[styles.sanskrit, { color: colors.primary }]}>
            {item.sanskrit}
          </Text>
          <Text style={[styles.transliteration, { color: colors.text }]}>
            {item.transliteration}
          </Text>
        </View>
      </View>
    </SacredCard>
  );

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Sacred Names List
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Tap any name to navigate to it
        </Text>
        
        <FlatList
          data={sahasranamData}
          renderItem={renderNameItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          numColumns={1}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  nameCard: {
    marginBottom: 8,
  },
  nameContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameNumber: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
  },
  nameTexts: {
    flex: 1,
    marginLeft: 12,
  },
  sanskrit: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transliteration: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default NamavaliScreen;