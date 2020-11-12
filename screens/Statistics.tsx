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

const renderCard = () => (
  <Card style={{flex: 1, width: '85%', padding: 10, margin: 10, justiftyContent:"center", alignItems:"center"}}>
    <FontAwesome5 name="chart-pie" color={'black'} size={100} />
    <Text style={{marginTop: 10}}>Atrasos na medicações</Text>
  </Card>
)

export default function History() {
  return (
    <View style={{flex: 1,paddingTop: Constants.statusBarHeight}}>
      <ScrollView>
        <View style={styles.container}>
            <View style={styles.userCardContainer}>
            <FontAwesome5 name="chart-line" color={'black'} size={50} />

            <Text style={{...styles.title, ...styles.userName}}>
                Estatísticas
            </Text>
            
          </View>

          {separator()}

          {renderCard()}
          
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
