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

import * as tipService from '../services/tip'
import * as historyService from '../services/history'
import * as medicationService from '../services/medication'

import moment from 'moment';

const separator = () => (
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)




const SettingsStack = createStackNavigator();

export default class SettingsStackScreen extends React.Component {
  state = {
    tips: [],
    lastMedicine: {},
    dailyMedication: [],
    treatment: []
  }

  componentDidMount() {
    tipService.getTips().then(m => {
      this.setState({tips: m})
    })
    historyService.getLastPick().then(x => {
      this.setState({lastMedicine: x.schedule_date})
    })
    medicationService.getTreatment().then(x => {
      console.log('treatment: ', x)
      this.setState({treatment: x})
    })
    medicationService.getDailyMedication().then(x => {
      this.setState({dailyMedication: x})
    })
  }

  HomeScreen({ navigation }) {
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
            <Text style={{fontSize: 40, color: 'gray'}}>{moment(this.state.lastMedicine).utc().format('DD/MM')}</Text>
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
            {
              this.state.treatment?.length > 0 ?
              this.state.treatment.map(item => {
                console.log('item1111', item)
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
              })
              : this.state.dailyMedication.map((item: any) => {
                console.log('item2323', item)
                return (
                  <Text>
                    <FontAwesome5 
                    name="chevron-circle-right" 
                    color={'black'} 
                    size={12}
                    // onPress={() => navigation.navigate('Settings')}  
                  />
                    {"  " + `${item.medication_id?.name} (${item.dose})`}
                  </Text>
                )
              })
            }
            
          </CardContent>
          {/* <CardContent text="Clifton, Western Cape" /> */}
  
          <CardAction 
            style={{flex: 1, justifyContent: 'flex-end', marginRight: 12, marginBottom: 12}}
            separator={false} 
            inColumn={false}>
            <View style={{alignItems: 'center'}}>
            <FontAwesome5 
              name="check-circle" 
              color={'black'} 
              size={50} 
              // onPress={() => navigation.navigate('Settings')}  
            />
            <Text style={{fontSize: 12}}>Concluir Medicações</Text>
  
          </View>
          </CardAction>
        </Card>
  
        {/*FIM CARD MEDICAÇÕES DO DIA */}
  
        {separator()}
        
        <View style={{flex: 1, justifyContent:'flex-end', width: '100%'}}>
          <Text style={{  ...styles.title, marginStart: '10%'}}>Dicas/Sugestões</Text>
        </View>
  
        {separator()}
        
        {
          this.state.tips.map((item: any) => {
            return (
              <View style={{flex: 1, justifyContent:'flex-end', width: '100%', paddingBottom: 10}}>
                <Text style={{ ...styles.title, marginStart: '10%'}}>{item.title}</Text>
                <Text style={{ marginStart: '10%'}}>{item.description}</Text>
              </View>
            )
          })
        }
  
      </View>
        </ScrollView>
      </View>
        
    )
  }

  render() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen 
          options={{
            // headerTransparent: true,
            headerShown: false
          }}
          name="Home"
          key="homeScreen"
          component={this.HomeScreen.bind(this)} 
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
    width: '100%',
  },
});
