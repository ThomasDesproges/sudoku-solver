// eslint-disable-next-line no-unused-vars
import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {ImageBackground, StyleSheet, View} from "react-native";
import {Camera} from "expo-camera";
import MainMenu from "./Components/mainMenu";
import PreviewDisplay from "./Components/previewDisplay";
import CameraDisplay from "./Components/cameraDisplay";
import SolverDisplay from "./Components/gridDisplay";
import solve from "./resolution_sudoku/sudoku_algo";



// eslint-disable-next-line no-unused-vars
const tag = "[CAMERA]";

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);

  const [viewCapturedImage, setViewCapturedImage] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [gridVisible, setGridVisible] = useState(false);
  const [sudokuList, setSudokuList] = useState([
    [5, 0, 7, 8, 0, 1, 6, 0, 9],
    [8, 0, 4, 6, 0, 0, 0, 1, 2],
    [0, 6, 1, 0, 9, 4, 0, 0, 8],
    [0, 0, 0, 7, 0, 6, 0, 9, 0],
    [0, 3, 0, 1, 0, 8, 0, 0, 7],
    [0, 7, 0, 3, 2, 0, 0, 6, 0],
    [9, 0, 6, 4, 0, 3, 0, 2, 0],
    [0, 0, 8, 5, 0, 7, 0, 0, 1],
    [7, 0, 3, 0, 0, 2, 4, 0, 0],
  ]);
  const [selectionLine, setSelectionLine] = useState(-1);
  const [selectionColumn, setSelectionColumn] = useState(-1);

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

  const handleSudokuSolving = () => {
    const solvedBoard = solve(sudokuList);
    setSudokuList(solvedBoard);
  };

  const handleClearSudoku = () => {
    /* const clearBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]; */
    const clearBoard = [
      [5, 0, 7, 8, 0, 1, 6, 0, 9],
      [8, 0, 4, 6, 0, 0, 0, 1, 2],
      [0, 6, 1, 0, 9, 4, 0, 0, 8],
      [0, 0, 0, 7, 0, 6, 0, 9, 0],
      [0, 3, 0, 1, 0, 8, 0, 0, 7],
      [0, 7, 0, 3, 2, 0, 0, 6, 0],
      [9, 0, 6, 4, 0, 3, 0, 2, 0],
      [0, 0, 8, 5, 0, 7, 0, 0, 1],
      [7, 0, 3, 0, 0, 2, 4, 0, 0],
    ];
    setSudokuList(clearBoard);
  };

  return (

    <View id="appRoot" style={{flex: 1}}>

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
                handleSudokuSolving={handleSudokuSolving}
                handleClearSudoku={handleClearSudoku}
                sudokuList={sudokuList}
                setSudokuList={setSudokuList}
                setStartOver={setStartOver}
                setGridVisible={setGridVisible}
                selectionLine={selectionLine}
                selectionColumn={selectionColumn}
                setSelectionLine={setSelectionLine}
                setSelectionColumn={setSelectionColumn}
              />

            :

              <CameraDisplay
                type={type}
                camera={camera}
                __closeCamera={__closeCamera}
                setType={setType}
                __takePicture={__takePicture}
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



