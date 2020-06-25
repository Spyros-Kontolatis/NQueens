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


const Loss = () => {
  const { state }         = useContext(GameContext);
  const allThreatened     = state.allThreatened;
  const [loss,setLoss]    = useState(allThreatened);
  useEffect(() => {
    setLoss(allThreatened);
  },[allThreatened]);

  return (
    <SafeAreaView forceInset={{ top:'always' }}>
      <Modal isVisible={loss}>
        <TouchableOpacity style={styles.container} onPress={()=>{setLoss(false)}}>
          <Spacer>
            <Text h3 style={{color: 'white'}}>All tiles should be treatened by at least one queen!</Text>
          </Spacer>
          <Spacer>
            <Text h4 style={{color: 'grey'}}>Tap to try again!</Text>
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
  }
});

export default Loss;
