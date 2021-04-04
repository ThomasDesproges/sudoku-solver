import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';


const styles = StyleSheet.create({

  camera: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    padding: 5,
    opacity: 0.7,

  },

  button: {
    backgroundColor: '#fff',
    padding: 4,
    margin: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000'
  },

  text: {
    fontSize: 40,
    color: '#000',
  },
});



export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>

        <Camera style={styles.camera} type={type} ratio={'16:9'}>

          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text}> FLIP </Text>
            </TouchableOpacity>

          </View>

        </Camera>

      </View>
    );
  }
}