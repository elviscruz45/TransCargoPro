import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image as ImageExpo } from "expo-image";
import { styles } from "./moreDetail.styles";
import { useNavigation, useLocalSearchParams } from "expo-router";
// import { screen } from "../../../utils";
import { connect } from "react-redux";
// import { saveActualEquipment } from "../../../actions/post";
// import { EquipmentListUpper } from "../../../actions/home";
// import { areaLists } from "../../../utils/areaList";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Item } from "../../../utils/moreInformation";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
const windowWidth = Dimensions.get("window").width;
export default function MoreDetail() {
  const { item }: any = useLocalSearchParams();

  const router = useRouter();
  const assetList =
    useSelector((state: RootState) => state.home.assetList) ?? [];
  const currentAsset: any = assetList.find(
    (asset: any) => asset.idFirebaseAsset === item
  );
  //Algorithm to render the bar status
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Item.Monto);
  ///function to change the format of FechaFin from ServiciosAIT firebase collection
  const formatDate = (item: any) => {
    if (!item) return;

    const date = new Date(item);

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
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  const BarProgress = (percentage: number) => {
    const TotalSizeCompleted = windowWidth - 20;
    const percentajeNormalized = (percentage * TotalSizeCompleted) / 100;
    const AvanceProyected = Item.AvanceEjecucion + Item.AvanceProyected;

    const getColor = () => {
      if (Item.AvanceEjecucion >= AvanceProyected) {
        return "blue";
      } else {
        return "red";
      }
    };
    return (
      <View style={{ flexDirection: "row", height: 10, margin: 10 }}>
        <View
          style={{
            backgroundColor: getColor(),
            width: percentajeNormalized ? percentajeNormalized : 0,
            borderRadius: 5,
          }}
        />
      </View>
    );
  };
  const ResposableList = (array: any) => {
    return (
      <View>
        <FlatList
          data={array}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.info3}>{item}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    );
  };
  // go to edit screen
  const goToEditAITScreen = (item: any) => {
    router.push({
      pathname: "/search/editasset",
      // params: { item: item },
    });
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {true && (
        <TouchableOpacity onPress={() => goToEditAITScreen(Item)}>
          <View style={{ marginRight: "2%" }}>
            <ImageExpo
              source={require("../../../assets/assetpics/freight01.jpeg")}
              style={styles.editIcon}
            />
          </View>
        </TouchableOpacity>
      )}

      {true ? (
        <ImageExpo
          source={require("../../../assets/assetpics/freight02.jpeg")}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
      ) : (
        <ImageExpo
          source={require("../../../assets/assetpics/freight02.jpeg")}
          style={styles.roundImage}
          cachePolicy={"memory-disk"}
        />
      )}
      <Text></Text>
      <Text style={styles.name}>{Item.Asset}</Text>
      <Text></Text>
      <View>
        <Text></Text>

        {/* <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Numero de AIT:  "}</Text>
          <Text style={styles.info2}>{Item.NumeroAIT}</Text>
        </View> */}

        {/* <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Numero de Cotizacion:  "}</Text>
          <Text style={styles.info2}>{Item.NumeroCotizacion}</Text>
        </View> */}

        {/* <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Tipo de Servicio:  "}</Text>
          <Text style={styles.info2}>{Item.TipoServicio}</Text>
        </View> */}

        {/* <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Area del Servicio:  "}</Text>
          <Text style={styles.info2}>{Item.AreaServicio}</Text>
        </View> */}
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Nombre de la Empresa:  "}</Text>
          <Text style={styles.info2}>{Item.companyName}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Creado por:  "}</Text>
          <Text style={styles.info2}>{Item.emailPerfil}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Monto de Facturacion:  "}</Text>
          <Text style={styles.info2}>
            {formattedAmount} {Item.Moneda}
          </Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Fecha de Asignacion:  "}</Text>
          <Text style={styles.info2}>
            {formatDate(Item?.FechaInicio?.seconds * 1000) ||
              formatDate(Item?.createdAt?.seconds * 1000)}
          </Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Fecha de Fin Propuesto:  "}</Text>
          <Text style={styles.info2}>15 Julio</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Horas Hombre Cotizadas:  "}</Text>
          <Text style={styles.info2}>
            {Item.HorasHombre}
            {" HH"}
          </Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Avance Ejecucion Real:  "}</Text>
          <Text style={styles.info2}>
            {Item.AvanceEjecucion}
            {" %"}
          </Text>
        </View>
        {BarProgress(Item.AvanceEjecucion)}

        {/* <View style={[styles.row, styles.center]}>
          <Text style={styles.info}>{"Avance Ejecucion Proyectado:  "}</Text>
          <Text style={styles.info2}>
            {AvanceProyected.toFixed(2)}
            {" %"}
          </Text>
        </View> */}

        {/* {BarProgress(AvanceProyected)} */}
        <Text></Text>

        <Text style={styles.info}>
          {"Administrador de Contratos Cerro Verde:  "}
        </Text>
        {/* {ResposableList(UsuarioAdministrador)}
        <Text style={styles.info}>{"Planeamiento Cerro Verde:  "}</Text>
        {ResposableList(UsuarioPlaneamiento)}
        <Text style={styles.info}>{"Mantenimiento Cerro Verde:  "}</Text>
        {ResposableList(UsuarioMantenimiento)}

        <Text style={styles.info}>{"Gerente Contratista:  "}</Text>
        {ResposableList(ContratistaGerente)}
        <Text style={styles.info}>{"Planificador Contratista:  "}</Text>
        {ResposableList(ContratistaPlanificador)}
        <Text style={styles.info}>{"Supervisores Contratista:  "}</Text> */}
        {/* {ResposableList(ContratistaSupervisor)} */}
      </View>
    </ScrollView>
  );
}
