import { StyleSheet } from "react-native";

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View, ScrollView, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Image as ImageExpo } from "expo-image";
import { SearchBar, Icon } from "@rneui/themed";
import { assetLists } from "../../../utils/assetList";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { Button } from "react-native";
import { styles } from "./item.styles";
import { postLists } from "../../../utils/postList";
// import { History } from "../../../components/search/H";
import { History } from "../../../components/search/History/History";
import { useRouter } from "expo-router";
import { Date } from "../../../components/search/History/Date";
export default function Item(props: any) {
  const { item } = useLocalSearchParams();
  const router = useRouter();

  const handleResetAction = () => {
    // navigation.goBack();
    console.log("item", item);
  };
  //this function goes to another screen to get more detail about the service state
  const MoreDetail = () => {
    router.push({
      pathname: "/search/moreDetail",
      // params: { item: item },
    });
  };

  //   navigation.navigate(screen.search.tab, {
  //     screen: screen.search.moreDetail,
  //     params: { Item: data },
  //   });
  // };
  // //Retrieve data Item that comes from the previous screen to render the Updated Status
  // const {
  //   params: { item },
  // } = props;
  //Using navigation.navigate I send it to another screen (post)
  const goToDocs = () => {
    router.push({
      pathname: "/search/files",
      // params: { item: item },
    });
  };
  //   navigation.navigate(screen.search.tab, {
  //     screen: screen.search.pdf,
  //     params: { Item: item },
  //   });
  // };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text></Text>

        <View style={[styles.row, styles.center]}>
          <View>
            <ImageExpo
              source={require("../../../assets/assetpics/freight02.jpeg")}
              style={{
                // alignContent: "center",
                marginLeft: "5%",
                marginTop: "5%",
                width: 80,
                height: 80,
                borderRadius: 80,
                // alignSelf: "center",
              }}
            />
          </View>
          <Text> </Text>
          <View style={{ marginLeft: 0 }}>
            <Text style={styles.name}>Freighliner 01</Text>
            <Text style={styles.info}>{"Tag:"} FreightLiner02</Text>
            <Text style={styles.info}>{"Tipo:"} sdfd</Text>
            <Text style={styles.info}>{"Kilometraje:"} 123,423 Km</Text>
            <Text style={styles.info}>
              {"Kilometraje cambio aceite:"} 123,423 Km
            </Text>
            <Text style={styles.info}>{"Gasto Combustible:"} 123,423 Km</Text>
            <Text style={styles.info}>
              {"Rendimiento Combustible:"} 123,423 Km
            </Text>

            <Text style={styles.info}>
              {"Facturacion a la fecha:"} 123,423 Km
            </Text>
            <Text style={styles.info}>
              {"Servicios a la fecha:"} 123,423 Km
            </Text>
            <Text style={styles.info}>{"Gastos a la fecha:"} 123,423 Km</Text>
          </View>
        </View>
        <Text></Text>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            // alignItems: "center",
            // backgroundColor: "white",
            // justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => MoreDetail()}
          >
            <Image
              source={require("../../../assets/pictures/more_information.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer4}
            onPress={() => goToDocs()}
          >
            <Image
              source={require("../../../assets/pictures/addFilesIcon.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.btnContainer4}
            // onPress={() => goToPublicar()}
          >
            <Image
              source={require("../../../assets/pictures/TakePhoto2.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer4}
            // onPress={() => goToDocsToApprove(serviceInfo)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUpload}
            />
          </TouchableOpacity> */}
        </View>
        <Text></Text>
        <Text></Text>

        <Text
          style={{
            marginLeft: 15,
            borderRadius: 5,
            fontWeight: "700",
            alignSelf: "center",
          }}
        >
          Historial de Eventos
        </Text>
        <Date />
        <Text></Text>

        {/* <GanttHistorial datas={post} comentPost={comentPost} /> */}
        <History />
      </ScrollView>
    </>
    // <View style={{ backgroundColor: "white", flex: 1 }}>
    //   {/* {console.log("SearchItem")} */}
    //   <TouchableOpacity>
    //     <Text>SearchAsse1t</Text>
    //   </TouchableOpacity>
    //   <Button title="Reset" onPress={handleResetAction} />
    // </View>
  );
}
