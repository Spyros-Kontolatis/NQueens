import React, { useState, useContext } from 'react';
import {View, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Context as GameContext } from '../context/GameContext';
import Square from './Square';

const Row = ({position}) => {
  const { state }         = useContext(GameContext);
  var color;
  var row = [];
  for(let i=0;i<state.chessboardSize;i++)
  {
    row.push({id:i.toString()});
  }
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={row}
      keyExtractor={r => r.id}
      renderItem={({ item }) => {
        ((item.id%2==0)&&(position%2==0))||((item.id%2!=0)&&(position%2!=0))
        ?color = '#d0e1f9'
        :color = '#4d648d'

        return (
          <Square color={color} position={[parseInt(position),parseInt(item.id)]}/>
        )
      }}
    />
  );
};

const styles = StyleSheet.create({

});

export default Row;
