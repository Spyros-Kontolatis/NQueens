import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import NewGameScreen from './src/screens/NewGameScreen';
import AboutScreen from './src/screens/AboutScreen';
import BackScreen from './src/screens/BackScreen';
import LoadScreen from './src/screens/LoadScreen';
import { Provider as GameProvider } from './src/context/GameContext';
import { setNavigator } from './src/navigationRef';
import { FontAwesome } from '@expo/vector-icons';


const switchNavigator = createSwitchNavigator({
   Load       : LoadScreen,
   Home       : HomeScreen,
   NewGame    : NewGameScreen,
   mainFlow   : createBottomTabNavigator({
     Back     : BackScreen,
     Game     : GameScreen,
     About    : AboutScreen
   })
});

const App =  createAppContainer(switchNavigator);
export default () => {
  return (
      <GameProvider>
        <App ref={(navigator) => { setNavigator(navigator) }}/>
      </GameProvider>
  );
}
