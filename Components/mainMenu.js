import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

function mainMenu(setStartOver, setGridVisible) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyItems: "space-evenly",
            }}
        >
            <View style={{
                flex: 3/5,
                justifyContent: "center",
            }}>
                <Text style={{color: "#000", fontSize: 40, fontWeight: "bold", textAlign:"center"}}> Sudoku </Text>
                <Text style={{color: "#000", fontSize: 40, fontWeight: "bold", textAlign:"center"}}> Solver </Text>
            </View>

            <TouchableOpacity
                onPress={() => setStartOver(false)}
                style={{
                    width: 130,
                    borderRadius: 4,
                    backgroundColor: "#14274e",
                    justifyContent: "center",
                    margin: 10,
                    height: 40,
                }}
            >
                <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Take picture </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {setStartOver(false); setGridVisible(true);}}
                style={{
                    width: 130,
                    borderRadius: 4,
                    backgroundColor: "#14274e",
                    justifyContent: "center",
                    margin: 10,
                    height: 40,
                }}
            >
                <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Display grid </Text>
            </TouchableOpacity>

        </View>
    );
}

export default mainMenu;