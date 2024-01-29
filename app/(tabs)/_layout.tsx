import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, Redirect } from "expo-router";
import { Pressable, useColorScheme, SafeAreaView, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import React, { useEffect } from "react";
import {
  update_photoURL,
  updateEmail,
  updateCargo,
  updatecompanyName,
  updateDescripcion,
  updateDisplayName,
  updateUserType,
} from "../../slices/auth";
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
import { db } from "../../utils/firebase";
import { getAuth } from "firebase/auth";
import { setAssetList, setEventList } from "../../slices/home";
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = getAuth().currentUser;
  //global state management for the user_uid
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.userId.isLoading);
  const session = useSelector((state: RootState) => state.userId.session);
  const name = useSelector((state: RootState) => state.userId.displayName);
  const user_email = useSelector((state: RootState) => state.userId.email);
  const companyName = useSelector(
    (state: RootState) => state.userId.companyName
  );

  useEffect(() => {
    if (user) {
      dispatch(update_photoURL(photoURL ?? ""));
      dispatch(updateDisplayName(displayName ?? ""));
      dispatch(updateEmail(email ?? ""));
    }
    async function fetchData() {
      if (session) {
        const docRef = doc(db, "users", session);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(updateCargo(docSnap.data().cargo ?? ""));
          dispatch(updatecompanyName(docSnap.data().companyName ?? ""));
          dispatch(updateUserType(docSnap.data().userType ?? ""));
          dispatch(updateDescripcion(docSnap.data().descripcion ?? ""));
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("Session is undefined or null!");
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    let unsubscribe: any;
    let lista: any = [];
    if (user_email) {
      function fetchData() {
        let queryRef;
        queryRef = query(
          collection(db, "Asset")
          // where(
          //   "AvanceAdministrativoTexto",
          //   "!=",

          //   "Contratista-Fin servicio"
          // ),
          // where("companyName", "==", companyName)
        );

        unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
          lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          //order the list by date
          // lista.sort((a: any, b: any) => {
          //   return b.LastEventPosted - a.LastEventPosted;
          // });
          dispatch(setAssetList(lista));

          // setData(lista.slice(0, 50));
          // props.updateAITServicesDATA(lista);
        });
      }
      fetchData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user_email]);
  //retrieving data from firebase events

  useEffect(() => {
    let unsubscribe: any;
    let lista: any = [];

    if (user_email) {
      async function fetchData() {
        let queryRef;
        queryRef = query(
          collection(db, "events")
          // limit(10),
          // where("visibilidad", "==", "Todos"),
          // orderBy("createdAt", "desc")
        );

        unsubscribe = onSnapshot(queryRef, async (ItemFirebase) => {
          lista = [];
          ItemFirebase.forEach((doc) => {
            lista.push(doc.data());
          });
          //order the list by date
          // lista.sort((a:any, b:any) => {
          //   return b.createdAt - a.createdAt;
          // });
          console.log("event", lista);
          dispatch(setEventList(lista));
          // setPosts(lista);
          // setCompanyName(companyName);
          // props.saveTotalEventServiceAITList(lista);
          // console.log("fetch events");
        });
        // setIsLoading(false);
      }

      fetchData();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user_email]);

  // useEffect(() => {
  //   let unsubscribe;
  //   if (props.email) {
  //     function fetchData() {
  //       let queryRef = query(
  //         collection(db, "approvals"),
  //         orderBy("date", "desc"),
  //         where("ApprovalRequestSentTo", "array-contains", props.email)
  //       );
  //       unsubscribe = onSnapshot(queryRef, (ItemFirebase) => {
  //         const lista = [];
  //         ItemFirebase.forEach((doc) => {
  //           lista.push(doc.data());
  //         });
  //         props.saveApprovalListnew(lista);
  //         // console.log("fetch approvals");
  //       });
  //     }
  //     fetchData();
  //     return () => {
  //       if (unsubscribe) {
  //         unsubscribe();
  //       }
  //     };
  //   }
  // }, [props.email]);

  let uid: string | null,
    photoURL: string | null,
    displayName: string | null,
    email: string | null;

  if (user) {
    ({ uid, photoURL, displayName, email } = user);
  }

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

  return (
    <Tabs
    // screenOptions={{
    //   tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    // }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Tab One",
          headerShown: false,

          tabBarLabel: "Inicio",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Tab Two",
          headerShown: false,

          tabBarLabel: "Reportes",

          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          headerShown: false,

          title: "Tab 3",
          tabBarLabel: "Publicar",

          tabBarIcon: ({ size, color }) => (
            <Ionicons name="logo-instagram" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,

          title: "Tab 4",
          tabBarLabel: "Unidad",

          tabBarIcon: ({ size, color }) => (
            <Ionicons
              name={true ? "car-outline" : "search"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Tab 5",
          tabBarLabel: "Perfil",
          headerShown: false,

          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
