import { StyleSheet } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from "react-native";
import { styles } from "./index.styles";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image as ImageExpo } from "expo-image";
import { SearchBar, Icon } from "@rneui/themed";
import { assetLists } from "../../../utils/assetList";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
export default function SearchAsset() {
  const router = useRouter();
  //global state management for the user_uid
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  //this method is used to go to a screen to see the status of the item
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
  //hola

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {/* {console.log("SearchItem")} */}
      <FlatList
        data={globalAssetList}
        ListHeaderComponent={
          <SearchBar
            placeholder="Buscar AIT o nombre del servicio"
            // value={searchText}
            // onChangeText={(text) => setSearchText(text)}
            lightTheme={true}
            inputContainerStyle={{ backgroundColor: "white" }}
          />
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => selectAsset(item)}
              style={{ backgroundColor: "white" }} // Add backgroundColor here
            >
              <View style={styles.equipments}>
                {
                  <ImageExpo
                    source={
                      item?.photoServiceURL
                        ? { uri: item?.photoServiceURL }
                        : require("../../../assets/assetpics/carIcon.jpg")
                    }
                    style={styles.image}
                    cachePolicy={"memory-disk"}
                  />
                }

                <View>
                  <Text style={styles.name2}>
                    {item.NombreArea
                      ? item.NombreArea
                      : item.activo
                      ? item.activo
                      : item.nombre}
                  </Text>
                  {item.placa && (
                    <Text style={styles.info}>
                      {"Placa: "}
                      {item.placa}
                    </Text>
                  )}
                  {item.nombre && (
                    <Text style={styles.info}>
                      {"Nombre: "}
                      {item.placa}
                    </Text>
                  )}
                  {item.activo && (
                    <Text style={styles.info}>
                      {"Activo: "}
                      {item.activo}
                    </Text>
                  )}

                  {/* <Text style={styles.info}>
                    {"Tipo: "}
                    {item.TipoServicio}
                  </Text>
                    <Text style={styles.info}>
                      {"Empresa: "}
                      {item.companyName}
                    </Text>
              
                  <Text style={styles.info}>
                    {"Fecha Inicio: "}
                    {item.fechaPostFormato}
                  </Text> */}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: any) => item.idFirebaseAsset}
      />
    </View>
  );
}
