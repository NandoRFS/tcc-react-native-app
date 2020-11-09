import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Settings from './Settings'
// import {Card} from 'react-native-shadow-cards';

import Constants from "expo-constants";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards'

const separator = () => (
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)

function HomeScreen({ navigation }) {
  return (
    <View style={{flex: 1,paddingTop: Constants.statusBarHeight}}>
        <ScrollView>
    <View style={styles.container}>
      <View style={styles.settingCardContainer}>
        <MaterialCommunityIcons 
          name="tune" 
          color={'black'} 
          size={30}
          onPress={() => navigation.navigate('Settings')} 
        />
      </View>
      <View style={styles.userCardContainer}>
        <MaterialCommunityIcons name="account-circle" color={'black'} size={70} />
        
        <Text style={{...styles.title, ...styles.userName}}>
          Nome Do Usuário
        </Text>
        
      </View>

      {separator()}

      <View style={styles.userCardContainer}>        
        <View style={styles.viewCalendarMedicated}>
          <Text style={styles.title}>Próxima Retirada</Text>
          <Text style={{fontSize: 40, color: 'gray'}}>25/12</Text>
        </View>

        <View style={{...styles.calendarMedicated, alignItems: 'center'}}>
          <FontAwesome5 
            name="calendar-times" 
            color={'black'} 
            size={50} 
            // onPress={() => navigation.navigate('Settings')}  
          />
          <Text style={{fontSize: 12}}>Medicou-se Hoje</Text>

        </View>
      </View>

      {separator()}
      {/* CARD MEDICAÇÕES DO DIA */}

      <Card style={{width: '87%'}}>
        <CardTitle
          title={<Text style={styles.title}>Medicações do dia</Text>}
          subtitleAbove={true}
        />
        <CardContent>
          {[0,1,2,3].map(item => {
            return (
            <Text>
              <FontAwesome5 
              name="chevron-circle-right" 
              color={'black'} 
              size={12}
              // onPress={() => navigation.navigate('Settings')}  
            />
              {` Remédio ${item}`}
            </Text>
            )
          })}
          
        </CardContent>
        {/* <CardContent text="Clifton, Western Cape" /> */}
        <CardAction 
          style={{flex: 1, justifyContent: 'flex-end', marginRight: 12, marginBottom: 12}}
          separator={false} 
          inColumn={false}>
          <FontAwesome5 
            name="check-circle" 
            color={'black'} 
            size={45}
            // onPress={() => navigation.navigate('Settings')}  
          />
        </CardAction>
      </Card>

      {/*FIM CARD MEDICAÇÕES DO DIA */}


      {/* {separator()}
 
      <Card style={styles.userCard}>
        <Text style={styles.title}>Dicas/Sugestões</Text>
        <Text>Blablabla...</Text>
      </Card>

      {separator()}
 
      <Card style={styles.userCard}>
        <Text style={styles.title}>Dicas/Sugestões</Text>
        <Text>Blablabla...</Text>
      </Card> */}
 
      {separator()}


    </View>
      </ScrollView>
    </View>
      
  )
}


const SettingsStack = createStackNavigator();

export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen 
        options={{
          // headerTransparent: true,
          headerShown: false
        }}
        name="Home"
        component={HomeScreen} 
      />
      <SettingsStack.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          title: 'Configurações'
        }}  
      />
    </SettingsStack.Navigator>
  );
}


const styles = StyleSheet.create({
  userConfig: {
    marginTop: 10,
    position: 'absolute',
    left: 2, // Keep some space between your left border and Image
  },
  viewCalendarMedicated: {
    marginLeft: 20
  },
  calendarMedicated: {
    marginLeft: 100,
    marginTop: 10
  },
  settingCardContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    paddingRight: 20,
    marginHorizontal: 20,
    marginLeft: 70
  },
  userCardContainer: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'flex-start'
  },
  userName: {
    marginTop: 25,
    width:'100%'
  },
  userCard: {
    padding: 10
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    alignContent: 'center',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '85%',
  },
});
