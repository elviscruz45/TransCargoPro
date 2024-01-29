import { View, Text, FlatList } from "react-native";
import React from "react";
import { styles } from "./header.styles";
import { Image as ImageExpo } from "expo-image";
import { assetLists } from "../../../utils/assetList";
export function Header() {
  const ShortTextComponent = (item: any) => {
    const longText = item;
    const maxLength = 20; // Maximum length of the short text
    let shortText = longText;
    if (longText.length > maxLength) {
      shortText = `${longText.substring(0, maxLength)}...`;
    }

    return <Text>{shortText}</Text>;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={assetLists}
        horizontal={true}
        style={{ backgroundColor: "white" }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginHorizontal: 10,
                // backgroundColor: "green",
                marginBottom: 20,
                // alignSelf: "center",
              }}
            >
              <ImageExpo
                source={item.image}
                style={{
                  alignSelf: "center",
                  // marginLeft: 20,
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                }}
              />
              {ShortTextComponent(item.value)}
            </View>
          );
        }}
      />
    </View>
  );
}

//     {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
//     {/* <Button
//     // aria-label="Increment value"
//     title="Increment"
//     onPress={() => dispatch(increment())}
//   />
//   //);
