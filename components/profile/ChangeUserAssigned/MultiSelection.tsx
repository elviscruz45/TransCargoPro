import { MultipleSelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { View, Text, Linking, Button } from "react-native";
import { getAuth, updateProfile } from "firebase/auth";
// import { db } from "../../../../utils";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { connect } from "react-redux";
import { db } from "../../../utils/firebase";

export const MultiSelectExample = (props: any) => {
  const [selected, setSelected] = React.useState([]);
  const [list, setList] = useState<any>([]);
  const { setUsers, setUid } = props;

  useEffect(() => {
    async function fetchData() {
      const queryRef1 = query(
        collection(db, "users"),
        where("companyRUC", "==", "20490917293"),
        orderBy("email", "desc")
      );
      const getDocs1 = await getDocs(queryRef1);
      const lista: any = [];

      // Process results from the first query
      if (getDocs1) {
        getDocs1.forEach((doc) => {
          const object = doc.data();
          const objectver2 = {
            ...object,
            value: `${object.displayNameform}\n(${object.email})`,
            email: object.email,
          };
          lista.push(objectver2);
        });
      }
      setList(lista);
    }

    fetchData();
  }, []);

  function saveProperty(itemValue: any) {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    const emailList = itemValue
      .map((item: any) => {
        const match = item.match(emailRegex);
        return match ? match[0] : null;
      })
      .filter(Boolean);

    const filteredList = list.filter((obj: any) =>
      emailList.includes(obj.email)
    );

    console.log(filteredList);

    setUsers(filteredList);

    const uidList = filteredList.map((item: any) => item.uid);
    console.log(uidList);
    setUid(uidList);
  }

  return (
    <>
      <MultipleSelectList
        setSelected={(val: any) => setSelected(val)}
        data={list}
        save="value"
        // mode="datetime"
        onSelect={() => saveProperty(selected)}
        label="Categories"
      />
    </>
  );
};
