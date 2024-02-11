import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./files.styles";
import { documents } from "../../../utils/files";
import { Item } from "../../../utils/files";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
// import { screen } from "../../../utils";
import { formatDate } from "../../../utils/formats";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useNavigation, useLocalSearchParams } from "expo-router";

export default function FileScreen() {
  const { item }: any = useLocalSearchParams();

  const router = useRouter();
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === item
  );

  const files = currentAsset?.files;

  const uploadFile = useCallback(async (uri: any) => {
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No se puede abrir el documento PDF",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se puede abrir el documento PDF",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }, []);

  const goToAddDocsForm = () => {
    router.push({
      pathname: "/search/addFiles",
      params: { item: item },
    });
  };
  const goToEditDocs = (
    tipoFile: any,
    FilenameTitle: any,
    fechaPostFormato: any
  ) => {
    router.push({
      pathname: "/search/editFiles",
      params: {
        tipoFile: tipoFile,
        uidDoc: item,
        FilenameTitle: FilenameTitle,
        fechaPostFormato: fechaPostFormato,
      },
    });
  };
  return (
    <ScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <Text></Text>

      <Text style={styles.name}>{Item.asset}</Text>
      <Text></Text>
      <TouchableOpacity onPress={() => goToAddDocsForm()}>
        <ImageExpo
          source={require("../../../assets/pictures/addFilesIcon.png")}
          style={styles.image3}
          cachePolicy={"memory-disk"}
        />
      </TouchableOpacity>

      <FlatList
        data={files}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => uploadFile(item.pdfFileURLFirebase)}
                style={{ flex: 3, backgroundColor: "white", borderWidth: 0.3 }}
              >
                <View style={{ marginBottom: 20, width: "50%" }}>
                  <View style={styles.equipments2}>
                    <ImageExpo
                      source={require("../../../assets/pictures/pdf4.png")}
                      style={styles.image2}
                      cachePolicy={"memory-disk"}
                    />
                    <View>
                      <View style={[{ flexDirection: "row" }]}>
                        <Text style={{ fontWeight: "bold" }}>{"Titulo: "}</Text>
                        <Text style={[styles.info2]}>
                          {item.FilenameTitle}{" "}
                        </Text>
                      </View>
                      <View style={[{ flexDirection: "row" }]}>
                        <Text style={{ fontWeight: "bold" }}>{"Tipo: "}</Text>
                        <Text style={styles.info2}>{item.tipoFile}</Text>
                      </View>
                      <View style={[{ flexDirection: "row" }]}>
                        <Text style={{ fontWeight: "bold" }}>{"Autor: "}</Text>
                        <Text style={styles.info2}>{item.autor}</Text>
                      </View>

                      <View style={[{ flexDirection: "row" }]}>
                        <Text style={{ fontWeight: "bold" }}>{"Fecha:"}</Text>
                        <Text style={{}}>
                          {item.fechaPostFormato || "No definido"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onLongPress={() =>
                  goToEditDocs(
                    item.tipoFile,
                    item.FilenameTitle,
                    item.fechaPostFormato
                  )
                }
                style={{
                  // backgroundColor: "green",
                  // paddingVertical: "10%",

                  flex: 1,
                  // alignSelf: "center",
                  borderWidth: 0.3,
                }} // Add backgroundColor here
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: "10%",
                    marginLeft: "2%",
                  }}
                >
                  Vencimiento:
                </Text>
                <Text style={{ alignSelf: "center" }}>
                  {/* {item.fechaVencimiento} */}

                  {formatDate(item.fechaVencimiento) || "No definido"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) =>
          `${item.FilenameTitle}-${item.fechaPostFormato}`
        } // Provide a unique key for each item
      />
    </ScrollView>
  );
}
