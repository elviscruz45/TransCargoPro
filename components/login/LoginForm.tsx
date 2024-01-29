import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { useFormik } from "formik";
import {
  getAuth,
  signInWithEmailAndPassword,
  initializeAuth,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./LoginForm.data";
import { styles } from "./LoginForm.styles";
// import { connect } from "react-redux";
// import { update_firebaseUserUid } from "../../../actions/auth";
// import { update_firebaseProfile } from "../../../actions/profile";
// import { db } from "../../../utils";
import { db, app } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, getApp } from "firebase/app";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { increment as inc, decrement } from "../../slices/counter";
import { signIn } from "../../slices/auth";

export function LoginForm(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const onShowHidePassword = () => setShowPassword((prevState) => !prevState);
  const router = useRouter();
  // const [user_uid, setUser_uid] = useState("");

  //global statemanagment
  const num = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        const user_uid = userCredential.user.uid;
        const docRef = doc(db, "users", user_uid);
        const docSnap = await getDoc(docRef);

        dispatch(signIn(user_uid));

        if (docSnap.exists()) {
          router.push("/(tabs)/home");

          // props.update_firebaseProfile(docSnap.data());
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Bienvenido",
          });
        } else {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Actualice sus datos en el perfil para comenzar",
          });
          router.push("/(tabs)/profile");

          // navigation.navigate(screen.profile.tab, {
          //   screen: screen.profile.account,
          // });
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          // position: "top",
          position: "bottom",
          text1: "Usuario o contraseña incorrectos",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        value={formik.values.email}
        placeholder="Correo electronico"
        autoCapitalize="none"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />

      <Input
        value={formik.values.password}
        placeholder="Contraseña"
        autoCapitalize="none"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={onShowHidePassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar sesión"
        testID="submitButton" // Add testID here
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => formik.handleSubmit()}
        // onPress={() => dispatch(update_firebaseUserUid("ddddd"))}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
