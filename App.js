// eslint-disable-next-line no-unused-vars
import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image} from "react-native";
import {Camera} from "expo-camera";
import imageBackground from "./Components/imageBackground";
import mainMenu from "./Components/mainMenu";
import previewDisplay from "./Components/previewDisplay";
import cameraDisplay from "./Components/cameraDisplay";
import gridDisplay from "./Components/gridDisplayBis";


// eslint-disable-next-line no-unused-vars
const tag = "[CAMERA]";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [gridVisible, setGridVisible] = useState(false);

  const [startOver, setStartOver] = useState(true);

  const [type, setType] = useState(Camera.Constants.Type.back);

  let camera: Camera;
  useEffect(() => {
    ;(async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const __closeCamera = () => {
    setStartOver(true);
  };

  // eslint-disable-next-line no-underscore-dangle
  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __savePhoto = async () => {};

  return (

    <View style={{flex: 1}}>

      {startOver ?
        mainMenu(setStartOver, setGridVisible)

        : (
          <View style={{flex: 1}}>

            {previewVisible ?
              imageBackground(
                capturedImage,
                () => previewDisplay(setPreviewVisible, __savePhoto)
              )
            /* : gridVisible ?
              gridDisplay()
            */
            :  cameraDisplay(
                  type,
                  camera,
                  __closeCamera,
                  setType,
                  __takePicture
                )
            }

          </View>
          )}
    </View>
  );
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  }
});



