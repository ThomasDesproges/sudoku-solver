import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default class Affichage extends Component{

  state = {
    uri : "https://i.imgur.com/VY0j4Ka.jpeg",
    text : "Cliquez ici pour résoudre le sudoku !",
    textIndice : "Cliquez ici pour avoir un indice !",
    sudokuList : [5,' ',7,8,' ',1,6,' ',9,8,' ',4,6,' ',' ',' ',1,2,' ',6,1,' ',9,4,' ',' ',8,' ',' ',' ',7,' ',6,' ',9,' ',' ',3,' ',1,' ',8,' ',' ',7,' ',7,' ',3,2,' ',' ',6,' ',9,' ',6,4,' ',3,' ',2,' ',' ',' ',8,5,' ',7,' ',' ',1,7,' ',3,' ',' ',2,4,' ',' '],
  };

  revelationIndice = () => {
    this.setState({
      sudokuList : [5,2,7,8,' ',1,6,' ',9,8,' ',4,6,' ',' ',' ',1,2,' ',6,1,' ',9,4,' ',' ',8,' ',' ',' ',7,' ',6,' ',9,' ',' ',3,' ',1,' ',8,' ',' ',7,' ',7,' ',3,2,' ',' ',6,' ',9,' ',6,4,' ',3,' ',2,' ',' ',' ',8,5,' ',7,' ',' ',1,7,' ',3,' ',' ',2,4,' ',' ']
    })
  }

  changementImage = () => {
    this.setState({
      uri : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Diagonal-Sudoku-by-Skratt.svg/440px-Diagonal-Sudoku-by-Skratt.svg.png",
      text : "sudoku résolu !",
      sudokuList : [5,2,7,8,3,1,6,4,9,8,9,4,6,7,5,3,1,2,3,6,1,2,9,4,5,7,8,4,8,2,7,5,6,1,9,3,6,3,9,1,4,8,2,5,7,1,7,5,3,2,9,8,6,4,9,1,6,4,8,3,7,2,5,2,4,8,5,6,7,9,3,1,7,5,3,9,1,2,4,8,6]
    });
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={{margin:20}}> Premier type d'affichage : on utilise des images </Text>
        <img src = {this.state.uri} style = {StyleSheet.logo}/>
        <Text style={{margin:20}}> Deuxième type d'affichage : on utilise un vecteur contenant le sudoku </Text>
        <table style = {{borderCollapse: 'collapse', fontFamily: 'Calibri, sans-serif'}}>
          <colgroup style = {{border: 'solid medium'}}><col /><col /><col />
          </colgroup><colgroup style = {{border: 'solid medium'}}><col /><col /><col />
          </colgroup><colgroup style = {{border: 'solid medium'}}><col /><col /><col />
          </colgroup><tbody style = {{border: 'solid medium'}}>
            <tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[0]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[1]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[2]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[3]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[4]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[5]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[6]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[7]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[8]}
              </td></tr><tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[9]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[10]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[11]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[12]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[13]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[14]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[15]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[16]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[17]}
              </td></tr><tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[18]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[19]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[20]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[21]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[22]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[23]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[24]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[25]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[26]}
              </td></tr></tbody><tbody style = {{border: 'solid medium'}}>
            <tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[27]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[28]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[29]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[30]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[31]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[32]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[33]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[34]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[35]}
              </td></tr><tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[36]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[37]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[38]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[39]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[40]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[41]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[42]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[43]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[44]}
              </td></tr><tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[45]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[46]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[47]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[48]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[49]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[50]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[51]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[52]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[53]}
              </td></tr></tbody><tbody style = {{border: 'solid medium'}}>
            <tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[54]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[55]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[56]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[57]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[58]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[59]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[60]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[61]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[62]}
              </td></tr><tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[63]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[64]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[65]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[66]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[67]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[68]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[69]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[70]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[71]}
              </td></tr><tr> <td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[72]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[73]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[74]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[75]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[76]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[77]} </td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[78]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[79]}</td><td style = {{border: 'solid thin', height: '1.4em', width: '1.4em', textAlign: 'center', padding: 0}}>{this.state.sudokuList[80]}
              </td></tr></tbody></table>
        <TouchableOpacity style={styles.button} onPress={this.changementImage}>
          <Text style={{margin:20}}> {this.state.text} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.revelationIndice}>
          <Text style={{margin:20}}> {this.state.textIndice} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    alignItems : 'center',
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
    background : '#FF4500',
  },
  table:{
    borderCollapse: 'collapse', 
    fontFamily: 'Calibri, sans-serif'
  },
  colgroup:{
    border: 'solid medium'
  },
  tbody:{
    border: 'solid medium'
    },
  td:{
    border: 'solid thin', 
    height: '1.4em', 
    width: '1.4em', 
    textAlign: 'center', 
    padding: 0
    }
});




