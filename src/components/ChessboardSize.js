import React, { useState } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';


const ChessboardSize = ( {setChessboardSize,setQueensNo}) => {

  const sizes = [4,5,6,7,8];
  const queensTbl = [[3,4],[3,4,5],[4,5,6],[4,5,6,7],[5,6,7,8]]
  const [i,setI] = useState(0);
  const [size,setSize] = useState(sizes[0]);
  const [j,setJ] = useState(0);
  const [queens, setQueens] = useState(queensTbl[0][0]);
  const updateSize = (s,sQ) => {
    setI(s);
    setSize(sizes[s]);
    setQueens(queensTbl[s][sQ]);
    setJ(sQ);
    setChessboardSize(sizes[s]);
    setQueensNo(queensTbl[s][sQ]);
  }
  const updateQueens = (q) => {
    setJ(q);
    setQueens(queensTbl[i][q])
    setQueensNo(queensTbl[i][q]);
  }
  return (
    <View>

      <View style={styles.container}>

        <TouchableOpacity onPress={async ()=>{
            i==0
            ?await updateSize(4,0)
            :await updateSize(i-1,0)
          }}>
          <Entypo  style={styles.arrows} name="chevron-left" size={60}/>
        </TouchableOpacity>
        <View>
          <Text h4 style={styles.title}>Chessboard</Text>
          <Text h3 style={styles.text}>{size} x {size}</Text>
        </View>
        <TouchableOpacity onPress={async ()=>{
            i==4
            ?await updateSize(0,0)
            :await updateSize(i+1,0)
          }}>
          <Entypo  style={styles.arrows} name="chevron-right" size={60}/>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>

        <TouchableOpacity onPress={async ()=>{
            j==0
            ?await updateQueens(queensTbl[i].length-1)
            :await updateQueens(j-1)
          }}>
          <Entypo  style={styles.arrows} name="chevron-left" size={60}/>
        </TouchableOpacity>
        <View>
          <Text h4 style={styles.title}>Queens</Text>
          <Text h3 style={styles.text}>{queens}</Text>
        </View>

        <TouchableOpacity onPress={async ()=>{
            j==queensTbl[i].length-1
            ?await updateQueens(0)
            :await updateQueens(j+1)
          }}>
          <Entypo  style={styles.arrows} name="chevron-right" size={60}/>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  title:{
    alignSelf: 'center',
    marginVertical: 5,
    color: '#d0e1f9'
  },
  text:{
    color: '#d0e1f9',
    alignSelf: 'center'
  },
  arrows:{
    color: '#4d648d'
  }
});

export default ChessboardSize;
