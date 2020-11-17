import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { ScrollView } from 'react-native';
import moment from 'moment'

import * as historyService from '../services/history'

const separator = () => (
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)


const regPassword = async function () {
  const [medication, setMedication] = React.useState([]);
  
    return historyService.getHistory().then(x => {
      setMedication(x)
    }).then(e => medication)
}



export default class History extends React.Component {
  state = {
    medication: [],
    lastMedicine: {}
  }

  componentDidMount() {
    historyService.getHistory().then(x => {
      this.setState({medication: x})
    })
    historyService.getLastPick().then(x => {
      this.setState({lastMedicine: x.schedule_date})
    })
  }

  render() {

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
                <Text style={{fontSize: 40, color: 'gray'}}>{moment(this.state.lastMedicine).utc().format('DD/MM/YY')}</Text>
              </View>
  
  
              <View style={{...styles.calendarMedicated, alignItems: 'center'}}>
                <FontAwesome5 
                  name="hourglass-half" 
                  color={'black'} 
                  size={50} 
                  style={{transform: [{rotateY: '180deg'}]}}
                  // onPress={() => navigation.navigate('Settings')}  
                />
  
              </View>
            </View>
  
            {separator()}
            
            <View style={{flex: 1, justifyContent:'flex-end', width: '100%'}}>
              <Text style={{  ...styles.title, marginStart: '10%'}}>Últimas Retiradas</Text>
            </View>
  
            {separator()}
            
            {
              this.state.medication.map((item: any, i) => {
                const cellColor = i%2? 'white' : '#e6f2ea'
                return (
                  <View style={{backgroundColor: cellColor, flex: 1, justifyContent:'flex-end', width: '100%', paddingBottom: 5, paddingTop: 5}}>
                    <Text style={{ ...styles.title, marginStart: '10%'}}>
                      <FontAwesome5 name="circle" 
                        color={'black'} 
                        size={18}
                      />
                        {" " + moment(item.pick_date).utc().format('DD/MM/YYYY')}
                    </Text>
                  </View>
                )
              })
            }
            
            </View>
        </ScrollView>
      </View>
    );
  }
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
