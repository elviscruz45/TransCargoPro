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
import { updateEmployees } from "../../../slices/profile";
import {
  addDoc,
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
  getDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  limit,
} from "firebase/firestore";

import { db } from "../../../utils/firebase";
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
  const employees = useSelector((state: RootState) => state.profile.employees);
  console.log("employees", employees);
  const companyRUC = useSelector((state: RootState) => state.userId.companyRUC);
  const dispatch = useDispatch();

  console.log("employees", employees);
  //modal management
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);

  useEffect(() => {
    if (searchText === "") {
      setSearchResults(employees?.slice(0, 100));
    } else {
      const result = employees?.filter((item: any) => {
        const re = new RegExp(searchText, "ig");
        return re.test(item.displayNameform) || re.test(item.email);
      });
      setSearchResults(result.slice(0, 50));
    }
  }, [searchText, employees]);

  const userCompanyConfirmation = (
    uid: any,
    companyManagerConfimation: any
  ) => {
    Alert.alert(
      "Confirmar",
      "Estas Seguro de confirmar a este usuario en la empresa?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: async () => {
            const Ref = doc(db, "users", uid);
            companyManagerConfimation
              ? await updateDoc(Ref, { companyManagerConfimation: false })
              : await updateDoc(Ref, { companyManagerConfimation: true });
          },
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    let unsubscribe: any;
    let lista: any = [];

    async function fetchData() {
      let queryRef;
      queryRef = query(
        collection(db, "users"),
        where("companyRUC", "==", companyRUC)
      );
      unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
        lista = [];
        ItemFirebase.forEach((doc) => {
          lista.push(doc.data());
        });
        console.log("oaaaa", lista);
        dispatch(updateEmployees(lista));
      });
    }

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <>
      <View style={{ backgroundColor: "white" }}>
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
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <View
                  style={[styles.equipments, { alignSelf: "center", flex: 1 }]}
                >
                  <ImageExpo
                    source={
                      item?.photoURL
                        ? { uri: item?.photoURL }
                        : require("../../../assets/assetpics/userIcon.png")
                    }
                    style={styles.image}
                    cachePolicy={"memory-disk"}
                  />
                  <View>
                    {item.displayNameform && (
                      <Text style={styles.info}>{item.displayNameform}</Text>
                    )}
                    {item.email && (
                      <Text style={styles.info}>{item.email}</Text>
                    )}
                  </View>
                </View>

                <View
                  style={[styles.equipments, { alignSelf: "center", flex: 1 }]}
                >
                  <Button
                    title={item.companyManagerConfimation ? "si" : "no"}
                    buttonStyle={[
                      styles.btnActualizarStyles,
                      item.companyManagerConfimation
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" },
                    ]}
                    titleStyle={styles.btnTextStyle}
                    onPress={() =>
                      userCompanyConfirmation(
                        item.uid,
                        item.companyManagerConfimation
                      )
                    }
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item: any) => item.uid}
        />
      </View>
    </>
  );
}