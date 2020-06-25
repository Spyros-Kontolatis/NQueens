import React, { useContext, useCallback, useEffect } from 'react';
import {View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Spacer from '../components/Spacer';
import { FontAwesome } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';



const BackScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.navigate('Home');
  },[]);

  return null;
};

BackScreen.navigationOptions ={

  tabBarOptions:{
                  style:{
                          alignItems:'center',
                          justifyContent:'center',
                        },
                  showLabel : false,
                  activeBackgroundColor: '#4d648d',
                  inactiveBackgroundColor:'#1e1f26'
                },
  tabBarIcon: <FontAwesome name="home" size={30}  style={{color: '#d0e1f9'}} />,
  title:'',

}

const styles = StyleSheet.create({

});

export default withNavigationFocus(BackScreen);
