import {Image, Text, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";
import React from "react";

const CameraDisplay = (props) => (
    <Camera
        style={{flex: 1}}
        type={props.type}
        ref={(r) => {
            props.camera = r;
        }}
    >

        <View
            style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
            }}
        >

            <TouchableOpacity
                onPress={props.__closeCamera}
                style={{
                    position: "absolute",
                    top: "5%",
                    right: "5%"
                }}
            >

                <Text style={{color: "#fff", fontSize: 50, fontWeight:"bold"}}> × </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: "6%",
                    left: "7%",
                    width: 50,
                    height: 50,
                    borderRadius: 4,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={() => {
                    props.setType(
                        props.type === Camera.Constants.Type.back ?
                            Camera.Constants.Type.front :
                            Camera.Constants.Type.back
                    );
                }}
            >

                <Image
                    source = {require("../images/renew.png")}
                    style={{
                        width: 50,
                        height: 50,
                        margin: 20
                    }}
                 />

            </TouchableOpacity>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between"
                }}
            >
                <View
                    style={{
                        alignSelf: "center",
                        flex: 1,
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        onPress={props.__takePicture}
                        style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: "#fff",
                            borderWidth: 4,
                            borderColor: "#aaa"
                        }}
                    />
                </View>
            </View>
        </View>
    </Camera>
);


export default CameraDisplay;