import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

function solverDisplay(sudokuList, setStartOver, setGridVisible, selectionId, setSelectionId) {

  const keypadData = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
  ];

  function renderKey({item}) {
    return (
      <TouchableOpacity
        onPress={
          () => {
            console.log("last move");
            console.log(sudokuList[selectionId]);
            sudokuList.splice(selectionId, 1, item.id);
            console.log(sudokuList[selectionId]);
          }
        }
        style={styles.key}
      >
        <Text style={styles.keyText}>{item.id}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <View styles={styles.container}>
        <Text style={styles.text}> Current Sudoku </Text>
      </View>

      {gridDisplay(sudokuList, selectionId, setSelectionId)}

      <View style={styles.keypad}>
        <FlatList
          data={keypadData}
          renderItem={renderKey}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </View>

      <TouchableOpacity
        onPress={() => {setStartOver(true); setGridVisible(false);}}
        style={styles.button}
      >
        <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Menu </Text>
      </TouchableOpacity>

    </View>
  );
}

function gridDisplay(sudokuList, selectionId, setSelectionId) {

  const sudokuData = [
    {id: 0, value: sudokuList[0]},
    {id: 1, value: sudokuList[1]},
    {id: 2, value: sudokuList[2]},
    {id: 3, value: sudokuList[3]},
    {id: 4, value: sudokuList[4]},
    {id: 5, value: sudokuList[5]},
    {id: 6, value: sudokuList[6]},
    {id: 7, value: sudokuList[7]},
    {id: 8, value: sudokuList[8]},
    {id: 9, value: sudokuList[9]},
    {id: 10, value: sudokuList[10]},
    {id: 11, value: sudokuList[11]},
    {id: 12, value: sudokuList[12]},
    {id: 13, value: sudokuList[13]},
    {id: 14, value: sudokuList[14]},
    {id: 15, value: sudokuList[15]},
    {id: 16, value: sudokuList[16]},
    {id: 17, value: sudokuList[17]},
    {id: 18, value: sudokuList[18]},
    {id: 19, value: sudokuList[19]},
    {id: 20, value: sudokuList[20]},
    {id: 21, value: sudokuList[21]},
    {id: 22, value: sudokuList[22]},
    {id: 23, value: sudokuList[23]},
    {id: 24, value: sudokuList[24]},
    {id: 25, value: sudokuList[25]},
    {id: 26, value: sudokuList[26]},
    {id: 27, value: sudokuList[27]},
    {id: 28, value: sudokuList[28]},
    {id: 29, value: sudokuList[29]},
    {id: 30, value: sudokuList[30]},
    {id: 31, value: sudokuList[31]},
    {id: 32, value: sudokuList[32]},
    {id: 33, value: sudokuList[33]},
    {id: 34, value: sudokuList[34]},
    {id: 35, value: sudokuList[35]},
    {id: 36, value: sudokuList[36]},
    {id: 37, value: sudokuList[37]},
    {id: 38, value: sudokuList[38]},
    {id: 39, value: sudokuList[39]},
    {id: 40, value: sudokuList[40]},
    {id: 41, value: sudokuList[41]},
    {id: 42, value: sudokuList[42]},
    {id: 43, value: sudokuList[43]},
    {id: 44, value: sudokuList[44]},
    {id: 45, value: sudokuList[45]},
    {id: 46, value: sudokuList[46]},
    {id: 47, value: sudokuList[47]},
    {id: 48, value: sudokuList[48]},
    {id: 49, value: sudokuList[49]},
    {id: 50, value: sudokuList[50]},
    {id: 51, value: sudokuList[51]},
    {id: 52, value: sudokuList[52]},
    {id: 53, value: sudokuList[53]},
    {id: 54, value: sudokuList[54]},
    {id: 55, value: sudokuList[55]},
    {id: 56, value: sudokuList[56]},
    {id: 57, value: sudokuList[57]},
    {id: 58, value: sudokuList[58]},
    {id: 59, value: sudokuList[59]},
    {id: 60, value: sudokuList[60]},
    {id: 61, value: sudokuList[61]},
    {id: 62, value: sudokuList[62]},
    {id: 63, value: sudokuList[63]},
    {id: 64, value: sudokuList[64]},
    {id: 65, value: sudokuList[65]},
    {id: 66, value: sudokuList[66]},
    {id: 67, value: sudokuList[67]},
    {id: 68, value: sudokuList[68]},
    {id: 69, value: sudokuList[69]},
    {id: 70, value: sudokuList[70]},
    {id: 71, value: sudokuList[71]},
    {id: 72, value: sudokuList[72]},
    {id: 73, value: sudokuList[73]},
    {id: 74, value: sudokuList[74]},
    {id: 75, value: sudokuList[75]},
    {id: 76, value: sudokuList[76]},
    {id: 77, value: sudokuList[77]},
    {id: 78, value: sudokuList[78]},
    {id: 79, value: sudokuList[79]},
    {id: 80, value: sudokuList[80]}
  ];

  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => setSelectionId(item.id)}
        style={(item.id === selectionId) ? styles.selectedSudokuBlock : styles.sudokuBlock}
      >
        <Text style={{fontSize: 24}}>{item.value}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.sudokuGrid}>
      <FlatList
        data={sudokuData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sudokuBlock: {
    alignItems: "center",
    height: 35,
    width: 35,
    borderWidth: 1,
    borderColor: "#000",
    margin:1
  },
  selectedSudokuBlock: {
    alignItems: "center",
    height: 35,
    width: 35,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor:"#c9fff3",
    margin:1
  },
  sudokuGrid: {
    height: 343,
    width: 343,
    borderWidth: 5,
    borderColor: "#14274e",
    borderRadius: 3,
    margin: 10
  },
  button: {
    width: 130,
    borderRadius: 4,
    backgroundColor: "#14274e",
    justifyContent: "center",
    margin: 10,
    height: 40,
  },
  text: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
    textAlign:"center"
  },
  keypad: {
    height:147,
    borderColor: "#3E823E",
    borderWidth: 2,
    borderRadius: 6,
    padding: 1
  },
  key: {
    alignItems: "center",
    height: 45,
    width: 50,
    margin: 1,
    backgroundColor: "#C8F0C8",
    borderColor: "#3E823E",
    borderWidth: 2,
    borderRadius: 3
  },
  keyText: {
    color: "#3E823E",
    fontWeight: "bold",
    fontSize: 30
  }
});


export default solverDisplay;