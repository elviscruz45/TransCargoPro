import React, { useEffect, useState, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity, Linking } from "react-native";
import { connect } from "react-redux";
import { decrement, increment } from "../../../slices/counter";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { Image as ImageExpo } from "expo-image";
import { Button } from "@rneui/themed";
// import { Icon } from "@rneui/themed";
import { styles } from "./index.styles";
import { assetLists } from "../../../utils/assetList";
import { postLists } from "../../../utils/postList";
import { Header } from "../../../components/home/header/header";
// import {
//   collection,
//   onSnapshot,
//   query,
//   doc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
//   limit,
//   where,
//   orderBy,
// } from "firebase/firestore";
// import { LoadingSpinner } from "../../../components/shared/LoadingSpinner/LoadingSpinner";
// import { useNavigation } from "@react-navigation/native";
// import { Image as ImageExpo } from "expo-image";
// import { HeaderScreen } from "../../../components/Home";
// import { saveTotalEventServiceAITList } from "../../../actions/home";
// import { areaLists } from "../../../utils/areaList";
// import { resetPostPerPageHome } from "../../../actions/home";
// import { saveApprovalListnew } from "../../../actions/search";
// import { updateAITServicesDATA } from "../../../actions/home";
// import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={postLists}
          scrollEnabled={true}
          ListHeaderComponent={<Header />}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  // margin: 2,
                  borderBottomWidth: 5,
                  borderBottomColor: "#f0f8ff",
                  paddingVertical: 10,
                }}
              >
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity
                      style={[styles.row, styles.center]}
                      // onPress={() => goToServiceInfo(item)}
                    >
                      <ImageExpo
                        source={item.imagen}
                        style={styles.roundImage}
                        cachePolicy={"memory-disk"}
                      />

                      <Text style={styles.NombreServicio}>{item.asset}</Text>
                    </TouchableOpacity>

                    <ImageExpo
                      source={item.perfil}
                      style={styles.roundImage}
                      cachePolicy={"memory-disk"}
                    />
                    <Text style={styles.NombrePerfilCorto}>
                      {item.conductor}
                    </Text>
                  </View>
                </View>
                <View style={[styles.row, styles.center]}>
                  <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                    {"Tipo:  "}
                    {item.reporte}
                  </Text>
                </View>
                <View style={[styles.row, styles.center]}>
                  <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                    {"Empresa:  "}
                    {item.empresa}
                  </Text>
                </View>
                {/* <View style={[styles.row, styles.center]}>
                {companyName !== "Fmi" && (
                  <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                    {"Visibilidad:  "}
                    {item.visibilidad}
                  </Text>
                )}
              </View> */}
                <Text style={{ marginLeft: 5, color: "#5B5B5B" }}>
                  {"Fecha:  "}
                  {item.fecha}
                </Text>
                <Text></Text>
                <View style={styles.equipments}>
                  <TouchableOpacity
                  // onPress={() => commentPost(item)}
                  >
                    <ImageExpo
                      source={item.imagen}
                      style={styles.postPhoto}
                      cachePolicy={"memory-disk"}
                    />
                  </TouchableOpacity>

                  <View>
                    <Text style={styles.textAreaTitle}>
                      {"Evento: "}
                      {item.titulo}
                    </Text>
                    <Text></Text>
                    <Text style={styles.textAreaComment} selectable={true}>
                      {item.descripcion}
                    </Text>
                  </View>
                </View>
                <View
                // style={styles.rowlikes}
                ></View>
              </View>
              // <View
              //   style={{
              //     marginHorizontal: 10,
              //     // backgroundColor: "green",
              //     // alignSelf: "center",
              //   }}
              // >
              //   <ImageExpo
              //     source={item.imagen}
              //     style={{
              //       alignSelf: "center",
              //       // marginLeft: 20,
              //       width: 80,
              //       height: 80,
              //       borderRadius: 80,
              //     }}
              //   />
              // </View>
            );
          }}
        />
      </View>
    </>
  );
}
