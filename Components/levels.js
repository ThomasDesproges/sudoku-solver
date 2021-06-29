import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import SolverDisplay from "./gridDisplay";

const getRandomInt = (maxi) => {
    return Math.floor(Math.random() * maxi);
  };

const copy = (sudoku1) => {
  const sudoku2 = [];
  for (let r = 0; r < 9; r++) {
        sudoku2.push([...sudoku1[r]]);
        }
  return sudoku2;
};

const Levels = (props) =>{


    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TouchableOpacity
                onPress={()=>{props.setChooseLevel(false);
                        const i = getRandomInt(2);
                        const init = copy(props.levelS[0][i])
                        props.setInitialBoard(init);
                        props.setSudokuList(init);}}
                style={styles.button}
              >
                <Text style={styles.text}> Facile </Text>
              </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{props.setChooseLevel(false);
                        const i = getRandomInt(2);
                        const init = copy(props.levelS[1][i])
                        props.setInitialBoard(init);
                        props.setSudokuList(init);}}
                style={styles.button}
              >
                <Text style={styles.text}> Moyen </Text>
              </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{props.setChooseLevel(false);
                        const i = getRandomInt(2);
                        const init = copy(props.levelS[2][i])
                        props.setInitialBoard(init);
                        props.setSudokuList(init);}}
                style={styles.button}
              >
                <Text style={styles.text}> Difficile </Text>
              </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{props.setChooseLevel(false);
                        const i = getRandomInt(2);
                        const init = copy(props.levelS[3][i])
                        props.setInitialBoard(init);
                        props.setSudokuList(init);}}
                style={styles.button}
              >
                <Text style={styles.text}> Expert </Text>
              </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 200,
        borderRadius: 4,
        backgroundColor: "#14274e",
        justifyContent: "center",
        margin: 15,
        height: 80,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
});

export default Levels;