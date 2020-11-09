import React from 'react';
import { View, Button, Text } from 'react-native';

const Settings = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Configurações</Text>
  </View>
);

Settings.navigationOptions = {
  title: 'About',
}


export default Settings;