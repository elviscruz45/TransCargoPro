import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { styles } from "./index.styles";
// import { PieChart } from "../RecursosScreen/PieStatus";
// import { BarChartMontoServicios } from "../RecursosScreen/BarChartMontoServicios";
// import { BarChartProceso } from "../RecursosScreen/BarChartProceso";
// import { ServiceList } from "../RecursosScreen/ServiceList";
// import { InactiveServiceList } from "../RecursosScreen/InactiveServiceList";
// import { MontoEDPList } from "../RecursosScreen/MontoEDPList";
// import { MontoServiceList } from "../RecursosScreen/MontoServiceList";
// import { RecursosHumanos } from "../RecursosScreen/RecursosHumanos";
// import { BarInactiveServices } from "../RecursosScreen/BarInactiveServices";
// import { MontoComprometido } from "../RecursosScreen/MontoComprometido";
// import { getExcelReportData } from "../../../utils/excelData";
// import { EstadoServiceList } from "../RecursosScreen/EstadoServiceList";
// import { useNavigation } from "@react-navigation/native";
// import { screen } from "../../../utils";
// import { Modal } from "../../../components/shared/Modal";
// import { ChangeDisplayCompany } from "../../../components/Forms/ReportScreen/ChangeCompany/ChangeCompany";

export default function Report(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [company, setCompany] = useState("TOTAL CONTRATISTAS");
  const [companyList, setCompanyList] = useState();
  // console.log(company);
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  // const update_Data = () => {
  //   setRenderComponent(
  //     <ChangeDisplayCompany
  //       onClose={onCloseOpenModal}
  //       setCompany={setCompany}
  //       companyList={companyList}
  //     />
  //   );
  //   setShowModal(true);
  // };
  // //real time updates
  // const [data, setData] = useState();
  // const navigation = useNavigation();

  // //states to view the tables
  // const [serviciosActivos, setServiciosActivos] = useState(false);
  // const [estadoServicios, setEstadoServicios] = useState(false);
  // const [serviciosInactivos, setServiciosInactivos] = useState(false);
  // const [montoServicios, setMontoServicios] = useState(false);
  // const [montoEDP, setMontoEDP] = useState(false);
  // const [comprometido, setComprometido] = useState(false);
  // //Data about the company belong this event

  // const regex = /@(.+?)\./i;
  // const companyName = props.email?.match(regex)?.[1].toUpperCase() || "Anonimo"; // console.log("searchResults", searchResults);

  // // useEffect(() => {
  // //   setCompanyList([
  // //     ...new Set(props.servicesData.map((item) => item.companyName)),
  // //   ]);
  // //   if (companyName !== "FMI") {
  // //     setCompany(companyName);
  // //   }
  // // }, []);

  // useEffect(() => {
  //   if (Array.isArray(props.servicesData)) {
  //     setCompanyList([
  //       ...new Set(props.servicesData.map((item) => item.companyName)),
  //     ]);
  //   }
  //   if (companyName !== "FMI") {
  //     setCompany(companyName);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (props.servicesData && company === "TOTAL CONTRATISTAS") {
  //     setData(props.servicesData);
  //   }
  //   // if (company !== "TOTAL CONTRATISTAS") {
  //   //   setData(
  //   //     props.servicesData.filter(
  //   //       (item) => item.companyName?.toUpperCase() === company
  //   //     )
  //   //   );
  //   // }
  //   if (company !== "TOTAL CONTRATISTAS" && Array.isArray(props.servicesData)) {
  //     setData(
  //       props.servicesData.filter(
  //         (item) => item.companyName?.toUpperCase() === company
  //       )
  //     );
  //   }
  // }, [props.servicesData, company]);

  // // go to a history screen
  // const goToHistoryScreen = () => {
  //   navigation.navigate(screen.report.tab, {
  //     screen: screen.report.history,
  //   });
  // };

  // if (!data || !company || !companyList) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: "white",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text
  //         style={{
  //           fontSize: 50,
  //           // fontFamily: "Arial",
  //           color: "#2A3B76",
  //         }}
  //       >
  //         Bienvenido
  //       </Text>
  //     </View>
  //   );
  // } else {
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }} // Add backgroundColor here
        showsVerticalScrollIndicator={false}
      >
        <Text></Text>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          {"FMI" === "FMI" ? (
            <TouchableOpacity
            // onPress={() => update_Data()}
            >
              <Image
                source={require("../../../assets/pictures/AddImage.png")}
                style={styles.roundImageUpload}
              />
            </TouchableOpacity>
          ) : (
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUpload}
            />
          )}

          <TouchableOpacity
          // onPress={() => goToHistoryScreen()}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.history}
            />
          </TouchableOpacity>
        </View>
        {"FMI" !== "FMI" ? (
          <Text style={styles.company}>"Maxnicol"</Text>
        ) : (
          <Text style={styles.company}>{company}</Text>
        )}
        {/* {company !== "FMI" && company !== "TOTAL CONTRATISTAS" && (
            <RecursosHumanos company={company} />
          )} */}

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Servicios Activos Asignados</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setServiciosActivos(true)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setServiciosActivos(false)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>

        {/* {true && (
            <>
              <PieChart data={data} />
              <ServiceList data={data} />
            </>
          )} */}
        <Text></Text>
        <Text></Text>

        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Estado de Servicios Activos</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setEstadoServicios(true)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setEstadoServicios(false)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>
        {/* {estadoServicios && <EstadoServiceList data={data} />} */}
        <Text></Text>

        <Text></Text>
        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Servicios Inactivos</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setServiciosInactivos(true)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setServiciosInactivos(false)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>
        <Text></Text>

        {/* {true && (
            <>
              <Text style={{ margin: 10 }}>
                <BarInactiveServices
                  data={data}
                  titulo={"Stand by"}
                  unidad={"servicios"}
                />
              </Text>
              <Text style={{ marginLeft: 10 }}>
                <BarInactiveServices
                  data={data}
                  titulo={"Cancelacion"}
                  unidad={"servicios"}
                />
              </Text>
              <InactiveServiceList data={data} />
            </>
          )} */}
        <Text></Text>

        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Monto Servicios</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setMontoServicios(true)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          //  onPress={() => setMontoServicios(false)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>
        {/* {montoServicios && (
            <>
              <BarChartMontoServicios data={data} />
              <MontoServiceList data={data} />
            </>
          )} */}
        <Text></Text>

        <Text></Text>
        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Monto Estado de Pago</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setMontoEDP(true)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => setMontoEDP(false)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>
        {/* {montoEDP && (
            <>
              <BarChartProceso data={data} />
              <MontoEDPList data={data} />
            </>
          )} */}

        <Text></Text>

        <Text></Text>

        <View style={styles.iconMinMax}>
          <View style={styles.container22}>
            <Text style={styles.titleText}>Montos Comprometidos</Text>
          </View>
          <TouchableOpacity
          // onPress={() => setComprometido(true)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>

          <TouchableOpacity
          //  onPress={() => setComprometido(false)}
          >
            <Image
              source={require("../../../assets/pictures/AddImage.png")}
              style={styles.roundImageUploadmas}
            />
          </TouchableOpacity>
        </View>

        {/* {comprometido && <MontoComprometido data={data} />} */}
        <Text></Text>

        <TouchableOpacity
        // onPress={() => getExcelReportData(data)}
        >
          <Image
            source={require("../../../assets/pictures/AddImage.png")}
            style={styles.excel}
          />
        </TouchableOpacity>
      </ScrollView>
      {/* <Modal show={showModal} close={onCloseOpenModal}>
          {renderComponent}
        </Modal> */}
    </>
  );
  //}
}
