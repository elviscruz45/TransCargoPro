import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image as ImageExpo } from "expo-image";
import { SearchBar, Icon } from "@rneui/themed";
import { assetLists } from "../../../utils/assetList";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { Button } from "react-native";
import { styles } from "./item.styles";
import { postLists } from "../../../utils/postList";
// import { History } from "../../../components/search/H";
import { History } from "../../../components/search/History/History";
import { useRouter } from "expo-router";
import { Date } from "../../../components/search/History/Date";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

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
                    : require("../../../assets/assetpics/freight02.jpeg")
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
            <Text style={styles.name}>Freighliner 01</Text>
            <Text style={styles.info}>{"Tag:"} FreightLiner02</Text>
            <Text style={styles.info}>{"Tipo:"} sdfd</Text>
            <Text style={styles.info}>{"Kilometraje:"} 123,423 Km</Text>
            <Text style={styles.info}>
              {"Kilometraje cambio aceite:"} 123,423 Km
            </Text>
            <Text style={styles.info}>{"Gasto Combustible:"} 123,423 Km</Text>
            <Text style={styles.info}>
              {"Rendimiento Combustible:"} 123,423 Km
            </Text>

            <Text style={styles.info}>
              {"Facturacion a la fecha:"} 123,423 Km
            </Text>
            <Text style={styles.info}>
              {"Servicios a la fecha:"} 123,423 Km
            </Text>
            <Text style={styles.info}>{"Gastos a la fecha:"} 123,423 Km</Text>
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
          {/* <TouchableOpacity
            style={styles.btnContainer4}
            // onPress={() => goToPublicar()}
          >
            <Image
              source={require("../../../assets/pictures/TakePhoto2.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer4}
            // onPress={() => goToDocsToApprove(serviceInfo)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity> */}
        </View>
        <Text></Text>
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
        <Date />
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
