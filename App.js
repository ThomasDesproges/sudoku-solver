// eslint-disable-next-line no-unused-vars
import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {Camera} from "expo-camera";
import imageBackground from "./Components/imageBackground";
import mainMenu from "./Components/mainMenu";
import previewDisplay from "./Components/previewDisplay";
import cameraDisplay from "./Components/cameraDisplay";
import solverDisplay from "./Components/gridDisplay";


// eslint-disable-next-line no-unused-vars
const tag = "[CAMERA]";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  const [viewCapturedImage, setViewCapturedImage] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [gridVisible, setGridVisible] = useState(false);
  const sudokuList = [5," ",7,8," ",1,6," ",9,8," ",4,6," "," "," ",1,2," ",6,1," ",9,4," "," ",8," "," "," ",7," ",6," ",9," "," ",3," ",1," ",8," "," ",7," ",7," ",3,2," "," ",6," ",9," ",6,4," ",3," ",2," "," "," ",8,5," ",7," "," ",1,7," ",3," "," ",2,4," "," "];
  const [selectionId, setSelectionId] = useState(-1);

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

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setViewCapturedImage(true);
    setCapturedImage(photo);
  };

  const __savePhoto = async () => {};

  return (

    <View style={{flex: 1}}>

      {startOver ?
        mainMenu(setStartOver, setGridVisible)

        : (
          <View style={{flex: 1}}>

            {viewCapturedImage ?
              imageBackground(
                capturedImage,
                () => previewDisplay(setViewCapturedImage, __savePhoto)
              )
            : gridVisible ?
              solverDisplay(
                sudokuList,
                /* sudokuData, */
                setStartOver,
                setGridVisible,
                selectionId,
                setSelectionId
              )
            : cameraDisplay(
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



