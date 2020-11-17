import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";
import { FontAwesome5 } from '@expo/vector-icons';

import { ScrollView } from 'react-native';
import * as historyService from '../services/history'

import moment from 'moment'

const separator = () => (
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)

export default class ScheduleAdjustment extends React.Component {
  state = {
    lastMedication: []
  }

  componentDidMount() {
    historyService.getLastMedication().then(x => {
      this.setState({lastMedication: x})
    })
  }
  // const [text, setText] = React.useState('');
  // const [textHour, setTextHour] = React.useState('');
  
  // const aux = (text: any) => {
  //   var v = text;
  //   if (v.match(/^\d{2}$/) !== null) {
  //     setText(v + '/');
  //   } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
  //     setText(v + '/');
  //   }
  // }

  // const auxHour = (text: any) => {
  //   var v = text;
  //   if (v.match(/^\d{2}$/) !== null)
  //     setTextHour(v + ':')
  // }
  render() {
    return (
      <View style={{flex: 1,paddingTop: Constants.statusBarHeight, width: '100%'}}>
        
          <View style={styles.container}>
              <View style={styles.userCardContainer}>
              <FontAwesome5 name="clock" color={'black'} size={50} />
  
              <Text style={{...styles.title, ...styles.userName}}>
                Últimas marcações
              </Text>
              
            </View>
  
            
            </View>
  
            {/* AJUSTE DATA */}
  
            {/* <View style={styles.container}>
              <Input
                keyboardType="numeric"
                placeholder="Data"
                leftIcon={{ type: 'material-community', name: 'calendar-month' }}
                onChangeText={text => aux(text)}
                defaultValue={text}
                maxLength={10}
              />
  
              <Input
                keyboardType="numeric"
                placeholder="Hora"
                leftIcon={{ type: 'material-community', name: 'clock-outline' }}
                onChangeText={text => auxHour(text)}
                defaultValue={textHour}
                maxLength={5}
              />
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
                <View style={{marginRight: 10}}>
                  <Button
                      color="grey"
                      title="Cancelar"
                      onPress={() => Alert.alert('Simple Button pressed')}
                    />
                </View>
                
                <View>
                  <Button
                    color="#84CED1"
                    title="Salvar"
                    onPress={() => Alert.alert('Simple Button pressed')}
                  />
                </View>
                
              </View>
              
              </View> */}
  
            {/* FIM AJUSTE DATA */}
  
          {separator()}
          <View style={{flexDirection: 'row'}}>
            <View style={{ justifyContent: 'flex-start', width:'60%'}}>
              <Text style={{ ...styles.title, marginStart: 10}}>Data/hora da marcação: </Text>
            </View>
          </View>
          {separator()}
  
          <ScrollView>
              {
                this.state.lastMedication.map((item: any, i) => {
                  const cellColor = i%2? 'white' : '#e6f2ea'
                  return (
                    <View style={{flexDirection: 'row', margin: 5}}>
                      <View style={{backgroundColor: cellColor, width:'100%'}}>
                        <Text style={{ ...styles.title, marginStart: 10}}>
                          <FontAwesome5 name="calendar" color={'black'} size={20} />
                          {" " + moment(item.medicate_date).utc().format('DD/MM/YYYY') + "   "}
                          <FontAwesome5 name="clock" color={'black'} size={20} />
                          {" " + moment(item.medicate_date).utc().format('HH:mm') + "   "}
                          <FontAwesome5 name="medkit" color={'black'} size={20} />
                          {" " + item.medName}
                        </Text>
                      </View>
                      {/* <View style={{backgroundColor: cellColor, justifyContent: 'flex-end', width:'40%'}}>
                        <FontAwesome5 style={{marginTop: -2, alignSelf:'flex-end', marginRight: 10}} name="pen" color={'black'} size={20} />
                      </View> */}
                    </View>
                    
                  )
                })
              }
            
  
  
  
  
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
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
