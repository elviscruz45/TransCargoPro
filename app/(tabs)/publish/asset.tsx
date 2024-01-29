import { View, Text, ScrollView } from "react-native";
import { Icon, Avatar, Input, Button } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { styles } from "./asset.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./asset.data";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { saveActualPostFirebase } from "../../../actions/post";
// import { db } from "../../../utils";
import { db } from "../../../utils/firebase";
import {
  addDoc,
  collection,
  query,
  doc,
  updateDoc,
  where,
  orderBy,
  getDocs,
  setDoc,
} from "firebase/firestore";
// import { AITForms } from "../../../components/Forms/GeneralForms/AITForms/AITForms";
// import { areaLists } from "../../../utils/areaList";
// import { saveTotalUsers } from "../../../actions/post";
import Toast from "react-native-toast-message";
import { Image as ImageExpo } from "expo-image";
import { AssetForm } from "../../../components/publish/forms/AssetForm/Asset";
import { useRouter, Redirect } from "expo-router";

export default function Asset(props: any) {
  const emptyimage = require("../../../assets/assetpics/freight02.jpeg");
  // const navigation = useNavigation();
  const [activo, setActivo] = useState();
  const [nombre, setNombre] = useState();
  const router = useRouter();

  //fetching data from firebase to retrieve all users

  // useEffect(() => {
  //   // Function to fetch data from Firestore
  //   if (props.email) {
  //     const companyName = props.email?.match(/@(.+?)\./i)?.[1] || "Anonimo";
  //     async function fetchData() {
  //       try {
  //         const queryRef1 = query(
  //           collection(db, "users"),
  //           where("companyName", "==", "fmi"),
  //           orderBy("email", "desc")
  //         );

  //         const queryRef2 = query(
  //           collection(db, "users"),
  //           where("companyName", "==", companyName),
  //           orderBy("email", "desc")
  //         );

  //         const getDocs1 = await getDocs(queryRef1);
  //         const getDocs2 =
  //           companyName !== "fmi" ? await getDocs(queryRef2) : null;

  //         const lista = [];

  //         // Process results from the first query
  //         if (getDocs1) {
  //           getDocs1.forEach((doc) => {
  //             lista.push(doc.data());
  //           });
  //         }

  //         // Process results from the second query
  //         if (getDocs2) {
  //           getDocs2.forEach((doc) => {
  //             lista.push(doc.data());
  //           });
  //         }

  //         // //avoid duplicates of email of lista
  //         // const unique = lista.filter(
  //         //   (v, i, a) => a.findIndex((t) => t.email === v.email) === i
  //         // );

  //         // Save the merged results to the state or do any other necessary operations
  //         props.saveTotalUsers(lista);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         // Handle the error as needed
  //       }
  //     }
  //     // Call the fetchData function when the component mounts
  //     fetchData();
  //   }
  // }, [props.email]);

  // // find Index of areaList array where there is the image of the area to render the icon Avatar
  // const IndexObjectImageArea = areaLists.findIndex((obj) => obj.value === area);
  // const imageSource = areaLists[IndexObjectImageArea]?.image || emptyimage;
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //retrieving data from Formik
        const newData = formValue;

        //Data about date time format
        const date = new Date();
        const monthNames = [
          "ene.",
          "feb.",
          "mar.",
          "abr.",
          "may.",
          "jun.",
          "jul.",
          "ago.",
          "sep.",
          "oct.",
          "nov.",
          "dic.",
        ];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;
        newData.fechaPostFormato = formattedDate;

        //Photo of the service
        newData.photoServiceURL = "";
        //Data about information profile and company
        newData.emailPerfil = props.email || "Anonimo";
        newData.nombrePerfil = props.firebase_user_name || "Anonimo";

        //Data about the company belong this event
        const regex = /@(.+?)\./i;
        newData.companyName =
          capitalizeFirstLetter(props.email?.match(regex)?.[1] ?? "Anonimo") ||
          "Anonimo";
        console.log("assetSubmitiion", formValue);

        // //Uploading data to Firebase and adding the ID firestore
        // const docRef = await addDoc(collection(db, "Asset"), newData);
        // newData.idFirebaseAsset = docRef.id;
        // const RefFirebase = doc(db, "Asset", newData.idFirebaseAsset);
        // await updateDoc(RefFirebase, newData);

        //Uploading data to Firebase and adding the ID firestore
        const docRef = doc(collection(db, "Asset"));
        newData.idFirebaseAsset = docRef.id;
        await setDoc(docRef, newData);
        // // this hedlps to go to the begining of the process
        // navigation.navigate(screen.post.post);
        // // navigation.navigate(screen.home.tab, {
        // //   screen: screen.home.home,
        // // });

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Se ha subido correctamente",
        });

        router.replace("/(tabs)/publish/");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al tratar de subir estos datos",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }} // Add backgroundColor here
    >
      <View style={{ alignSelf: "center" }}>
        <ImageExpo
          source={require("../../../assets/assetpics/freight02.jpeg")}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
        <Text style={styles.name}>
          {nombre || activo || "Nombre del activo"}
        </Text>
      </View>

      <View style={styles.sectionForms}></View>
      <AssetForm formik={formik} setActivo={setActivo} setNombre={setNombre} />

      <Button
        title="Agregar"
        buttonStyle={styles.addInformation}
        onPress={() => formik.handleSubmit()}
        // onPress={(event: GestureResponderEvent) => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </KeyboardAwareScrollView>
  );
}
