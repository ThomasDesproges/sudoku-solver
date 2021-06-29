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
            props.handleSudokuModification(
              props.selectionLine,
              props.selectionColumn,
              item.id
            );
            console.log(props.sudokuList[0][0]);
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
        <Text style={styles.text}> Sudoku Solver </Text>
      </View>

      <GridDisplay
        sudokuList={props.sudokuList}
        selectionLine={props.selectionLine}
        setSelectionLine={props.setSelectionLine}
        selectionColumn={props.selectionColumn}
        setSelectionColumn={props.setSelectionColumn}
        initialBoard = {props.initialBoard}
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
                props.handleSudokuModification(
                  props.selectionLine,
                  props.selectionColumn,
                  0
                );
              }
            }
            style={styles.key}
          >
            <Text style={styles.keyText}>×</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {props.setStartOver(true); props.setGridVisible(false);}}
            style={styles.button}
          >
            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Menu </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={props.handleSudokuSolving}
            style={styles.button}
          >
            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Solve </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={
              () => {
                props.indice(
                  props.selectionLine,
                  props.selectionColumn
                );
              }
            }
            style = {styles.button}
            >
            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Indice </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={props.handleClearSudoku}
            style={styles.button}
          >
            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Clear </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={props.handleResetSudoku}
            style={styles.button}
          >
            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Reset </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={props.handleSaveSudoku}
            style={styles.button}
          >
            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Save </Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
};

