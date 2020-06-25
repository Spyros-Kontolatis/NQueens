import React, { useContext, useCallback, useState, useEffect } from 'react';
import {View, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus,NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import Row from '../components/Row';
import { FontAwesome } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';
import Modal from "react-native-modal";
import { navigate } from '../navigationRef';


const Win = () => {
  const { state }      = useContext(GameContext);
  const victory        = state.victory;
  const [win,setWin]   = useState(victory);

  useEffect(() => {
    setWin(victory);
  },[victory]);

  return (
    <SafeAreaView forceInset={{ top:'always' }}>
      <Modal isVisible={win}>
        <TouchableOpacity style={styles.container} onPress={()=>{setWin(false),navigate('Home')}}>
          <Spacer>
            <Text h1 style={styles.text}>You Win!</Text>
          </Spacer>
          <Spacer>
            <Text h4 style={styles.text2}>Tap to start again!</Text>
          </Spacer>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>

  );
};





const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    alignSelf: 'center',
    color: '#d0e1f9'
  },
  text2:{
    alignSelf: 'center',
    color: '#4d648d'
  }
});

export default Win;
