// eslint-disable-next-line no-unused-vars
import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {ImageBackground, StyleSheet, View} from "react-native";
import {Camera} from "expo-camera";
import MainMenu from "./Components/mainMenu";
import PreviewDisplay from "./Components/previewDisplay";
import CameraDisplay from "./Components/cameraDisplay";
import SolverDisplay from "./Components/gridDisplay";



// eslint-disable-next-line no-unused-vars
const tag = "[CAMERA]";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  const [viewCapturedImage, setViewCapturedImage] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [gridVisible, setGridVisible] = useState(false);
  const [sudokuList, setSudokuList] = useState([5," ",7,8," ",1,6," ",9,8," ",4,6," "," "," ",1,2," ",6,1," ",9,4," "," ",8," "," "," ",7," ",6," ",9," "," ",3," ",1," ",8," "," ",7," ",7," ",3,2," "," ",6," ",9," ",6,4," ",3," ",2," "," "," ",8,5," ",7," "," ",1,7," ",3," "," ",2,4," "," "]);
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

  const handleSudokuModification = (index, value) => {
    const newSudokuList = [...sudokuList];
    newSudokuList[index] = value;
    setSudokuList(newSudokuList);
  };

  return (

    <View style={{flex: 1}}>

      {startOver ?

        <MainMenu setStartOver={setStartOver} setGridVisible={setGridVisible}/>

        : (

          <View style={{flex: 1}}>

            {viewCapturedImage ?

              <ImageBackground
                source={{uri: capturedImage && capturedImage.uri}}
                style={{
                  flex: 1
                }}
              >
                {PreviewDisplay(setViewCapturedImage, __savePhoto)}
              </ImageBackground>

            : gridVisible ?

              <SolverDisplay
                handleSudokuModification={handleSudokuModification}
                sudokuList={sudokuList}
                setSudokuList={setSudokuList}
                setStartOver={setStartOver}
                setGridVisible={setGridVisible}
                selectionId={selectionId}
                setSelectionId={setSelectionId}
              />

            :

              <CameraDisplay
                type={type}
                camera={camera}
                __closeCamera={__closeCamera}
                setType={setType}
                __takePicture={__takePicture()}
              />
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



