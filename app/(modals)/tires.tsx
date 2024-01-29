import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./tires.styles";
import { Avatar, Button, Input } from "@rneui/themed";
import { useRouter } from "expo-router";

export default function tires() {
  const router = useRouter();

  const [tires, setTires] = useState([
    { value: 1, selected: false },
    { value: 2, selected: false },
    { value: 3, selected: false },
    { value: 4, selected: false },
    { value: 5, selected: false },
    { value: 6, selected: false },
    { value: 7, selected: false },
    { value: 8, selected: false },
    { value: 9, selected: false },
    { value: 10, selected: false },
    { value: 11, selected: false },
    { value: 12, selected: false },
    { value: 13, selected: false },
    { value: 14, selected: false },
    { value: 15, selected: false },
    { value: 16, selected: false },
    { value: 17, selected: false },
    { value: 18, selected: false },
    { value: 19, selected: false },
    { value: 20, selected: false },
    { value: 21, selected: false },
    { value: 22, selected: false },
  ]);

  const onPressAceptar = (item: any) => {
    console.log("casa");
    router.back();
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* <ImageExpo
          source={require("../../assets/pictures/tireVer3.png")}
          style={styles.tire}
          cachePolicy={"memory-disk"}
          // tintColor={"red"}
        /> */}
        <ImageExpo
          source={require("../../assets/pictures/camionVer2.png")}
          style={styles.camion}
          cachePolicy={"memory-disk"}
        />
        {/* <TouchableOpacity onPress={onPressAceptar}>
          <ImageExpo
            source={require("../../assets/pictures/AddImage.png")}
            style={styles.add}
            cachePolicy={"memory-disk"}
          />
        </TouchableOpacity> */}
        <View
          style={{
            zIndex: 1000,
            position: "absolute",
            marginLeft: "32.5%",
            marginTop: "-20%",
          }}
        >
          <Button
            title="Aceptar"
            buttonStyle={styles.addInformation}
            // style={{ marginTop: "125%" }}
            onPress={() => onPressAceptar("hola")}
            // loading={formik.isSubmitting}
          />
        </View>
        {/* <View>
          <Text>hola</Text>
        </View> */}
      </View>

      <View style={styles.number1}>
        <Text
          style={[
            styles.number,
            tires[0].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[0].selected = !prevState[0].selected;
              return [...prevState];
            });
          }}
        >
          1
        </Text>
      </View>

      <View style={styles.number2}>
        <Text
          style={[
            styles.number,
            tires[1].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[1].selected = !prevState[1].selected;
              return [...prevState];
            });
          }}
        >
          2
        </Text>
      </View>

      <View style={styles.number3}>
        <Text
          style={[
            styles.number,
            tires[2].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[2].selected = !prevState[2].selected;
              return [...prevState];
            });
          }}
        >
          3
        </Text>
      </View>

      <View style={styles.number4}>
        <Text
          style={[
            styles.number,
            tires[3].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[3].selected = !prevState[3].selected;
              return [...prevState];
            });
          }}
        >
          4
        </Text>
      </View>

      <View style={styles.number5}>
        <Text
          style={[
            styles.number,
            tires[4].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[4].selected = !prevState[4].selected;
              return [...prevState];
            });
          }}
        >
          5
        </Text>
      </View>

      <View style={styles.number6}>
        <Text
          style={[
            styles.number,
            tires[5].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[5].selected = !prevState[5].selected;
              return [...prevState];
            });
          }}
        >
          6
        </Text>
      </View>

      <View style={styles.number7}>
        <Text
          style={[
            styles.number,
            tires[6].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[6].selected = !prevState[6].selected;
              return [...prevState];
            });
          }}
        >
          7
        </Text>
      </View>

      <View style={styles.number8}>
        <Text
          style={[
            styles.number,
            tires[7].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[7].selected = !prevState[7].selected;
              return [...prevState];
            });
          }}
        >
          8
        </Text>
      </View>

      <View style={styles.number9}>
        <Text
          style={[
            styles.number,
            tires[8].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[8].selected = !prevState[8].selected;
              return [...prevState];
            });
          }}
        >
          9
        </Text>
      </View>

      <View style={styles.number10}>
        <Text
          style={[
            styles.number,
            tires[9].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[9].selected = !prevState[9].selected;
              return [...prevState];
            });
          }}
        >
          10
        </Text>
      </View>

      <View style={styles.number11}>
        <Text
          style={[
            styles.number,
            tires[10].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[10].selected = !prevState[10].selected;
              return [...prevState];
            });
          }}
        >
          11
        </Text>
      </View>

      <View style={styles.number12}>
        <Text
          style={[
            styles.number,
            tires[11].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[11].selected = !prevState[11].selected;
              return [...prevState];
            });
          }}
        >
          12
        </Text>
      </View>

      <View style={styles.number13}>
        <Text
          style={[
            styles.number,
            tires[12].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[12].selected = !prevState[12].selected;
              return [...prevState];
            });
          }}
        >
          13
        </Text>
      </View>

      <View style={styles.number14}>
        <Text
          style={[
            styles.number,
            tires[13].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[13].selected = !prevState[13].selected;
              return [...prevState];
            });
          }}
        >
          14
        </Text>
      </View>

      <View style={styles.number15}>
        <Text
          style={[
            styles.number,
            tires[14].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[14].selected = !prevState[14].selected;
              return [...prevState];
            });
          }}
        >
          15
        </Text>
      </View>
      <View style={styles.number16}>
        <Text
          style={[
            styles.number,
            tires[15].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[15].selected = !prevState[15].selected;
              return [...prevState];
            });
          }}
        >
          16
        </Text>
      </View>
      <View style={styles.number17}>
        <Text
          style={[
            styles.number,
            tires[16].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[16].selected = !prevState[16].selected;
              return [...prevState];
            });
          }}
        >
          17
        </Text>
      </View>

      <View style={styles.number18}>
        <Text
          style={[
            styles.number,
            tires[17].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[17].selected = !prevState[17].selected;
              return [...prevState];
            });
          }}
        >
          18
        </Text>
      </View>

      <View style={styles.number19}>
        <Text
          style={[
            styles.number,
            tires[18].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[18].selected = !prevState[18].selected;
              return [...prevState];
            });
          }}
        >
          19
        </Text>
      </View>
      <View style={styles.number20}>
        <Text
          style={[
            styles.number,
            tires[19].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[19].selected = !prevState[19].selected;
              return [...prevState];
            });
          }}
        >
          20
        </Text>
      </View>

      <View style={styles.number21}>
        <Text
          style={[
            styles.number,
            tires[20].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[20].selected = !prevState[20].selected;
              return [...prevState];
            });
          }}
        >
          21
        </Text>
      </View>
      <View style={styles.number22}>
        <Text
          style={[
            styles.number,
            tires[21].selected && { backgroundColor: "pink" },
          ]}
          onPress={() => {
            setTires((prevState) => {
              prevState[21].selected = !prevState[21].selected;
              return [...prevState];
            });
          }}
        >
          22
        </Text>
      </View>
    </>
  );
}
