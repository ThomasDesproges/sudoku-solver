import React from "react";
import {ImageBackground} from "react-native";

function imageBackground(img, foreground) {
    return (
        <ImageBackground
            source={{uri: img && img.uri}}
            style={{
                flex: 1
            }}
        >
            {foreground()}
        </ImageBackground>
    );
}

export default imageBackground;