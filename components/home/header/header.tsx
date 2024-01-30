import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./header.styles";
import { Image as ImageExpo } from "expo-image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import { useRouter } from "expo-router";

export function Header() {
  const assetLists: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  const router = useRouter();

  const ShortTextComponent = (item: any) => {
    const longText = item;
    const maxLength = 20; // Maximum length of the short text
    let shortText = longText;
    if (longText?.length > maxLength) {
      shortText = `${longText.substring(0, maxLength)}...`;
    }

    return <Text>{shortText}</Text>;
  };

  const selectAsset = (item: any) => {
    //create a to go to the screen called item
    console.log(item);
    router.push({
      pathname: "/search/item",
      params: { item: item.idFirebaseAsset },
    });

    // navigation.navigate(screen.search.tab, {
    //   screen: screen.search.item,
    //   params: { Item: idServiciosAIT },
    // });
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
            <TouchableOpacity
              onPress={() => selectAsset(item)}
              style={{ backgroundColor: "white" }} // Add backgroundColor here
            >
              <View
                style={{
                  marginHorizontal: 10,
                  // backgroundColor: "green",
                  marginBottom: 20,
                  // alignSelf: "center",
                }}
              >
                <ImageExpo
                  source={
                    item?.photoServiceURL
                      ? { uri: item?.photoServiceURL }
                      : require("../../../assets/assetpics/carIcon.jpeg")
                  }
                  style={{
                    alignSelf: "center",
                    // marginLeft: 20,
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                  }}
                />
                {ShortTextComponent(item.NombreArea ?? item.activo)}
              </View>
            </TouchableOpacity>
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
