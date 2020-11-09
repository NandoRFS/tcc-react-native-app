import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Card} from 'react-native-shadow-cards';

import Constants from "expo-constants";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const separator = () => (
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)

export default function HomeScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.userCardContainer}>
        <MaterialCommunityIcons name="account-circle" color={'black'} size={70} />
        
        <Text style={{...styles.title, ...styles.userName}}>
          Nome Do Usuário
        </Text>
        
        <FontAwesome5 
          name="cog" 
          color={'black'} 
          size={25} 
          style={styles.userConfig}
          onPress={() => navigation.navigate('Settings')}  
        />
      </View>

      {separator()}
 
      <Card style={styles.userCard}>
        <Text style={styles.title}>Dicas/Sugestões</Text>
        <Text>Blablabla...</Text>
      </Card>
 
      {separator()}
         
    </View>
  );
}

const styles = StyleSheet.create({
  userConfig: {
    marginLeft: 100,
    marginTop: 10
  },
  userCardContainer: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'flex-start'
  },
  userName: {
    marginTop: 25
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
