import React, { useContext, useCallback, useEffect } from 'react';
import {View, StyleSheet,FlatList,ActivityIndicator } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';



const NewGameScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.navigate('Game');
  },[]);
  return (
    <SafeAreaView forceInset={{ top:'always' }} style={styles.container}>
      <ActivityIndicator size={80} color='#d0e1f9'/>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor: '#1e1f26'
  }

});

export default NewGameScreen;
