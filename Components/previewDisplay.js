import {Text, TouchableOpacity, View} from "react-native";
import React from "react";

function previewDisplay(setViewCapturedImage, __savePhoto) {
    return (
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
                    onPress={() => setViewCapturedImage(false)}
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
                    onPress={__savePhoto}
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
}


export default previewDisplay;