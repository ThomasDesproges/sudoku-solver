import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

function gridDisplay(sudokuList) {

  const sudokuData = [
    {id: "1", value: sudokuList[1]},
    {id: "2", value: sudokuList[2]},
    {id: "3", value: sudokuList[3]},
    {id: "4", value: sudokuList[4]},
    {id: "5", value: sudokuList[5]},
    {id: "6", value: sudokuList[6]},
    {id: "7", value: sudokuList[7]},
    {id: "8", value: sudokuList[8]},
    {id: "9", value: sudokuList[9]},
    {id: "10", value: sudokuList[10]},
    {id: "11", value: sudokuList[11]},
    {id: "12", value: sudokuList[12]},
    {id: "13", value: sudokuList[13]},
    {id: "14", value: sudokuList[14]},
    {id: "15", value: sudokuList[15]},
    {id: "16", value: sudokuList[16]},
    {id: "17", value: sudokuList[17]},
    {id: "18", value: sudokuList[18]},
    {id: "19", value: sudokuList[19]},
    {id: "20", value: sudokuList[20]},
    {id: "21", value: sudokuList[21]},
    {id: "22", value: sudokuList[22]},
    {id: "23", value: sudokuList[23]},
    {id: "24", value: sudokuList[24]},
    {id: "25", value: sudokuList[25]},
    {id: "26", value: sudokuList[26]},
    {id: "27", value: sudokuList[27]},
    {id: "28", value: sudokuList[28]},
    {id: "29", value: sudokuList[29]},
    {id: "30", value: sudokuList[30]},
    {id: "31", value: sudokuList[31]},
    {id: "32", value: sudokuList[32]},
    {id: "33", value: sudokuList[33]},
    {id: "34", value: sudokuList[34]},
    {id: "35", value: sudokuList[35]},
    {id: "36", value: sudokuList[36]},
    {id: "37", value: sudokuList[37]},
    {id: "38", value: sudokuList[38]},
    {id: "39", value: sudokuList[39]},
    {id: "40", value: sudokuList[40]},
    {id: "41", value: sudokuList[41]},
    {id: "42", value: sudokuList[42]},
    {id: "43", value: sudokuList[43]},
    {id: "44", value: sudokuList[44]},
    {id: "45", value: sudokuList[45]},
    {id: "46", value: sudokuList[46]},
    {id: "47", value: sudokuList[47]},
    {id: "48", value: sudokuList[48]},
    {id: "49", value: sudokuList[49]},
    {id: "50", value: sudokuList[50]},
    {id: "51", value: sudokuList[51]},
    {id: "52", value: sudokuList[52]},
    {id: "53", value: sudokuList[53]},
    {id: "54", value: sudokuList[54]},
    {id: "55", value: sudokuList[55]},
    {id: "56", value: sudokuList[56]},
    {id: "57", value: sudokuList[57]},
    {id: "58", value: sudokuList[58]},
    {id: "59", value: sudokuList[59]},
    {id: "60", value: sudokuList[60]},
    {id: "61", value: sudokuList[61]},
    {id: "62", value: sudokuList[62]},
    {id: "63", value: sudokuList[63]},
    {id: "64", value: sudokuList[64]},
    {id: "65", value: sudokuList[65]},
    {id: "66", value: sudokuList[66]},
    {id: "67", value: sudokuList[67]},
    {id: "68", value: sudokuList[68]},
    {id: "69", value: sudokuList[69]},
    {id: "70", value: sudokuList[70]},
    {id: "71", value: sudokuList[71]},
    {id: "72", value: sudokuList[72]},
    {id: "73", value: sudokuList[73]},
    {id: "74", value: sudokuList[74]},
    {id: "75", value: sudokuList[75]},
    {id: "76", value: sudokuList[76]},
    {id: "77", value: sudokuList[77]},
    {id: "78", value: sudokuList[78]},
    {id: "79", value: sudokuList[79]},
    {id: "80", value: sudokuList[80]},
    {id: "81", value: sudokuList[81]}
  ];

  const Case = ({ value }) => (
      <View style={{backgroundColor:"#fff", borderWidth:2, borderColor:"#000"}}>
        <Text style={{fontSize: 32}}>{value}</Text>
      </View>
  )

  /* const uri = "https://i.imgur.com/VY0j4Ka.jpeg";
  const sudokuList = [5," ",7,8," ",1,6," ",9,8," ",4,6," "," "," ",1,2," ",6,1," ",9,4," "," ",8," "," "," ",7," ",6," ",9," "," ",3," ",1," ",8," "," ",7," ",7," ",3,2," "," ",6," ",9," ",6,4," ",3," ",2," "," "," ",8,5," ",7," "," ",1,7," ",3," "," ",2,4," "," "];

  return (
    <View style={styles.container}>
    <Text style={{margin:20}}> Premier type d'affichage : on utilise des images </Text>
    <img src = {uri} style = {StyleSheet.logo}/>
    <Text style={{margin:20}}> Deuxième type d'affichage : on utilise un vecteur contenant le sudoku </Text>
    <table style = {{borderCollapse: "collapse", fontFamily: "Calibri, sans-serif"}}>
      <colgroup style = {{borderWidth: 2}}><col /><col /><col />
      </colgroup><colgroup style = {{borderWidth: 2}}><col /><col /><col />
      </colgroup><colgroup style = {{borderWidth: 2}}><col /><col /><col />
      </colgroup><tbody style = {{borderWidth: 2}}>
        <tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[0]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[1]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[2]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[3]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[4]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[5]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[6]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[7]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[8]}
          </td></tr><tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[9]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[10]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[11]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[12]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[13]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[14]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[15]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[16]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[17]}
          </td></tr><tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[18]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[19]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[20]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[21]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[22]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[23]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[24]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[25]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[26]}
          </td></tr></tbody><tbody style = {{borderWidth: 2}}>
        <tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[27]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[28]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[29]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[30]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[31]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[32]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[33]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[34]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[35]}
          </td></tr><tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[36]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[37]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[38]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[39]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[40]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[41]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[42]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[43]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[44]}
          </td></tr><tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[45]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[46]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[47]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[48]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[49]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[50]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[51]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[52]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[53]}
          </td></tr></tbody><tbody style = {{borderWidth: 2}}>
        <tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[54]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[55]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[56]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[57]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[58]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[59]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[60]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[61]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[62]}
          </td></tr><tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[63]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[64]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[65]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[66]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[67]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[68]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[69]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[70]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[71]}
          </td></tr><tr> <td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[72]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[73]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[74]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[75]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[76]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[77]} </td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[78]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[79]}</td><td style = {{border: "solid thin", height: "1.4em", width: "1.4em", textAlign: "center", padding: 0}}>{sudokuList[80]}
          </td></tr></tbody></table>
    <TouchableOpacity style={styles.button} onPress={this.changementImage}>
      <Text style={{margin:20}}> {this.state.text} </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={this.revelationIndice}>
      <Text style={{margin:20}}> {this.state.textIndice} </Text>
    </TouchableOpacity>
    </View>
    ); */
}

export default gridDisplay;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    alignItems : "center",
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor : "#FF4500",
  },
  table:{
    fontFamily: "Calibri, sans-serif"
  },
  colgroup:{
    borderWidth: 2
  },
  tbody:{
    borderWidth: 2
    },
  td:{
    borderWidth: 1,
    height: "1.4em",
    width: "1.4em",
    textAlign: "center",
    padding: 0
    }
});
