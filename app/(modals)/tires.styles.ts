import { StyleSheet, Dimensions } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";
const windowWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // marginTop: 100,
    justifyContent: "center",
    backgroundColor: "white",
  },
  tire: {
    width: "5%",
    height: "6%",
    zIndex: 1,
    position: "absolute",
    // borderRadius: 50,
    // margin: 5,
  },

  camion: {
    alignSelf: "center",
    marginTop: "78%",

    width: "150%",
    height: "11%",
    transform: [{ rotate: "270deg" }],
    // borderRadius: 50,
    // margin: 5,
  },
  add: {
    // alignSelf: "center",
    // marginTop: "78%",
    // position: "absolute",
    zIndex: 10,
    width: 60,
    height: 60,
    marginLeft: "80%",
    marginTop: "60%",

    // transform: [{ rotate: "270deg" }],
    // borderRadius: 50,
    // margin: 5,
  },
  addInformation: {
    backgroundColor: "#2A3B76",
    marginBottom: 40,
    zIndex: 10,
    marginTop: "65%",
  },
  number: {
    fontSize: 15,
    zIndex: 2,
    // alignSelf: "center",
    textAlign: "center",
    borderWidth: 1,
    width: 30,
    height: 30,
    // borderRadius: 15,
    // rounded: true,
    lineHeight: 30, // Add this line
    // marginTop: "60%",
    // marginLeft: "10%",
  },

  //fila1
  number1: {
    position: "absolute",
    marginTop: "20%",
    marginLeft: "33%",
  },
  number2: {
    position: "absolute",
    marginTop: "20%",
    marginLeft: "60%",
  },
  //fila 2
  number3: {
    position: "absolute",
    marginTop: "54%",
    marginLeft: "24%",
  },

  number4: {
    position: "absolute",
    marginTop: "54%",
    marginLeft: "33%",
  },

  number5: {
    position: "absolute",
    marginTop: "54%",
    marginLeft: "60%",
  },

  number6: {
    position: "absolute",
    marginTop: "54%",
    marginLeft: "69%",
  },
  //fila 3

  number7: {
    position: "absolute",
    marginTop: "63%",
    marginLeft: "24%",
  },

  number8: {
    position: "absolute",
    marginTop: "63%",
    marginLeft: "33%",
  },

  number9: {
    position: "absolute",
    marginTop: "63%",
    marginLeft: "60%",
  },

  number10: {
    position: "absolute",
    marginTop: "63%",
    marginLeft: "69%",
  },
  //fila 4

  number11: {
    position: "absolute",
    marginTop: "133%",
    marginLeft: "24%",
  },

  number12: {
    position: "absolute",
    marginTop: "133%",
    marginLeft: "33%",
  },

  number13: {
    position: "absolute",
    marginTop: "133%",
    marginLeft: "60%",
  },

  number14: {
    position: "absolute",
    marginTop: "133%",
    marginLeft: "69%",
  },
  //fila 5

  number15: {
    position: "absolute",
    marginTop: "142%",
    marginLeft: "24%",
  },

  number16: {
    position: "absolute",
    marginTop: "142%",
    marginLeft: "33%",
  },

  number17: {
    position: "absolute",
    marginTop: "142%",
    marginLeft: "60%",
  },

  number18: {
    position: "absolute",
    marginTop: "142%",
    marginLeft: "69%",
  },
  //fila 6

  number19: {
    position: "absolute",
    marginTop: "151%",
    marginLeft: "24%",
  },
  number20: {
    position: "absolute",
    marginTop: "151%",
    marginLeft: "33%",
  },
  number21: {
    position: "absolute",
    marginTop: "151%",
    marginLeft: "60%",
  },
  number22: {
    position: "absolute",
    marginTop: "151%",
    marginLeft: "69%",
  },
});
