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
import Initial from './screens/Home'
import Medication from './screens/Medication'
import History from './screens/History'
import Statistics from './screens/Statistics'
import ScheduleAdjustment from './screens/ScheduleAdjustment'


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
          tabBarLabel: 'Gerenciar Horários',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
