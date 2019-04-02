import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

export default class Untitled extends Component {
  render() {
    return (
      <View style={styles.root}>
          <Image
            source={require("./assets/twilio.png")}
            style={styles.image}/>
          <Image source={require("./assets/logo.png")} style={styles.image2} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    textAlign:"center"
  },
  image: {
    height: 42,
    width: 225,
    position: "absolute",
    top: "91.35%",
    width:"80%",
    marginLeft:"10%"
  },
  image2: {
    height: 319,
    width: 355,
    position: "absolute",
    opacity: 1,
    marginTop:"30%"
  }
});
