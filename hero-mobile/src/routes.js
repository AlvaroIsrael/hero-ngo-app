import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Incident from './pages/incident';
import Detail from './pages/detail';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen component={Incident} name='Incidents'/>
        <AppStack.Screen component={Detail} name='Detail'/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

