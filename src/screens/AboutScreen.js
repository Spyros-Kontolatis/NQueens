import React, { useContext } from 'react';
import {View, StyleSheet,  FlatList, TouchableOpacity,Dimensions} from 'react-native';
import { SafeAreaView,NavigationEvents } from 'react-navigation';
import { Context as GameContext } from '../context/GameContext';
import { ListItem, Text, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Spacer from '../components/Spacer';


const AboutScreen = ({navigation}) => {


  return (
    <SafeAreaView forceInset={{ top:'always' }} style={styles.container}>
      <Spacer>
        <Text h2 style={styles.title}>N-Queens </Text>
      </Spacer>

      <Spacer>
        <Text h5 style={styles.text}>
          The classic problem of N queens, originally published by Max Bezzel in 1848,
          is defined like this:
        </Text>
      </Spacer>

      <Spacer>
        <Text h5 style={styles.text}>
          Place N queens in a NxN chessboard so that no queen threatens any other.
          As you already may know, a queen threatens another chess piece if they share the same row, column or diagonal.
        </Text>
      </Spacer>

      <Spacer>
        <Text h5 style={styles.text2}>
          This game is a slight alteration of the N-queens problem:
        </Text>
      </Spacer>

      <Spacer>
        <Text h5 style={styles.text}>
          In a NxN chessboard we need to place M queens ( M less than or equal to N)
          so that no queen threatens another and additionally,
          all chessboard tiles are threatened by at least one queen.
        </Text>
      </Spacer>
    </SafeAreaView>
  );
};

AboutScreen.navigationOptions =  {
  tabBarOptions:{
                  style:{
                          alignItems:'center',
                          justifyContent:'center',
                        },
                  showLabel : false,
                  activeBackgroundColor: '#4d648d',
                  inactiveBackgroundColor:'#1e1f26'
                },
  title: '',
  tabBarIcon: <FontAwesome name="info" size={30}  style={{color: '#d0e1f9'}} />
}

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
  text:{
    alignSelf: 'center',
    color: '#d0e1f9',
    marginHorizontal: Dimensions.get('window').width/20,

  },
  text2:{
    color: '#d0e1f9',
    marginHorizontal: Dimensions.get('window').width/20,

  },
  btn:{
    backgroundColor: '#4d648d',
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').height/12,
    alignSelf: 'center'
  }
});

export default AboutScreen;
