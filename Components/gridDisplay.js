import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

function gridDisplay(sudokuList, sudokuData, setStartOver, setGridVisible, selectionId, setSelectionId) {

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

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => setSelectionId(item.id)}
      style={(item.id === selectionId) ? styles.selectedSudokuBlock : styles.sudokuBlock}
    >
      <Text style={{fontSize: 24}}>{item.value}</Text>
    </TouchableOpacity>
  );

  const renderKey = ({item}) => (
    <TouchableOpacity
      onPress={
        () => {
          sudokuList.splice(selectionId, 1, item.id);
          sudokuData.splice(selectionId, 1, {id:selectionId, value:item.id});
          console.log(sudokuList[0]);
          console.log(sudokuData[0]);
        }
      }
      style={styles.key}
    >
      <Text style={{fontSize: 24}}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View styles={{flex: 1}}>
        <Text style={styles.text}> Current Sudoku </Text>
      </View>

      <View style={styles.sudokuGrid}>
        <FlatList
          data={sudokuData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={9}
        />
      </View>

      <View style={styles.keypad}>
        <FlatList
          data={keypadData}
          renderItem={renderKey}
          keyExtractor={item => item.id}
          numColumns={9}
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
    height: 339,
    borderWidth: 3,
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
    height:50
  },
  key: {
    alignItems: "center",
    height: 40,
    width: 34,
    margin: 2,
    backgroundColor: "rgba(96,198,96,0.75)",
    borderColor: "rgba(62,130,62,0.75)",
    borderWidth: 3,
    borderRadius: 3,
  }
});


export default gridDisplay;