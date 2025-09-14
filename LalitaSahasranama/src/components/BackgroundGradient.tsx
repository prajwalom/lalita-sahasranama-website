import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface BackgroundGradientProps {
  children: React.ReactNode;
  style?: any;
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ children, style }) => {
  const { isDark } = useTheme();

  const gradientColors = isDark
    ? ['#0F0F23', '#1A1A2E', '#16213E']
    : ['#FFF8E7', '#FED7AA', '#FDBA74'];

  return (
    <LinearGradient
      colors={gradientColors}
      style={[styles.gradient, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default BackgroundGradient;