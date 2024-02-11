import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image as ImageExpo } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./item.styles";
import { History } from "../../../components/search/History/History";
import { useRouter } from "expo-router";
import { Date } from "../../../components/search/History/Date";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { DateScreen } from "../../../components/search/DateScreen/DateScreen";
// const formatDate = (item: any) => {
//   if (item) return;
//   const date = new Date(item.seconds * 1000);

//   const monthNames = [
//     "ene.",
//     "feb.",
//     "mar.",
//     "abr.",
//     "may.",
//     "jun.",
//     "jul.",
//     "ago.",
//     "sep.",
//     "oct.",
//     "nov.",
//     "dic.",
//   ];
//   const day = date.getDate();
//   const month = monthNames[date.getMonth()];
//   const year = date.getFullYear();
//   const formattedDate = `${day} ${month} ${year}`;
//   return formattedDate;
// };
export default function Item(props: any) {
  const { item }: any = useLocalSearchParams();
  const router = useRouter();
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === item
  );
  // console.log("item");
  const dispatch = useDispatch();
  //states of filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [removeFilter, setRemoveFilter] = useState(true);
  const handleResetAction = () => {
    // navigation.goBack();
  };
  //this function goes to another screen to get more detail about the service state
  const MoreDetail = () => {
    router.push({
      pathname: "/search/moreDetail",
      params: { item: item },
    });
  };

  //   navigation.navigate(screen.search.tab, {
  //     screen: screen.search.moreDetail,
  //     params: { Item: data },
  //   });
  // };
  // //Retrieve data Item that comes from the previous screen to render the Updated Status
  // const {
  //   params: { item },
  // } = props;
  //Using navigation.navigate I send it to another screen (post)
  const goToDocs = () => {
    router.push({
      pathname: "/search/files",
      params: { item: item },
    });
  };
  //   navigation.navigate(screen.search.tab, {
  //     screen: screen.search.pdf,
  //     params: { Item: item },
  //   });
  // };
  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (!result.canceled) uploadImage(result.assets[0].uri);
  };
  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `avatarAsset/${item}`);
    uploadBytesResumable(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };
  const updatePhotoUrl = async (imagePath: any) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    ///setting data to firebase
    const docRef = doc(collection(db, "Asset"), item ?? "");
    // Update a property of the document
    await updateDoc(docRef, {
      photoServiceURL: imageUrl,
    });
    // dispatch(update_photoURL(imageUrl));
    Toast.show({
      type: "success",
      text1: "Imagen Actualizada",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  const editPhoto = () => {
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
            changeAvatar();
          },
        },
      ],
      { cancelable: false }
    );
  };
  //Changing the value to activate again the filter to rende the posts
  const filter = (start: any, end: any) => {
    setStartDate(start);
    setEndDate(end);
  };
  const quitfilter = () => {
    setRemoveFilter((prev) => !prev);
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text></Text>

        <View style={[styles.row, styles.center]}>
          <View>
            <TouchableOpacity onLongPress={() => editPhoto()}>
              <ImageExpo
                source={
                  currentAsset.photoServiceURL
                    ? { uri: currentAsset.photoServiceURL }
                    : require("../../../assets/assetpics/carIcon.jpg")
                }
                style={{
                  // alignContent: "center",
                  marginLeft: "5%",
                  marginTop: "5%",
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  // alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>
          <Text> </Text>
          <View style={{ marginLeft: 0 }}>
            <Text style={styles.name}>{currentAsset.nombre}</Text>
            <Text style={styles.info}>
              {"Placa:"} {currentAsset.placa}
            </Text>
            {/* <Text style={styles.info}>{"Tipo:"} sdfd</Text> */}
            <Text style={styles.info}>
              {"Kilometraje:"}
              {currentAsset.kilometraje} {"Km"}
            </Text>
            <Text style={styles.info}>
              {"Cambio aceite Prox:"}
              {currentAsset?.cambioAceiteProx}
              {" Km"}
            </Text>
            <Text style={styles.info}>
              {"Gasto Combustible:"} {currentAsset.gastoCombustible} {"Gls"}
            </Text>
            <Text style={styles.info}>
              {"Rendimiento Combustible:"} {currentAsset.redimientoCombustible}
              {"Gls/Km"}
            </Text>

            <Text style={styles.info}>
              {"Facturacion a la fecha:"} {"S/."}
              {currentAsset.facturacionFleteYTD}
            </Text>
            <Text style={styles.info}>
              {"Servicios a la fecha:"} {currentAsset.cantidadServiciosYTD}
            </Text>
            <Text style={styles.info}>
              {"Gastos a la fecha:"} {"S/."} {currentAsset.gastosTotalYTD}
            </Text>
          </View>
        </View>
        <Text></Text>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            // alignItems: "center",
            // backgroundColor: "white",
            // justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => MoreDetail()}
          >
            <Image
              source={require("../../../assets/pictures/more_information.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => goToDocs()}
          >
            <Image
              source={require("../../../assets/pictures/addFilesIcon.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
        </View>
        <Text></Text>

        <Text
          style={{
            marginLeft: 15,
            borderRadius: 5,
            fontWeight: "700",
            alignSelf: "center",
          }}
        >
          Historial de Eventos
        </Text>
        <Text></Text>

        <DateScreen filterButton={filter} quitFilterButton={quitfilter} />

        {/* <Date /> */}
        <Text></Text>

        {/* <GanttHistorial datas={post} comentPost={comentPost} /> */}
        <History />
      </ScrollView>
    </>
    // <View style={{ backgroundColor: "white", flex: 1 }}>
    //   {/* {console.log("SearchItem")} */}
    //   <TouchableOpacity>
    //     <Text>SearchAsse1t</Text>
    //   </TouchableOpacity>
    //   <Button title="Reset" onPress={handleResetAction} />
    // </View>
  );
}
