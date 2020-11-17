// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

// export default function App() {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();

//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <SafeAreaProvider>
//         <Navigation colorScheme={colorScheme} />
//         <StatusBar />
//       </SafeAreaProvider>
//     );
//   }
// }

import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Initial from './Home'
import Medication from './Medication'
import History from './History'
import Statistics from './Statistics'
import ScheduleAdjustment from './ScheduleAdjustment'

import axios from 'axios';
import { goForAxios, signIn }  from '../services/auth'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#fff',
        activeBackgroundColor: '#89C5C6'
      }}
    >
      <Tab.Screen
        name="init"
        component={Initial}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="medication"
        component={Medication}
        options={{
          tabBarLabel: 'Medicações',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="notes-medical" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="statistics"
        component={Statistics}
        options={{
          tabBarLabel: 'Estatísticas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-line" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="dailyAdjustments"
        component={ScheduleAdjustment}
        options={{
          tabBarLabel: 'Últimas marcações',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarLabel: 'Histórico Retiradas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  console.log('authenticated')
  return (
    <MyTabs />
  );
}
