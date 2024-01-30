import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { InfoUser } from "../../../components/profile/infoUser";
import { styles } from "./index.styles";
// import { connect } from "react-redux";
// import { update_firebaseUserUid } from "../../../actions/auth";
// import { ConnectedChangeDisplayNameForm } from "../../../components/Account/ChangeDisplayNameForm";
// import { Modal } from "../../../components/shared/Modal";
// import { update_firebaseProfile } from "../../../actions/profile";
// import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
// import { db } from "../../../utils";
import { Image as ImageExpo } from "expo-image";
// import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
// import { ProfileDateScreen } from "../../../components/Profile/ProfileDateScreen/ProfileDateScreen";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ProfileDate } from "../../../components/profile/ProfileDate";
import { Modal } from "../../../components/shared/Modal";
import { NameForm } from "../../../components/profile/ChangeUserForm/ChangeNameForm";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { signOut as CloseApp } from "../../../slices/auth";

export default function Profile(props: any) {
  // console.log("ProfileScreen");
  const num = useSelector((state: RootState) => state.counter.value);

  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] =
    useState<React.ReactElement | null>(null);
  const [post, setPost] = useState(null);
  //states of filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [removeFilter, setRemoveFilter] = useState(true);

  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    // props.update_firebaseUserUid("");
    dispatch(CloseApp());
    // props.update_firebaseProfile("");
  };
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const update_Data = () => {
    setRenderComponent(<NameForm onClose={onCloseOpenModal} />);
    setShowModal(true);
  };

  // //Changing the value to activate again the filter to rende the posts
  // const filter = (start, end) => {
  //   setStartDate(start);
  //   setEndDate(end);
  // };
  // const quitfilter = () => {
  //   setRemoveFilter((prev) => !prev);
  //   setStartDate(null);
  //   setEndDate(null);
  // };

  //This hook used to retrieve post data from Firebase and sorted by date

  // useEffect(() => {
  //   let EventList = props.totalEventServiceAITLIST?.filter((item) => {
  //     return item.emailPerfil === props.email;
  //   });

  //   EventList?.sort((a, b) => {
  //     return b.createdAt - a.createdAt;
  //   });

  //   setPost(EventList?.slice(0, 100));
  // }, [props.totalEventServiceAITLIST, removeFilter]);

  // useEffect(() => {
  //   let unsubscribe;
  //   let q;
  //   if (startDate && endDate) {
  //     async function fetchData() {
  //       q = query(
  //         collection(db, "events"),
  //         orderBy("createdAt", "desc"),
  //         where("createdAt", ">=", startDate),
  //         where("createdAt", "<=", endDate)
  //       );

  //       try {
  //         const querySnapshot = await getDocs(q);
  //         const lista = [];
  //         querySnapshot.forEach((doc) => {
  //           lista.push(doc.data());
  //         });

  //         setPost(lista.slice(0, 100));
  //       } catch (error) {
  //         console.error("Error fetching data: ", error);
  //       }
  //     }

  //     fetchData();

  //     return () => {
  //       if (unsubscribe) {
  //         unsubscribe();
  //       }
  //     };
  //   }
  // }, [startDate, endDate]);

  // const comentPost = (item) => {
  //   navigation.navigate(screen.home.tab, {
  //     screen: screen.home.comment,
  //     params: { Item: item },
  //   });
  // };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* <ConnectedInfoUser /> */}
          <InfoUser />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              title="Editar"
              buttonStyle={styles.btnActualizarStyles}
              titleStyle={styles.btnTextStyle}
              onPress={() => update_Data()}
            />

            <Button
              title="Cerrar "
              buttonStyle={styles.btncerrarStyles}
              titleStyle={styles.btnTextStyle}
              onPress={() => logout()}
            />
          </View>
        </View>
        <Text></Text>
        <Text></Text>

        <ProfileDate
        // filterButton={filter}
        // quitFilterButton={quitfilter}
        />
        {/* 
        <FlatList
          data={post}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
              // onPress={() => comentPost(item)}
              >
                <View>
                  <View style={styles.equipments2}>
                    <ImageExpo
                      source={{ uri: item.fotoPrincipal }}
                      style={styles.image2}
                      cachePolicy={"memory-disk"}
                    />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.name2}>{item.AITNombreServicio}</Text>
                      <Text style={styles.name2}>
                        {"Evento: "}
                        {item.titulo}
                      </Text>
                      <Text style={styles.info2}>{item.comentarios}</Text>
                      <Text style={styles.info2}>{item.fechaPostFormato}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.fotoPrincipal}
        /> */}
      </ScrollView>
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </>
  );
}
