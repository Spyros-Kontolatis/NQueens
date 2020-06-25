import React, { useContext, useState } from 'react';
import {View, StyleSheet,Dimensions } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import ChessboardSize from '../components/ChessboardSize';

import { FontAwesome } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';



const HomeScreen = ({navigation}) => {
  const { setUpGame, continueGame } = useContext(GameContext);
  const [queensNo, setQueensNo] = useState(3);
  const [chessboardSize,setChessboardSize] = useState(4);
  return (
    <SafeAreaView forceInset={{ top:'always' }} style={styles.container}>
      <Spacer>
        <Text h2 style={styles.title}>N-Queens </Text>
      </Spacer>
      <Spacer>
        <ChessboardSize setQueensNo={setQueensNo} setChessboardSize={setChessboardSize} />
      </Spacer>
      <Spacer>
        <Button
          title="New Game"
          buttonStyle={styles.btn}
          titleStyle = {{color:'#d0e1f9',fontSize:22}}
          onPress={ () => setUpGame({chessboardSize,queensNo}) }
        >
        </Button>
      </Spacer>
      <Spacer>
        <Button
          title="Continue Game"
          titleStyle = {{color:'#d0e1f9',fontSize:22}}
          buttonStyle={styles.btn}
          onPress={() => continueGame()}
        >
        </Button>
      </Spacer>
      <Spacer>
        <Button
          title="About"
          buttonStyle={styles.btn}
          titleStyle = {{color:'#d0e1f9',fontSize:22}}
          onPress={()=>navigation.navigate('About')}
        >
        </Button>
      </Spacer>
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor: '#1e1f26'
  },
  title:{
    alignSelf: 'center',
    color: '#d0e1f9'
  },
  btn:{
    backgroundColor: '#4d648d',
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').height/12,
    alignSelf: 'center'
  }
});

export default HomeScreen;
