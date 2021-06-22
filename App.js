// eslint-disable-next-line no-unused-vars
import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image} from "react-native";
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
  /* const sudokuData = [
    {id: 0, value: sudokuList[0]},
    {id: 1, value: sudokuList[1]},
    {id: 2, value: sudokuList[2]},
    {id: 3, value: sudokuList[3]},
    {id: 4, value: sudokuList[4]},
    {id: 5, value: sudokuList[5]},
    {id: 6, value: sudokuList[6]},
    {id: 7, value: sudokuList[7]},
    {id: 8, value: sudokuList[8]},
    {id: 9, value: sudokuList[9]},
    {id: 10, value: sudokuList[10]},
    {id: 11, value: sudokuList[11]},
    {id: 12, value: sudokuList[12]},
    {id: 13, value: sudokuList[13]},
    {id: 14, value: sudokuList[14]},
    {id: 15, value: sudokuList[15]},
    {id: 16, value: sudokuList[16]},
    {id: 17, value: sudokuList[17]},
    {id: 18, value: sudokuList[18]},
    {id: 19, value: sudokuList[19]},
    {id: 20, value: sudokuList[20]},
    {id: 21, value: sudokuList[21]},
    {id: 22, value: sudokuList[22]},
    {id: 23, value: sudokuList[23]},
    {id: 24, value: sudokuList[24]},
    {id: 25, value: sudokuList[25]},
    {id: 26, value: sudokuList[26]},
    {id: 27, value: sudokuList[27]},
    {id: 28, value: sudokuList[28]},
    {id: 29, value: sudokuList[29]},
    {id: 30, value: sudokuList[30]},
    {id: 31, value: sudokuList[31]},
    {id: 32, value: sudokuList[32]},
    {id: 33, value: sudokuList[33]},
    {id: 34, value: sudokuList[34]},
    {id: 35, value: sudokuList[35]},
    {id: 36, value: sudokuList[36]},
    {id: 37, value: sudokuList[37]},
    {id: 38, value: sudokuList[38]},
    {id: 39, value: sudokuList[39]},
    {id: 40, value: sudokuList[40]},
    {id: 41, value: sudokuList[41]},
    {id: 42, value: sudokuList[42]},
    {id: 43, value: sudokuList[43]},
    {id: 44, value: sudokuList[44]},
    {id: 45, value: sudokuList[45]},
    {id: 46, value: sudokuList[46]},
    {id: 47, value: sudokuList[47]},
    {id: 48, value: sudokuList[48]},
    {id: 49, value: sudokuList[49]},
    {id: 50, value: sudokuList[50]},
    {id: 51, value: sudokuList[51]},
    {id: 52, value: sudokuList[52]},
    {id: 53, value: sudokuList[53]},
    {id: 54, value: sudokuList[54]},
    {id: 55, value: sudokuList[55]},
    {id: 56, value: sudokuList[56]},
    {id: 57, value: sudokuList[57]},
    {id: 58, value: sudokuList[58]},
    {id: 59, value: sudokuList[59]},
    {id: 60, value: sudokuList[60]},
    {id: 61, value: sudokuList[61]},
    {id: 62, value: sudokuList[62]},
    {id: 63, value: sudokuList[63]},
    {id: 64, value: sudokuList[64]},
    {id: 65, value: sudokuList[65]},
    {id: 66, value: sudokuList[66]},
    {id: 67, value: sudokuList[67]},
    {id: 68, value: sudokuList[68]},
    {id: 69, value: sudokuList[69]},
    {id: 70, value: sudokuList[70]},
    {id: 71, value: sudokuList[71]},
    {id: 72, value: sudokuList[72]},
    {id: 73, value: sudokuList[73]},
    {id: 74, value: sudokuList[74]},
    {id: 75, value: sudokuList[75]},
    {id: 76, value: sudokuList[76]},
    {id: 77, value: sudokuList[77]},
    {id: 78, value: sudokuList[78]},
    {id: 79, value: sudokuList[79]},
    {id: 80, value: sudokuList[80]}
  ]; */
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