const GridDisplay = (props) => {

  const sudokuData = [
    {id: 0*9 + 0, value: props.sudokuList[0][0]},
    {id: 0*9 + 1, value: props.sudokuList[0][1]},
    {id: 0*9 + 2, value: props.sudokuList[0][2]},
    {id: 0*9 + 3, value: props.sudokuList[0][3]},
    {id: 0*9 + 4, value: props.sudokuList[0][4]},
    {id: 0*9 + 5, value: props.sudokuList[0][5]},
    {id: 0*9 + 6, value: props.sudokuList[0][6]},
    {id: 0*9 + 7, value: props.sudokuList[0][7]},
    {id: 0*9 + 8, value: props.sudokuList[0][8]},
    {id: 1*9 + 0, value: props.sudokuList[1][0]},
    {id: 1*9 + 1, value: props.sudokuList[1][1]},
    {id: 1*9 + 2, value: props.sudokuList[1][2]},
    {id: 1*9 + 3, value: props.sudokuList[1][3]},
    {id: 1*9 + 4, value: props.sudokuList[1][4]},
    {id: 1*9 + 5, value: props.sudokuList[1][5]},
    {id: 1*9 + 6, value: props.sudokuList[1][6]},
    {id: 1*9 + 7, value: props.sudokuList[1][7]},
    {id: 1*9 + 8, value: props.sudokuList[1][8]},
    {id: 2*9 + 0, value: props.sudokuList[2][0]},
    {id: 2*9 + 1, value: props.sudokuList[2][1]},
    {id: 2*9 + 2, value: props.sudokuList[2][2]},
    {id: 2*9 + 3, value: props.sudokuList[2][3]},
    {id: 2*9 + 4, value: props.sudokuList[2][4]},
    {id: 2*9 + 5, value: props.sudokuList[2][5]},
    {id: 2*9 + 6, value: props.sudokuList[2][6]},
    {id: 2*9 + 7, value: props.sudokuList[2][7]},
    {id: 2*9 + 8, value: props.sudokuList[2][8]},
    {id: 3*9 + 0, value: props.sudokuList[3][0]},
    {id: 3*9 + 1, value: props.sudokuList[3][1]},
    {id: 3*9 + 2, value: props.sudokuList[3][2]},
    {id: 3*9 + 3, value: props.sudokuList[3][3]},
    {id: 3*9 + 4, value: props.sudokuList[3][4]},
    {id: 3*9 + 5, value: props.sudokuList[3][5]},
    {id: 3*9 + 6, value: props.sudokuList[3][6]},
    {id: 3*9 + 7, value: props.sudokuList[3][7]},
    {id: 3*9 + 8, value: props.sudokuList[3][8]},
    {id: 4*9 + 0, value: props.sudokuList[4][0]},
    {id: 4*9 + 1, value: props.sudokuList[4][1]},
    {id: 4*9 + 2, value: props.sudokuList[4][2]},
    {id: 4*9 + 3, value: props.sudokuList[4][3]},
    {id: 4*9 + 4, value: props.sudokuList[4][4]},
    {id: 4*9 + 5, value: props.sudokuList[4][5]},
    {id: 4*9 + 6, value: props.sudokuList[4][6]},
    {id: 4*9 + 7, value: props.sudokuList[4][7]},
    {id: 4*9 + 8, value: props.sudokuList[4][8]},
    {id: 5*9 + 0, value: props.sudokuList[5][0]},
    {id: 5*9 + 1, value: props.sudokuList[5][1]},
    {id: 5*9 + 2, value: props.sudokuList[5][2]},
    {id: 5*9 + 3, value: props.sudokuList[5][3]},
    {id: 5*9 + 4, value: props.sudokuList[5][4]},
    {id: 5*9 + 5, value: props.sudokuList[5][5]},
    {id: 5*9 + 6, value: props.sudokuList[5][6]},
    {id: 5*9 + 7, value: props.sudokuList[5][7]},
    {id: 5*9 + 8, value: props.sudokuList[5][8]},
    {id: 6*9 + 0, value: props.sudokuList[6][0]},
    {id: 6*9 + 1, value: props.sudokuList[6][1]},
    {id: 6*9 + 2, value: props.sudokuList[6][2]},
    {id: 6*9 + 3, value: props.sudokuList[6][3]},
    {id: 6*9 + 4, value: props.sudokuList[6][4]},
    {id: 6*9 + 5, value: props.sudokuList[6][5]},
    {id: 6*9 + 6, value: props.sudokuList[6][6]},
    {id: 6*9 + 7, value: props.sudokuList[6][7]},
    {id: 6*9 + 8, value: props.sudokuList[6][8]},
    {id: 7*9 + 0, value: props.sudokuList[7][0]},
    {id: 7*9 + 1, value: props.sudokuList[7][1]},
    {id: 7*9 + 2, value: props.sudokuList[7][2]},
    {id: 7*9 + 3, value: props.sudokuList[7][3]},
    {id: 7*9 + 4, value: props.sudokuList[7][4]},
    {id: 7*9 + 5, value: props.sudokuList[7][5]},
    {id: 7*9 + 6, value: props.sudokuList[7][6]},
    {id: 7*9 + 7, value: props.sudokuList[7][7]},
    {id: 7*9 + 8, value: props.sudokuList[7][8]},
    {id: 8*9 + 0, value: props.sudokuList[8][0]},
    {id: 8*9 + 1, value: props.sudokuList[8][1]},
    {id: 8*9 + 2, value: props.sudokuList[8][2]},
    {id: 8*9 + 3, value: props.sudokuList[8][3]},
    {id: 8*9 + 4, value: props.sudokuList[8][4]},
    {id: 8*9 + 5, value: props.sudokuList[8][5]},
    {id: 8*9 + 6, value: props.sudokuList[8][6]},
    {id: 8*9 + 7, value: props.sudokuList[8][7]},
    {id: 8*9 + 8, value: props.sudokuList[8][8]},
  ];

  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          const i = Math.floor(item.id/9);
          const j = item.id % 9;
          if (props.initialBoard[i][j] === 0) {
            props.setSelectionLine(i);
            props.setSelectionColumn(j);
          }
        }}
        style={
          ((Math.floor(item.id/9) === props.selectionLine) && (item.id % 9 === props.selectionColumn)) ?
              styles.selectedSudokuBlock : 
              styles.sudokuBlock
        }
      >
        <Text
          style={
            (props.initialBoard[Math.floor(item.id/9)][item.id % 9] === 0) ?
              {fontSize:24, color:"#666"} :
              {fontSize:24 , fontWeight:"bold"}
        }
        >
          {(item.value === 0) ? " " : item.value}
        </Text>
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
    marginBottom: 5,
    marginLeft:10,
    height: 29,
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