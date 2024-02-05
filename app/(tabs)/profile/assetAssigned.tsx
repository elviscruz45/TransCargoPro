import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { Button } from "@rneui/themed";

import { styles } from "./assetAssigned.styles";
import { useNavigation, useLocalSearchParams } from "expo-router";
// import { screen } from "../../../utils";
import { connect } from "react-redux";
// import { saveActualEquipment } from "../../../actions/post";
// import { EquipmentListUpper } from "../../../actions/home";
// import { areaLists } from "../../../utils/areaList";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Item } from "../../../utils/moreInformation";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { SearchBar, Icon } from "@rneui/themed";

const windowWidth = Dimensions.get("window").width;
export default function AssetAssigned() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //global state management for the user_uid
  const globalAssetList: any = useSelector(
    (state: RootState) => state.home.assetList
  );
  useEffect(() => {
    if (searchText === "") {
      setSearchResults(globalAssetList?.slice(0, 100));
    } else {
      const result = globalAssetList?.filter((item: any) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.nombre) || re.test(item.placa);
      });
      setSearchResults(result.slice(0, 50));
    }
  }, [searchText]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {/* {console.log("SearchItem")} */}
      <FlatList
        data={searchResults}
        ListHeaderComponent={
          <SearchBar
            placeholder="Buscar AIT o nombre del servicio"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            lightTheme={true}
            inputContainerStyle={{ backgroundColor: "white" }}
          />
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                // onPress={() => selectAsset(item)}
                style={{ backgroundColor: "white", flex: 1 }} // Add backgroundColor here
              >
                <View style={[styles.equipments, { backgroundColor: "red" }]}>
                  <ImageExpo
                    source={
                      item?.photoServiceURL
                        ? { uri: item?.photoServiceURL }
                        : require("../../../assets/assetpics/carIcon.jpg")
                    }
                    style={styles.image}
                    cachePolicy={"memory-disk"}
                  />
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
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => selectAsset(item)}
                style={{
                  // backgroundColor: "green",
                  flex: 1,
                  alignSelf: "center",
                }} // Add backgroundColor here
              >
                {false ? (
                  <View
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      backgroundColor: "red",
                    }}
                  >
                    <Button
                      title="Editar"
                      buttonStyle={styles.btnActualizarStyles}
                      titleStyle={styles.btnTextStyle}
                      // onPress={() => update_Data()}
                    />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.equipments,
                      { backgroundColor: "green", alignSelf: "center" },
                    ]}
                  >
                    <ImageExpo
                      source={
                        item?.photoServiceURL
                          ? { uri: item?.photoServiceURL }
                          : require("../../../assets/assetpics/carIcon.jpg")
                      }
                      style={styles.image}
                      cachePolicy={"memory-disk"}
                    />
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
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item: any) => item.idFirebaseAsset}
      />
    </View>
  );

  // return (
  //   <ScrollView style={{ backgroundColor: "white" }}>
  //     {true && (
  //       <TouchableOpacity onPress={() => goToEditAITScreen(Item)}>
  //         <View style={{ marginRight: "2%" }}>
  //           <ImageExpo
  //             source={require("../../../assets/pictures/deleteIcon.png")}
  //             style={styles.editIcon}
  //           />
  //         </View>
  //       </TouchableOpacity>
  //     )}

  //     {true ? (
  //       <ImageExpo
  //         source={require("../../../assets/assetpics/freight02.jpeg")}
  //         style={styles.roundImage}
  //         cachePolicy={"memory-disk"}
  //       />
  //     ) : (
  //       <ImageExpo
  //         source={require("../../../assets/assetpics/freight02.jpeg")}
  //         style={styles.roundImage}
  //         cachePolicy={"memory-disk"}
  //       />
  //     )}
  //     <Text></Text>
  //     <Text style={styles.name}>{Item.Asset}</Text>
  //     <Text></Text>
  //     <View>
  //       <Text></Text>

  //       {/* <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Numero de AIT:  "}</Text>
  //         <Text style={styles.info2}>{Item.NumeroAIT}</Text>
  //       </View> */}

  //       {/* <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Numero de Cotizacion:  "}</Text>
  //         <Text style={styles.info2}>{Item.NumeroCotizacion}</Text>
  //       </View> */}

  //       {/* <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Tipo de Servicio:  "}</Text>
  //         <Text style={styles.info2}>{Item.TipoServicio}</Text>
  //       </View> */}

  //       {/* <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Area del Servicio:  "}</Text>
  //         <Text style={styles.info2}>{Item.AreaServicio}</Text>
  //       </View> */}
  //       <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Nombre de la Empresa:  "}</Text>
  //         <Text style={styles.info2}>{currentAsset.companyName}</Text>
  //       </View>
  //       <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Creado por:  "}</Text>
  //         <Text style={styles.info2}>{currentAsset.emailPerfil}</Text>
  //       </View>
  //       <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Monto de Facturacion:  "}</Text>
  //         <Text style={styles.info2}>
  //           {"S/. "}
  //           {/* {currentAsset.facturacionFleteYTD} */}
  //           {formattedfacturacionFleteYTD}
  //         </Text>
  //       </View>

  //       {/* <View style={[styles.row, styles.center]}>
  //         <Text style={styles.info}>{"Avance Ejecucion Proyectado:  "}</Text>
  //         <Text style={styles.info2}>
  //           {AvanceProyected.toFixed(2)}
  //           {" %"}
  //         </Text>
  //       </View> */}

  //       {/* {BarProgress(AvanceProyected)} */}
  //       <Text></Text>

  //       {/* {ResposableList(UsuarioAdministrador)}
  //       <Text style={styles.info}>{"Planeamiento Cerro Verde:  "}</Text>
  //       {ResposableList(UsuarioPlaneamiento)}
  //       <Text style={styles.info}>{"Mantenimiento Cerro Verde:  "}</Text>
  //       {ResposableList(UsuarioMantenimiento)}

  //       <Text style={styles.info}>{"Gerente Contratista:  "}</Text>
  //       {ResposableList(ContratistaGerente)}
  //       <Text style={styles.info}>{"Planificador Contratista:  "}</Text>
  //       {ResposableList(ContratistaPlanificador)}
  //       <Text style={styles.info}>{"Supervisores Contratista:  "}</Text> */}
  //       {/* {ResposableList(ContratistaSupervisor)} */}
  //     </View>
  //   </ScrollView>
  // );
}
