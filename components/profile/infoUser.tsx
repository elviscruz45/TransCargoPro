import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Avatar, Text, Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { styles } from "./infoUser.styles";
// import { Modal } from "../Modal";
// import { connect } from "react-redux";
// import { update_firebasePhoto } from "../../../actions/profile";
// import { update_firebaseEmail } from "../../../actions/profile";
// import { update_firebaseProfile } from "../../../actions/profile";
// import { update_firebaseUid } from "../../../actions/profile";
// import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
// import { ChangeManPower } from "../../Profile/ManPowerForm/ChangeManPower";
// import { userTypeList } from "../../../utils/userTypeList";
import { update_photoURL } from "../../slices/auth";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
export function InfoUser(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const session = useSelector((state: RootState) => state.userId.session);
  const photoUrl = useSelector((state: RootState) => state.userId.photoURL);
  const email = useSelector((state: RootState) => state.userId.email);
  const displayName = useSelector(
    (state: RootState) => state.userId.displayName
  );
  const userType = useSelector((state: RootState) => state.userId.userType);
  const companyName = useSelector(
    (state: RootState) => state.userId.companyName
  );
  const descripcion = useSelector(
    (state: RootState) => state.userId.descripcion
  );
  const cargo = useSelector((state: RootState) => state.userId.cargo);

  const dispatch = useDispatch();
  //global state management
  const num = useSelector((state: RootState) => state.counter.value);
  // const navigation = useNavigation();
  // // console.log(props.profile?.userType);
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
    const storageRef = ref(storage, `avatar/${session}`);

    uploadBytesResumable(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath: any) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);
    console.log("imageUrl", imageUrl);

    const auth = getAuth();
    if (auth.currentUser) {
      updateProfile(auth.currentUser, { photoURL: imageUrl });
    } else {
      console.log("no hay usuario");
    }
    ///setting data to firebase
    const docRef = doc(collection(db, "users"), session ?? "");
    // Update a property of the document
    await updateDoc(docRef, {
      photoURL: imageUrl,
    });
    dispatch(update_photoURL(imageUrl));
  };

  // const goToApprovalScreen = () => {
  //   navigation.navigate(screen.profile.tab, {
  //     screen: screen.profile.approvals,
  //   });
  // };

  // const updateManpower = () => {
  //   setRenderComponent(<ChangeManPower onClose={onCloseOpenModal} />);
  //   setShowModal(true);
  // };
  // const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  // let approvalListPending = props.approvalListNew?.filter((item) => {
  //   return !(
  //     item.ApprovalPerformed?.includes(props.email) ||
  //     item.RejectionPerformed?.includes(props.email)
  //   );
  // });

  return (
    <>
      <View style={styles.content}>
        <Avatar
          size="large"
          // testID="avatar"
          rounded
          containerStyle={styles.avatar}
          source={
            { uri: photoUrl as string } ??
            require("../../assets/pictures/docsIcon.png")
          }
        >
          <Avatar.Accessory
            testID="avatar-accessory"
            size={24}
            onPress={changeAvatar}
          />
        </Avatar>
        <View>
          {true && <Text style={styles.displayName}>{displayName}</Text>}

          <Text>{email}</Text>
          <Text>{userType}</Text>

          {true && <Text>{cargo}</Text>}
          {descripcion && <Text>{descripcion}</Text>}
        </View>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>

        {/* {props.profile?.userType === userTypeList.manager && (
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => updateManpower()}
          >
            <Image
              source={require("../../../../assets/manpower2.png")}
              style={styles.roundImageUpload2}
            />
          </TouchableOpacity>
        )} */}

        <Text> </Text>
        {/* <TouchableOpacity
          style={styles.btnContainer4}
          onPress={() => goToApprovalScreen()}
        >
          <Image
            testID="change-manpower-component"
            source={require("../../../../assets/bell1.png")}
            style={styles.roundImageUpload}
          />
        </TouchableOpacity> */}
        {/* 
        {approvalListPending && (
          <Text style={styles.bellNomber}>{approvalListPending.length}</Text>
        )} */}
      </View>
      {/* <Modal testID="modal" show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal> */}
    </>
  );
}
