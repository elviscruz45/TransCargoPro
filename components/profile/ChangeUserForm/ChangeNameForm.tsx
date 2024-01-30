import React from "react";
import { View, ScrollView } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangeNameForm.data";
import { styles } from "./ChangeNameForm.styles";
import { connect } from "react-redux";
import { db } from "../../../utils/firebase";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, doc, setDoc } from "firebase/firestore";
// import { update_firebaseProfile } from "../../../actions/profile";
// import { update_firebaseUserName } from "../../../actions/profile";
import { userTypeList } from "../../../utils/userList";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import {
  update_photoURL,
  updateEmail,
  updateCargo,
  updatecompanyName,
  updateDescripcion,
  updateDisplayName,
  updateUserType,
} from "../../../slices/auth";

export function NameForm(props: any) {
  const { onClose } = props;
  //global state management for the user_uid
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const newData = formValue;
      // console.log("newData", newData);
      try {
        //Update of Authentication Firebase
        const currentLoginUser = getAuth().currentUser;
        // console.log("currentLoginUser", currentLoginUser?.email);

        if (currentLoginUser) {
          await updateProfile(currentLoginUser, {
            displayName: newData.displayNameform,
          });
        }

        //sign up the users in Firestore Database
        newData.photoURL = currentLoginUser?.photoURL ?? "";
        newData.email = currentLoginUser?.email ?? "";
        newData.companyName =
          capitalizeFirstLetter(newData.email?.match(/@(.+?)\./i)?.[1] ?? "") ??
          "";
        newData.userType = userTypeList[4].value;
        newData.uid = currentLoginUser?.uid ?? "";

        ///setting data to firebase
        const docRef = doc(collection(db, "users"), newData.uid);
        await setDoc(docRef, newData);
        //updating the global state
        dispatch(update_photoURL(newData.photoURL));
        dispatch(updateEmail(newData.email));
        dispatch(updateCargo(newData.cargo));
        dispatch(updatecompanyName(newData.companyName));
        dispatch(updateDescripcion(newData.descripcion));
        dispatch(updateDisplayName(newData.displayNameform));
        dispatch(updateUserType(newData.userType));

        // props.update_firebaseProfile(newData);
        // props.update_firebaseUserName(newData.displayNameform);
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Nombre y apellidos actualizados",
        });
        console.log("finnn", currentLoginUser);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el nombre y apellidos",
        });
      }
      onClose();
    },
  });
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
      <Input
        testID="displayNameform"
        label="Nombre y apellidos"
        value={formik.values.displayNameform}
        // placeholder="Nombre y apellidos"
        multiline={true}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayNameform", text)}
        errorMessage={formik.errors.displayNameform}
      />
      <Input
        testID="cargo"
        value={formik.values.cargo}
        label="Cargo"
        // placeholder="Escribe tu cargo"
        multiline={true}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("cargo", text)}
        errorMessage={formik.errors.cargo}
      />
      <Input
        testID="descripcion"
        label="Descripcion"
        value={formik.values.descripcion}
        // placeholder="Descripcion"
        multiline={true}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("descripcion", text)}
        errorMessage={formik.errors.descripcion}
      />
      <Button
        testID="submitButton"
        title="Actualizar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
      />
    </>
  );
}
