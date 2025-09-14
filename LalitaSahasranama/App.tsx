import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SahasranamaScreen from './src/screens/SahasranamaScreen';
import MeaningsScreen from './src/screens/MeaningsScreen';
import NamavaliScreen from './src/screens/NamavaliScreen';
import WisdomScreen from './src/screens/WisdomScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { AudioProvider } from './src/context/AudioContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AudioProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: keyof typeof Ionicons.glyphMap;

                  if (route.name === 'Sahasranama') {
                    iconName = focused ? 'flower' : 'flower-outline';
                  } else if (route.name === 'Meanings') {
                    iconName = focused ? 'book' : 'book-outline';
                  } else if (route.name === 'Namavali') {
                    iconName = focused ? 'list' : 'list-outline';
                  } else if (route.name === 'Wisdom') {
                    iconName = focused ? 'star' : 'star-outline';
                  } else {
                    iconName = 'help-outline';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FFD700',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                  backgroundColor: '#1a1a2e',
                  borderTopColor: '#333',
                  paddingBottom: 5,
                  height: 60,
                },
                headerStyle: {
                  backgroundColor: '#1a1a2e',
                },
                headerTintColor: '#FFD700',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 18,
                },
              })}
            >
              <Tab.Screen 
                name="Sahasranama" 
                component={SahasranamaScreen}
                options={{ title: 'श्री ललिता सहस्रनाम' }}
              />
              <Tab.Screen 
                name="Meanings" 
                component={MeaningsScreen}
                options={{ title: 'Meanings' }}
              />
              <Tab.Screen 
                name="Namavali" 
                component={NamavaliScreen}
                options={{ title: 'Namavali' }}
              />
              <Tab.Screen 
                name="Wisdom" 
                component={WisdomScreen}
                options={{ title: 'Wisdom' }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </AudioProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}