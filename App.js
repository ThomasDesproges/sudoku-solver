// eslint-disable-next-line no-unused-vars
import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";
import MainMenu from "./Components/mainMenu";
import PreviewDisplay from "./Components/previewDisplay";
import CameraDisplay from "./Components/cameraDisplay";
import SolverDisplay from "./Components/gridDisplay";
import solve from "./resolution_sudoku/sudoku_algo";

const copy = (sudoku1) => {
  const sudoku2 = [];
  for (let r = 0; r < 9; r++) {
        sudoku2.push([...sudoku1[r]]);
        }
  return sudoku2;
};

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

  const [initialBoard, setInitialBoard] = useState([
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
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setViewCapturedImage(true);
    setCapturedImage(photo);
  };

  const __savePhoto = async () => {};

  const handleSudokuModification = (i, j, value) => {
    const newSudokuList = [...sudokuList];
    newSudokuList[i][j] = value;
    setSudokuList(newSudokuList);
  };

  const handleSudokuSolving = () => {
    const solvedBoard = solve(sudokuList);
    setSudokuList(solvedBoard);
  };

  const indice = (i,j) => {
    const newSudokuList = copy(sudokuList);
    const solvedBoard = solve(sudokuList);
    newSudokuList[i][j] = solvedBoard[i][j];
    setSudokuList(newSudokuList);
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
                <PreviewDisplay
                  setViewCapturedImage= {setViewCapturedImage}
                  __savePhoto = {__savePhoto}/>
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
                indice = {indice}
                initialBoard = {initialBoard}
              />

            :

              /*<CameraDisplay
                type={type}
                camera={camera}
                __closeCamera={__closeCamera}
                setType={setType}
                __takePicture={__takePicture}
              />*/
                <Camera
                    style={{flex: 1}}
                    type={type}
                    ref={(r) => {
                        camera = r;
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
                            onPress={__closeCamera}
                            style={{
                                position: "absolute",
                                top: "5%",
                                right: "5%",
                                width: 50,
                                height: 50,
                                borderRadius: 4,
                                borderWidth: 4,
                                backgroundColor: "#fff",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <Text style={{color: "#888", fontSize: 40, fontWeight:"bold"}}> × </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                top: "5%",
                                left: "5%",
                                width: 50,
                                height: 50,
                                borderRadius: 4,
                                borderWidth: 4,
                                backgroundColor: "#fff",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back ?
                                        Camera.Constants.Type.front :
                                        Camera.Constants.Type.back
                                );
                            }}
                        >

                            <Image
                                source = {require("./images/renew.png")}
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
                                    onPress={__takePicture}
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



