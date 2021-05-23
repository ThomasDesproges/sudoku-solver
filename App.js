// eslint-disable-next-line no-unused-vars
import {StatusBar} from "expo-status-bar";
import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image} from "react-native";
import {Camera} from "expo-camera";


// eslint-disable-next-line no-unused-vars
const tag = "[CAMERA]";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [startOver, setStartOver] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);

  let camera: Camera;
  useEffect(() => {
    ;(async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // eslint-disable-next-line no-underscore-dangle
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

  // eslint-disable-next-line no-underscore-dangle
  const __savePhoto = async () => {};

  return (
    <View
      style={{
        flex: 1
      }}
    >

      {startOver ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >

          <TouchableOpacity
            onPress={() => setStartOver(false)}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40
            }}
          >

            <Text style={{color: "#fff", fontWeight: "bold", textAlign: "center"}}> Take picture </Text>

          </TouchableOpacity>

        </View>
      ) : (
        <View
          style={{
            flex: 1
          }}
        >

          {previewVisible ? (
            <ImageBackground
              source={{uri: capturedImage && capturedImage.uri}}
              style={{
                flex: 1
              }}
            >

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
                    onPress={() => setPreviewVisible(false)}
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

            </ImageBackground>

          ) : (
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
                    borderColor: "#aaa",
                    borderWidth: 4,
                    backgroundColor: "#fff",
                    flexDirection: "row",
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

                  <Text style={{fontSize: 20, fontWeight: "bold", color: "#000"}}> Flip </Text>

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
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  }
});