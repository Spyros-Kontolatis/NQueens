import React, { useContext, useCallback, useState } from 'react';
import {View, StyleSheet,FlatList } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus,NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import Row from '../components/Row';
import { FontAwesome } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';
import Modal from "react-native-modal";
import Win  from '../components/Win';
import Loss  from '../components/Loss';
import Reset  from '../components/Reset';


const GameScreen = ({ navigation }) => {
  const { state, newGame } = useContext(GameContext);
  const queensNo           = state.queens;
  const chessboardSize     = state.chessboardSize;
  const [win,setWin]       = useState(false)
  var row                  = [];
  for(let i=0;i<state.chessboardSize;i++)
  {
    row.push({id:i.toString()});
  }

  return (
    <SafeAreaView forceInset={{ top:'always' }} style={styles.container}>
      <View style={styles.game}>
        <Reset style={styles.reset}/>
        <Spacer>
          <Text h3 style={styles.title}>N-Queens </Text>
        </Spacer>
        <Win />


        <FlatList
          style={styles.board}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={row}
          keyExtractor={r => r.id}
          renderItem={({ item }) => {
            return (
              <Row position={item.id} ></Row>
            )
          }}
        />
      <Spacer>
        <Text h5 style={styles.text}>Place {queensNo} queens in valid positions on the chessboard </Text>
        <Text h6 style={styles.text2}>All tiles should be treatened by at least one queen! </Text>
      </Spacer>
      </View >
    </SafeAreaView>
  );
};

GameScreen.navigationOptions ={
  tabBarOptions:{
                  style:{
                          alignItems:'center',
                          justifyContent:'center',
                        },
                  showLabel : false,
                  activeBackgroundColor: '#4d648d',
                  inactiveBackgroundColor:'#1e1f26'
                },
  title:'',
  tabBarIcon: <FontAwesome name="gamepad" size={30} style={{color: '#d0e1f9'}}/>
}

const styles = StyleSheet.create({
  board:{
    alignSelf: 'center',
  },
  container:{
    flex:1,
    backgroundColor: '#1e1f26',

  },
  reset:{
    alignSelf: 'flex-end'
  },
  game:{
    flex:1,

    marginVertical: 20,
  },
  title:{
    alignSelf: 'center',
    color: '#d0e1f9'
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

export default GameScreen;
