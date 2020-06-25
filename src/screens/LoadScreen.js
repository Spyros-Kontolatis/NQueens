import React, { useContext, useCallback, useEffect,useState } from 'react';
import {View, StyleSheet, Animated,Dimensions,Image } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Spacer from '../components/Spacer';
import { FontAwesome } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';



const LoadScreen = ({ navigation }) => {

  const [fadeAnim3] = useState(new Animated.Value(0))
  const [fadeAnim4] = useState(new Animated.Value(0))
  const [fadeAnim5] = useState(new Animated.Value(-500))

  useEffect(() => {
    Animated.sequence([

      Animated.timing(
        fadeAnim3,
        {
          toValue: 1,
          duration: 3000,
        }),
      Animated.parallel([
        Animated.timing(
          fadeAnim4,
          {
            toValue: 1,
            duration: 3000,
          }),
        Animated.spring(
          fadeAnim5,
          {
            toValue: 0,
            velocity: 3,
            tension: 2,
            friction: 8,
          }
        )
      ])

    ]).start(() => navigation.navigate('Home'));

  }, [])

  return (
    <SafeAreaView forceInset={{ top:'always' }} style={styles.container}>

      <Animated.View style={{ alignItems: 'center',justifyContent: 'center',opacity: fadeAnim3}}>
        <Text h1 style={styles.text}>N-Queens</Text>
      </Animated.View>
      <Animated.View style={{ alignItems: 'center',justifyContent: 'center',opacity: fadeAnim4,transform: [{translateX: fadeAnim5}]}}>
        <Image
          source={require('../images/queen.png')}
          style={{
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height/2,
          }}
        >
        </Image>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor: '#1e1f26'
  },
  text:{
    color: '#d0e1f9',
    alignSelf: 'center',

  }
});

export default LoadScreen;
