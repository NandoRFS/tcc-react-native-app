import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Constants from "expo-constants";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards'
import { ScrollView } from 'react-native';

const separator = () => (
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)

export default function History() {
  return (
    <View style={{flex: 1,paddingTop: Constants.statusBarHeight}}>
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.userCardContainer}>
            <MaterialCommunityIcons name="history" color={'black'} size={50} />

            <Text style={{...styles.title, ...styles.userName}}>
                Histórico de Retiradas
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
          
          <View style={{flex: 1, justifyContent:'flex-end', width: '100%'}}>
            <Text style={{  ...styles.title, marginStart: '10%'}}>Últimas Retiradas</Text>
          </View>

          {separator()}
          
          {
            [0,1,2,3,4,5].map(item => {
              return (
                <View style={{flex: 1, justifyContent:'flex-end', width: '100%', paddingBottom: 10}}>
                  <Text style={{ ...styles.title, marginStart: '10%'}}>00/00/0000 HH:mm</Text>
                  <Text style={{ marginStart: '10%'}}>{` Descrição da dica ${item}`}</Text>
                </View>
              )
            })
          }
          
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCardContainer: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'flex-start'
  },
  userName: {
    marginTop: 15,
    paddingLeft: 10,
    width:'100%'
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
    width: '100%',
  },
  viewCalendarMedicated: {
    marginLeft: 20
  },
  calendarMedicated: {
    marginLeft: 100,
    marginTop: 10
  },
});
