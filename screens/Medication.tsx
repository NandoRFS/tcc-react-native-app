import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Constants from "expo-constants";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { Card, CardTitle, CardContent, CardAction } from 'react-native-cards'
import { ScrollView } from 'react-native';

import * as medicationService from '../services/medication'

const separator = () => (
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)

const cardMedication = (title: any, description: any, link: any) => (


    <Card style={{width: '90%', backgroundColor: '#eaf2ed'}}>
            <CardTitle
              style={{marginTop: -15}}
              title={<Text style={{...styles.title}}>{title}</Text>}
              subtitleAbove={true}
            />
            <CardContent style={{marginTop: -15}}>
            <Text>{description}</Text>
            </CardContent>
            {/* <CardContent text="Clifton, Western Cape" /> */}

            <CardAction 
              style={{flex: 1, justifyContent: 'flex-end', marginTop: -20, marginRight: 12, marginBottom: 12}}
              separator={false} 
              inColumn={false}>
              <View style={{alignItems: 'center', borderRadius: 8, padding: 6, borderWidth: 1}}>
              <Ionicons 
                name="md-open" 
                color={'black'} 
                size={30} 
                onPress={(e)=>Linking.openURL(link)}
                // onPress={() => navigation.navigate('Settings')}  
              />
              <Text style={{fontSize: 12}}>Acessar Bula</Text>

            </View>
            </CardAction>
          </Card>

)

export default class TabTwoScreen extends React.Component {
  state = {
    medication: []
  }

  componentDidMount() {
    medicationService.getMedication().then(m => {
      this.setState({medication: m})
    })
  }
  render() {
    return (
      <View style={{flex: 1,paddingTop: Constants.statusBarHeight}}>
        <ScrollView>
          <View style={styles.container}>
              <View style={styles.userCardContainer}>
              <FontAwesome5 name="notes-medical" color={'black'} size={50} />
              
              <Text style={{...styles.title, ...styles.userName}}>
                  Medicações
              </Text>
              
            </View>
  
            {separator()}
            {
              this.state.medication.map((item: any) => {
                return cardMedication(item.name, item.company, item.patient_leaflet)
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
    marginTop: 20,
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
    width: '85%',
  },
});
