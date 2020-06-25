import React, { useContext, useCallback, useState, useEffect } from 'react';
import {View, StyleSheet,FlatList,TouchableOpacity,Dimensions } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus,NavigationEvents } from 'react-navigation';
import Spacer from '../components/Spacer';
import Row from '../components/Row';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';
import Modal from "react-native-modal";
import { navigate } from '../navigationRef';


const Reset = () => {
  const { state, newGame }      = useContext(GameContext);
  const queensNo           = state.queens;
  const chessboardSize     = state.chessboardSize;
  const [reset,setReset]   = useState(false);


  return (
    <View style={styles.container}>

      <Spacer>
        <TouchableOpacity onPress={() => {setReset(true)}} style={styles.reloader}>
          <SimpleLineIcons name="reload" size={30} style={{color: '#d0e1f9'}}/>
        </TouchableOpacity>
      </Spacer>
      <Modal isVisible={reset}>
        <View style={styles.container} >
          <Spacer>
            <Text h3 style={styles.text}>Reset game?</Text>
          </Spacer>
          <Spacer>
            <Text h5 style={styles.text}>Are you sure you wish to reset the game?</Text>
          </Spacer>
          <View style={styles.btnContainer}>
            <Spacer>
              <Button
                title="Reset"
                buttonStyle={styles.btn}
                titleStyle = {{color:'#d0e1f9'}}
                onPress={() => newGame({chessboardSize,queensNo},
                    () => {
                      navigate('NewGame');
                    }
                  )
                }
              ></Button>
            </Spacer>
            <Spacer>
              <Button
                title="Cancel"
                buttonStyle={styles.btn}
                onPress={() => {setReset(false)}}
                titleStyle = {{color:'#d0e1f9'}}
              ></Button>
            </Spacer>
          </View>
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',

  },
  reloader:{
    alignSelf: 'flex-end',
    marginHorizontal: Dimensions.get('window').width/36,
    width: 30,
    borderWidth: 0.5,
    borderColor: '#1e1f26'
  },
  text:{
    alignSelf: 'center',
    color: '#d0e1f9'
  },
  text2:{
    alignSelf: 'center',
    color: '#4d648d'
  },
  btnContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  btn:{
    backgroundColor: '#4d648d',
    width: Dimensions.get('window').width/4,
    opacity: 0.8
  }
});

export default Reset;
