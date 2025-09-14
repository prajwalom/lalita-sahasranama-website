import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface SacredCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

const SacredCard: React.FC<SacredCardProps> = ({ children, onPress, style }) => {
  const { colors, isDark } = useTheme();

  const gradientColors = isDark
    ? ['rgba(255, 215, 0, 0.1)', 'rgba(255, 165, 0, 0.05)']
    : ['rgba(217, 119, 6, 0.1)', 'rgba(234, 88, 12, 0.05)'];

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent onPress={onPress} style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.card, { borderColor: colors.border }]}>
          {children}
        </View>
      </LinearGradient>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: 8,
  },
  gradient: {
    borderRadius: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

export default SacredCard;