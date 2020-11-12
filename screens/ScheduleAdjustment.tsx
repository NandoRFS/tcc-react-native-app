import * as React from 'react';
import { StyleSheet, TextInput  } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Constants from "expo-constants";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards'
import { ScrollView } from 'react-native';

import DatePicker from 'react-native-datepicker'
import { Input } from 'react-native-elements';

const separator = () => (
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)


export default function ScheduleAdjustment() {
  const [value, onChangeText] = React.useState("");
  const aux = (text: any) => {
    let final = null
    onChangeText("") 
    console.log(text.length)
    if(text.length > 3) {
      final = `${text[0]}${text[1]}:${text[2]}${text[3]}`
      console.log(value, final)
      onChangeText(final) 
    } else {
      onChangeText(text) 
    }
  }
  let dated, datetime, hour, min
  return (
    <View style={{flex: 1,paddingTop: Constants.statusBarHeight, width: '100%'}}>
      
        <View style={styles.container}>
            <View style={styles.userCardContainer}>
            <FontAwesome5 name="clock" color={'black'} size={50} />

            <Text style={{...styles.title, ...styles.userName}}>
                Ajuste de horário
            </Text>
            
          </View>

          {separator()}
          
          </View>
          <View style={styles.container}>
          <Input
   placeholder="Comment"
   leftIcon={{ type: 'font-awesome', name: 'comment' }}
   onChangeText={value =>  value }
  />
            <Text>AAAA: </Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%' }}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
            
          </View>
        {separator()}


          <ScrollView>


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
    marginLeft: 20,
    width: '100%'
  },
  calendarMedicated: {
    marginLeft: 100,
    marginTop: 10
  },
});
