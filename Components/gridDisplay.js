import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const SolverDisplay = (props) => {

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
            props.handleSudokuModification(props.selectionId, item.id);
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

      <GridDisplay
        sudokuList={props.sudokuList}
        selectionId={props.selectionId}
        setSelectionId={props.setSelectionId}
      />

      <View style={{flexDirection: "row"}}>

        <View style={styles.keypad}>
          <FlatList
            data={keypadData}
            renderItem={renderKey}
            keyExtractor={item => item.id}
            numColumns={3}
          />
          <TouchableOpacity
            onPress={
              () => {
                props.handleSudokuModification(props.selectionId, " ");
              }
            }
            style={styles.key}
          >
            <Text style={styles.keyText}>×</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {props.setStartOver(true); props.setGridVisible(false);}}
          style={styles.button}
        >
          <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Menu </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const GridDisplay = (props) => {

  const sudokuData = [
    {id: 0, value: props.sudokuList[0]},
    {id: 1, value: props.sudokuList[1]},
    {id: 2, value: props.sudokuList[2]},
    {id: 3, value: props.sudokuList[3]},
    {id: 4, value: props.sudokuList[4]},
    {id: 5, value: props.sudokuList[5]},
    {id: 6, value: props.sudokuList[6]},
    {id: 7, value: props.sudokuList[7]},
    {id: 8, value: props.sudokuList[8]},
    {id: 9, value: props.sudokuList[9]},
    {id: 10, value: props.sudokuList[10]},
    {id: 11, value: props.sudokuList[11]},
    {id: 12, value: props.sudokuList[12]},
    {id: 13, value: props.sudokuList[13]},
    {id: 14, value: props.sudokuList[14]},
    {id: 15, value: props.sudokuList[15]},
    {id: 16, value: props.sudokuList[16]},
    {id: 17, value: props.sudokuList[17]},
    {id: 18, value: props.sudokuList[18]},
    {id: 19, value: props.sudokuList[19]},
    {id: 20, value: props.sudokuList[20]},
    {id: 21, value: props.sudokuList[21]},
    {id: 22, value: props.sudokuList[22]},
    {id: 23, value: props.sudokuList[23]},
    {id: 24, value: props.sudokuList[24]},
    {id: 25, value: props.sudokuList[25]},
    {id: 26, value: props.sudokuList[26]},
    {id: 27, value: props.sudokuList[27]},
    {id: 28, value: props.sudokuList[28]},
    {id: 29, value: props.sudokuList[29]},
    {id: 30, value: props.sudokuList[30]},
    {id: 31, value: props.sudokuList[31]},
    {id: 32, value: props.sudokuList[32]},
    {id: 33, value: props.sudokuList[33]},
    {id: 34, value: props.sudokuList[34]},
    {id: 35, value: props.sudokuList[35]},
    {id: 36, value: props.sudokuList[36]},
    {id: 37, value: props.sudokuList[37]},
    {id: 38, value: props.sudokuList[38]},
    {id: 39, value: props.sudokuList[39]},
    {id: 40, value: props.sudokuList[40]},
    {id: 41, value: props.sudokuList[41]},
    {id: 42, value: props.sudokuList[42]},
    {id: 43, value: props.sudokuList[43]},
    {id: 44, value: props.sudokuList[44]},
    {id: 45, value: props.sudokuList[45]},
    {id: 46, value: props.sudokuList[46]},
    {id: 47, value: props.sudokuList[47]},
    {id: 48, value: props.sudokuList[48]},
    {id: 49, value: props.sudokuList[49]},
    {id: 50, value: props.sudokuList[50]},
    {id: 51, value: props.sudokuList[51]},
    {id: 52, value: props.sudokuList[52]},
    {id: 53, value: props.sudokuList[53]},
    {id: 54, value: props.sudokuList[54]},
    {id: 55, value: props.sudokuList[55]},
    {id: 56, value: props.sudokuList[56]},
    {id: 57, value: props.sudokuList[57]},
    {id: 58, value: props.sudokuList[58]},
    {id: 59, value: props.sudokuList[59]},
    {id: 60, value: props.sudokuList[60]},
    {id: 61, value: props.sudokuList[61]},
    {id: 62, value: props.sudokuList[62]},
    {id: 63, value: props.sudokuList[63]},
    {id: 64, value: props.sudokuList[64]},
    {id: 65, value: props.sudokuList[65]},
    {id: 66, value: props.sudokuList[66]},
    {id: 67, value: props.sudokuList[67]},
    {id: 68, value: props.sudokuList[68]},
    {id: 69, value: props.sudokuList[69]},
    {id: 70, value: props.sudokuList[70]},
    {id: 71, value: props.sudokuList[71]},
    {id: 72, value: props.sudokuList[72]},
    {id: 73, value: props.sudokuList[73]},
    {id: 74, value: props.sudokuList[74]},
    {id: 75, value: props.sudokuList[75]},
    {id: 76, value: props.sudokuList[76]},
    {id: 77, value: props.sudokuList[77]},
    {id: 78, value: props.sudokuList[78]},
    {id: 79, value: props.sudokuList[79]},
    {id: 80, value: props.sudokuList[80]}
  ];

  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => props.setSelectionId(item.id)}
        style={(item.id === props.selectionId) ? styles.selectedSudokuBlock : styles.sudokuBlock}
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
};

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
    height:200,
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


export default SolverDisplay;