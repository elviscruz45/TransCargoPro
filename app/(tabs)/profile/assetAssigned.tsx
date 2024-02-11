import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import { Modal } from "../../../components/shared/Modal";
import { ChangeUserAssign } from "../../../components/profile/ChangeUserAssigned/ChangeUser";

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

  //modal management
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

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
  }, [searchText, globalAssetList]);

  const editAssetAssigned = (idFirebaseAsset: string) => {
    Alert.alert(
      "Editar",
      "Estas Seguro que deseas cambiar de Imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            setRenderComponent(
              <ChangeUserAssign
                onClose={onCloseOpenModal}
                idFirebaseAsset={idFirebaseAsset}
                // areaList={areaList}
              />
            );
            setShowModal(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
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
                  style={{ flex: 1 }} // Add backgroundColor here
                >
                  <View style={[styles.equipments]}>
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
                      <Text style={[styles.info, { alignSelf: "center" }]}>
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
                  onLongPress={() => editAssetAssigned(item.idFirebaseAsset)}
                  style={{
                    // backgroundColor: "green",
                    flex: 1,
                    alignSelf: "center",
                  }} // Add backgroundColor here
                >
                  <View style={[styles.equipments, { alignSelf: "center" }]}>
                    <ImageExpo
                      source={
                        item?.userAssigned[0]?.photoURL
                          ? { uri: item?.userAssigned[0]?.photoURL }
                          : require("../../../assets/assetpics/userIcon.png")
                      }
                      style={styles.image}
                      cachePolicy={"memory-disk"}
                    />
                    <View>
                      {item?.userAssigned &&
                        item?.userAssigned.map((item: any, index: any) => (
                          <Text key={index} style={styles.info}>
                            {item?.email}
                          </Text>
                        ))}

                      {item.placa && (
                        <Text style={styles.info}>{item.email}</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item: any) => item.idFirebaseAsset}
        />
      </View>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
}
