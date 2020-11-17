
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Keyboard, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Image } from 'react-native-elements';
import AppAuth from './AppAuth'
import Axios from 'axios';
import { Input } from 'react-native-elements';

import { signIn, signIn2, registerPassword } from '../services/auth'
import SyncStorage from 'sync-storage';

const SettingsStack = createStackNavigator();

let cpf, password;

const auth = async function (nav: any, text: any) {
    
    try {
        let x = await signIn(text)
        // se x for false vai pra tela de criar senha
        // se for true vai pra tela de inserir a senha
        cpf = text
        if(x)
          nav.navigate('LoginPassword')
        else
          nav.navigate('RegisterPassword')

        Keyboard.dismiss()
    }  catch(e) {
      Alert.alert('Oops!', 'Usuário não encontrado!')
    }
}

const auth2 = async function (nav: any, text: any) {
  
  try {
    password = text
      let x = await signIn2({cpf, password})
      // se x for false vai pra tela de criar senha
      // se for true vai pra tela de inserir a senha
      Keyboard.dismiss()

      nav.navigate('AppAuth')
  }  catch(e) {
    Alert.alert('Oops!', 'Senha incorreta!')
    // Adicionar opção esqueci mimnha senha

  }
}

const regPassword = async function (nav: any, text: any) {
  
  try {
    password = text
    let user = JSON.parse(SyncStorage.get('user'))
    let x = await registerPassword(user, password)

    Keyboard.dismiss()

    nav.navigate('LoginPassword')
  }  catch(e) {
    Alert.alert('Oops!', 'Senha incorreta!')
    // Adicionar opção esqueci mimnha senha

  }
}


export default class App extends React.Component {
  state={
    email:"",
    password:""
  }

  LoginPassword({ navigation }) {
    const [password, setPassword] = React.useState('');

    const aux = (text: any) => {
      setPassword(text);
    }

    return (
        <View style={styles.container}>

          
          <Image
            source={require('../assets/images/Logo.png')}
            style={{marginTop: 20, marginBottom: 60}}
          />


          <View style={styles.inputView} >
          <Input
              keyboardType="default"
              placeholder="Senha"
              secureTextEntry={true}
              leftIcon={{ type: 'material-community', name: 'key-outline' }}
              onChangeText={text => aux(text)}
              defaultValue={password}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => auth2(navigation, password) }>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
  
    
        </View>
      );
  }

  RegisterPassword({ navigation }) {
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const aux = (text: any) => {
      setPassword(text);
    }

    return (
        <View style={styles.container}>
          <Image
            source={require('../assets/images/Logo.png')}
            style={{marginTop: 20, marginBottom: 40}}
          />
          <Text style={{fontSize: 18, marginBottom: 10}}>Primeiro acesso! Crie sua senha</Text>
          <View style={styles.inputView} >
          <Input
              keyboardType="default"
              placeholder="Senha"
              secureTextEntry={true}
              leftIcon={{ type: 'material-community', name: 'key-outline' }}
              onChangeText={text => aux(text)}
              defaultValue={password}
            />
            <Input
              keyboardType="default"
              placeholder="Confirmar Senha"
              secureTextEntry={true}
              leftIcon={{ type: 'material-community', name: 'key-outline' }}
              onChangeText={text => setPasswordConfirm(text)}
              defaultValue={password}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => regPassword(navigation, password) }>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
  
    
        </View>
      );
  }

  

  LoginCpf({ navigation }) {
    const [text, setText] = React.useState('');

    const aux = (text: any) => {
          setText(text);
    }

    return (
        <View style={styles.container}>
          <Image
            source={require('../assets/images/Logo.png')}
            style={{marginTop: 20, marginBottom: 60}}
          />
          <View style={styles.inputView} >
          <Input
              keyboardType="numeric"
              placeholder="CPF (somente números)"
              leftIcon={{ type: 'material-community', name: 'account-card-details-outline' }}
              onChangeText={text => aux(text)}
              defaultValue={text}
              maxLength={11}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => auth(navigation, text) }>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
  
    
        </View>
      );
  }

SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
        <SettingsStack.Screen 
            options={{
            // headerTransparent: true,
            headerShown: false
            }}
            name="Home"
            key="LoginCpf"
            component={this.LoginCpf} 
        />
        <SettingsStack.Screen 
            name="LoginPassword"
            component={this.LoginPassword} 
            options={{
                headerShown: false
            }}  
        />
        <SettingsStack.Screen 
            name="RegisterPassword"
            component={this.RegisterPassword} 
            options={{
                headerShown: false
            }}  
        />
        <SettingsStack.Screen 
            name="AppAuth"
            component={AppAuth} 
            options={{
                headerShown: false
            }}  
        />
        </SettingsStack.Navigator>
    );
}

  render(){
    return (
        this.SettingsStackScreen()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:40,
    color:"#8BC4BE",
    marginBottom:10
  },
  inputView:{
    width:"80%",
    borderColor: "grey",
    backgroundColor:"#fff",
    borderRadius:25,

    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#8BC4BE",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});

// import * as React from 'react';
// import { StyleSheet, StatusBar } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
// import AppAuth from './AppAuth'
// // import {Card} from 'react-native-shadow-cards';

// import Constants from "expo-constants";
// import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack';
// import { ScrollView } from 'react-native-gesture-handler';

// import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards'

// const separator = () => (
//   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
// )

// function LoginCpf({ navigation }) {
//   return (
      
//     <View style={{flex: 1,paddingTop: Constants.statusBarHeight}}>

//       <View style={{margin: 50}}>
//         <MaterialCommunityIcons 
//           name="tune" 
//           color={'black'} 
//           size={30}
//           onPress={() => navigation.navigate('AppAuth')} 
//         />
//       </View>
//     </View>
      
//   )
// }


// const SettingsStack = createStackNavigator();

// export default function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen 
//         options={{
//           // headerTransparent: true,
//           headerShown: false
//         }}
//         name="Home"
//         key="LoginCpf"
//         component={LoginCpf} 
//       />
//       <SettingsStack.Screen 
//         name="AppAuth"
//         component={AppAuth} 
//         options={{
//             headerShown: false
//         }}  
//       />
//     </SettingsStack.Navigator>
//   );
// }


// const styles = StyleSheet.create({
//   userConfig: {
//     marginTop: 10,
//     position: 'absolute',
//     left: 2, // Keep some space between your left border and Image
//   },
//   viewCalendarMedicated: {
//     marginLeft: 20
//   },
//   calendarMedicated: {
//     marginLeft: 100,
//     marginTop: 10
//   },
//   settingCardContainer: {
//     width: '100%',
//     flexDirection: 'row-reverse',
//     paddingRight: 20,
//     marginHorizontal: 20,
//     marginLeft: 70
//   },
//   userCardContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     marginLeft: 20,
//     marginRight: 20,
//     alignSelf: 'flex-start'
//   },
//   userName: {
//     marginTop: 25,
//     width:'100%'
//   },
//   userCard: {
//     padding: 10
//   },
//   container: {
//     paddingTop: Constants.statusBarHeight,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   title: {
//     alignContent: 'center',
//     textAlign: 'left',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 10,
//     height: 1,
//     width: '100%',
//   },
// });
