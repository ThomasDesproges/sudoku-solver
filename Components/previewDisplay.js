import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import React from "react";

const PreviewDisplay = (props) => (
    <View
        style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end"
        }}
    >

        <View>

            <TouchableOpacity
                onPress={() => props.setViewCapturedImage(false)}
                style={{
                    position:"absolute",
                    bottom: "10%",
                    left:"5%",
                    width: 150,
                    height: 50,
                    borderRadius: 4,
                    borderWidth: 4,
                    borderColor:"#aaa",
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <Text style={{color: "#888", fontSize: 18}}> Re-take </Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={props.__savePhoto}
                style={{
                    position:"absolute",
                    bottom: "10%",
                    right:"5%",
                    width: 150,
                    height: 50,
                    borderRadius: 4,
                    borderWidth: 4,
                    borderColor:"#aaa",
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <Text style={{color: "#888", fontSize: 18}}> Generate board </Text>

            </TouchableOpacity>

        </View>

    </View>
);


export default PreviewDisplay;