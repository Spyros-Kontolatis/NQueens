import React, { useState, useContext, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';
import { NavigationEvents } from 'react-navigation';


const Square = ({color, position}) => {
  const { state, placeQueen }         = useContext(GameContext);
  const [image,setImage]              = useState(require('../images/non.png'));
  const [hasQueen,setHasQueen]        = useState(state.hasqueenInit);
  const [threat, setThreat]           = useState(color);
  const hasEnded                      = state.end;
  const continueGame                  = state.continueGame;
  const queensPlaced                  = state.queensPlaced;
  const noThreatens                   = state.noThreatensSquares;
  const queensNo                      = state.queens;
  const chessboardSize                = state.chessboardSize;

  useEffect(() => {
    if(hasEnded)
    {
      for(let i=0;i< noThreatens.length;i++)
      {
        if(noThreatens[i][0]==position[1]&&noThreatens[i][1]==position[0])
        {
          setThreat('#f25c00')
        }
      }

    }
    else
    {
      setThreat(color)
    }
    if(continueGame)
    {
      for(let i=0; i < queensPlaced.length; i++)
      {
        if(i==position[1]&&queensPlaced[i]==position[0])
        {
          setImage(require('../images/queen.png'));
          setHasQueen(true);
        }
      }

    }
  },[hasEnded]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>{ placeQueen(position,hasQueen,chessboardSize,queensNo, (status) => {
          if(status=='put')
          {
            setImage(require('../images/queen.png'));
            setHasQueen(true);
          }
          else if(status=='remove')
          {
            setImage(require('../images/non.png'));
            setHasQueen(false);
          }

        });
      }}
    >
      <NavigationEvents
        onWillBlur={ () => { setHasQueen(false) } }
      />
      <Image
        source={image}
        style={{
          width:Dimensions.get('window').width/(chessboardSize+1),
          height:Dimensions.get('window').width/(chessboardSize+1),
          borderWidth: 0.5,
          borderColor: '#1e1f26',
          backgroundColor:threat
        }}
      >
      </Image>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    alignSelf: 'center',

  },
  text:{
    color: 'grey'
  }
});

export default Square;
