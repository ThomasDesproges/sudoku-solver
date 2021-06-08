import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

function mainMenu(setStartOver) {
    return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text style={{color: "#000", fontSize: 40, fontWeight: "bold"}}> Sudoku </Text>
            <Text style={{color: "#000", fontSize: 40, fontWeight: "bold"}}> Solver </Text>
          </View>

          <TouchableOpacity
            onPress={() => setStartOver(false)}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >

            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Take picture </Text>

          </TouchableOpacity>

        </View>
    );
}

export default mainMenu;