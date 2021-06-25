import {Text, TouchableOpacity, View} from "react-native";
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

        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >

            <TouchableOpacity
                onPress={() => props.setViewCapturedImage(false)}
                style={{
                    width: 130,
                    height: 40,
                    alignItems: "center",
                    borderRadius: 4
                }}
            >

                <Text style={{color: "#fff", fontSize: 20}}> Re-take </Text>

            </TouchableOpacity>

            <TouchableOpacity
                onPress={props.__savePhoto}
                style={{
                    width: 130,
                    height: 40,
                    alignItems: "center",
                    borderRadius: 4
                }}
            >

                <Text style={{color: "#fff", fontSize: 20}}> save photo </Text>

            </TouchableOpacity>

        </View>

    </View>
);

export default PreviewDisplay;