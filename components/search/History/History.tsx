import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { postLists } from "../../../utils/postList";
import { styles } from "./History.styles";
import { Image as ImageExpo } from "expo-image";
import { SearchBar, Icon } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
export function History() {
  const eventList: any = useSelector(
    (state: RootState) => state.home.eventList
  );
  const dispatch = useDispatch();

  return (
    <>
      <FlatList
        scrollEnabled={false}
        // contentContainerStyle={props.listViewContainerStyle}
        data={eventList}
        renderItem={({ item, index }) => {
          // const timestampData = item.createdAt;
          // const timestampInMilliseconds =
          //   timestampData.seconds * 1000 + timestampData.nanoseconds / 1000000;
          // const date = new Date(timestampInMilliseconds); // Function to get the abbreviated month name
          function getAbbreviatedMonthName(monthNumber: number) {
            const months = [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Oct",
              "Nov",
              "Dic",
            ];
            return months[monthNumber];
          }
          // Create the formatted string "dd MMM" (e.g., "28 Ago")
          const day = 12;
          // const day = item.createdAt.getDate();

          const month = getAbbreviatedMonthName(2);

          // console.log(item.createdAt?.toDate().getMonth());
          const formattedDate = `${day} ${month}`;

          //get the company name from the userEmail
          const regex = /@([a-z]+)\.com/i;
          // const matches = item.emailPerfil.match(regex);

          return (
            <View style={{ marginLeft: 15 }}>
              <View style={[styles.rowContainer]}>
                <View style={styles.timeWrapper}>
                  <View
                    style={[styles.timeContainer, styles.timeContainerStyle]}
                  >
                    <Text
                      style={[
                        styles.time,
                        styles.timeStyle,
                        {
                          textAlign: "center",
                          marginTop: 15,
                          marginLeft: -5,
                        },
                      ]}
                      allowFontScaling={true}
                    >
                      {formattedDate}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.circle]}>
                <ImageExpo
                  source={require("../../../assets/pictures/plus3.png")}
                  style={{ width: 20, height: 20 }}
                  cachePolicy={"memory-disk"}
                />
              </View>
              <View style={styles.details}>
                <TouchableOpacity
                // onPress={() => comentPost(item)}
                >
                  <Text style={styles.titledetails}>{item.tipoEvento}</Text>

                  <View style={styles.row}>
                    <ImageExpo
                      source={
                        item.photoEvent
                          ? { uri: item.photoEvent }
                          : require("../../../assets/pictures/report1.png")
                      }
                      cachePolicy={"memory-disk"}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginLeft: 5,
                      }}
                    />
                    <Text style={styles.textdetail}>{item.comentarios}</Text>
                  </View>
                  <Text></Text>
                  {/* <View style={styles.rowavanceNombre}>
                    <Text style={styles.avanceNombre}> Etapa: </Text>

                    <Text style={styles.detail}> {item.etapa}</Text>
                  </View> */}
                  <View style={styles.rowavanceNombre}>
                    <Text style={styles.avanceNombre}> Fecha:</Text>

                    <Text style={styles.detail}> {item.fechaPostFormato}</Text>
                  </View>
                  <View style={styles.rowavanceNombre}>
                    <Text style={styles.avanceNombre}> Autor: </Text>
                    <Text style={styles.detail}> {item.nombrePerfil}</Text>
                  </View>
                  {/* {true && (
                    <View style={styles.rowavanceNombre}>
                      <Icon type="material-community" name="paperclip" />
                    </View>
                  )} */}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item: any) => item.id}
      />
    </>
  );
}
