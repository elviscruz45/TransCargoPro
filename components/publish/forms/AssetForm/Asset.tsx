import { View, Text, Linking, Button } from "react-native";
import React, { useState, ReactNode } from "react";
import { styles } from "./Asset.styles";
import { Input } from "@rneui/themed";
import { Modal } from "../../../shared/Modal/Modal";
import { ChangeDate } from "../ChangeDates/ChangeDate";
import { SelectActivo } from "../TipoActivo/Tipo";
import hola from "../../../../app/listing/[id]";

export function AssetForm({ formik, setActivo, setNombre }: any) {
  const [renderComponent, setRenderComponent] = useState<ReactNode>(null);

  //open or close modal
  const [showModal, setShowModal] = useState(false);
  //form
  const [tipoActivo, setTipoActivo] = useState<string>("");
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  ///function to date format
  const formatdate = (item: string) => {
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
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedDate = `${day} ${month} ${year} `;
    const fechaPostFormato = formattedDate;
    if (!item) {
      return;
    } else {
      return fechaPostFormato;
    }
  };

  //function to format money
  const formatNumber = (item: number) => {
    const amount = item;

    const formattedAmount = new Intl.NumberFormat("en-US").format(amount);
    if (!item) {
      return;
    } else {
      return formattedAmount;
    }
  };

  const selectComponent = (key: string, formikValue: string) => {
    if (key === "TipoActivo") {
      setRenderComponent(
        <SelectActivo
          onClose={onCloseOpenModal}
          formik={formik}
          // setAreaservicio={setAreaservicio}
          setTipoActivo={setTipoActivo}
        />
      );
    }
    if (key === "date") {
      setRenderComponent(
        <ChangeDate
          onClose={onCloseOpenModal}
          formik={formik}
          formikValue={formikValue}
          // setAreaservicio={setAreaservicio}
          // setActivo={setActivo}
        />
      );
    }

    onCloseOpenModal();
  };

  return (
    <View>
      <View style={styles.content}>
        <Input
          label="Tipo de Activo"
          value={formik.values.tipoActivo.toString()}
          placeholder={formik.values.tipoActivo.toString()}
          rightIcon={{
            type: "material-community",
            name: "clipboard-text",
            color: "#c2c2c2",
            onPress: () => {
              selectComponent("TipoActivo", "tipoActivo");
            },
          }}
          // errorMessage={formik.errors.NombreServicio}
        />
        {tipoActivo === "Conductor o Personal" && (
          <>
            <Text style={styles.subtitleForm}>Informacion Personal</Text>

            <Input
              value={formik.values.nombre.toString()}
              label="Nombre del Personal"
              // placeholder="Area del Servicio a Realizar"
              // editable={false}
              onChangeText={(text) => {
                formik.setFieldValue("nombre", text);
                setNombre(text);
              }}
              // errorMessage={formik.errors.AreaServicio}
            />
            <Input
              value={formik.values.dni.toString()}
              label="DNI"
              keyboardType="numeric"
              onChangeText={(text) => {
                formik.setFieldValue("dni", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
          </>
        )}
        {tipoActivo === "Equipo o Activo" && (
          <>
            <Text style={styles.subtitleForm}>Informacion Activo</Text>

            <Input
              value={formik.values.activo.toString()}
              label="Nombre del Activo/Area"
              // errorMessage={formik.errors.AreaServicio}
              onChangeText={(text) => {
                formik.setFieldValue("activo", text);
                setActivo(text);
              }}
            />

            <Input
              label="Placa Vehicular Vehicular"
              value={formik.values.placa.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("placa", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />

            <Input
              label="Fecha de Fabricacion"
              keyboardType="numeric"
              value={formik.values.fechaFabricacion.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("fechaFabricacion", text);
              }}

              // errorMessage={formik.errors.NombreServicio}
            />
            <Input
              label="Categoria de Vehiculo"
              value={formik.values.categoriaVehiculo.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("categoriaVehiculo", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Numero de Motor"
              value={formik.values.numeroMotor.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("numeroMotor", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Marca"
              value={formik.values.marca.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("marca", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Modelo"
              value={formik.values.modelo.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("modelo", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Kilometraje"
              value={formik.values.kilometraje.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("kilometraje", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Numero Serie Chasis"
              value={formik.values.numeroChasis.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("numeroChasis", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Text style={styles.subtitleForm}>Datos Tecnicos</Text>
            <Input
              label="Clase De Vehiculo"
              value={formik.values.claseVehiculo.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("claseVehiculo", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Potencia de Motor"
              value={formik.values.potencia.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("potencia", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Tipo Combustible"
              value={formik.values.tipoCombustible.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("tipoCombustible", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Numero de Serie"
              value={formik.values.numeroSerie.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("numeroSerie", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Peso Neto (Kg)"
              keyboardType="numeric"
              value={formik.values.pesoNeto.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("pesoNeto", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Carga Util (Kg)"
              keyboardType="numeric"
              value={formik.values.cargaUtil.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("cargaUtil", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Peso Bruto (Kg)"
              keyboardType="numeric"
              value={formik.values.pesoBruto.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("pesoBruto", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Dimensiones (LxAxA) (m)"
              value={formik.values.dimensiones.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("dimensiones", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Color"
              value={formik.values.color.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("color", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Carroceria remolcador"
              value={formik.values.carroceria.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("carroceria", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
            <Input
              label="Ejes"
              value={formik.values.ejes.toString()}
              onChangeText={(text) => {
                formik.setFieldValue("ejes", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
            />
          </>
        )}
        {tipoActivo === "Conductor o Personal" && (
          <>
            <Text style={styles.subtitleForm}>Documentacion Personal</Text>
            <Input
              label="Licencia de Conducir A3"
              // InputComponent={() => (
              //   <>
              //     <ChangeDate onClose={onCloseOpenModal} formik={formik} />
              //   </>
              // )}
              value={formatdate(formik.values.licenciaA3.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "licenciaA3");
                },
              }}
            />

            <Input
              label="Licencia de Conducir A4"
              value={formatdate(formik.values.licenciaA4.toString())}
              // placeholder="Numero Servicio"
              // onChangeText={(text) => {
              //   formik.setFieldValue("NumeroAIT", text);
              //   setAit(text);
              // }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "licenciaA4");
                },
              }}
            />

            <Input
              label="Certificado de Salud Ocupacional"
              value={formatdate(formik.values.certificadoSalud.toString())}
              // placeholder="Numero Servicio"
              // onChangeText={(text) => {
              //   formik.setFieldValue("NumeroAIT", text);
              //   setAit(text);
              // }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "certificadoSalud");
                },
              }}
            />
            <Input
              label="Record de Conductor"
              value={formatdate(formik.values.recordConductor.toString())}
              // placeholder="Numero Servicio"
              // onChangeText={(text) => {
              //   formik.setFieldValue("NumeroAIT", text);
              //   setAit(text);
              // }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "recordConductor");
                },
              }}
            />
            <Input
              label="IQBF SUNAT Conductor"
              value={formatdate(formik.values.iqbfConductor.toString())}
              // placeholder="Numero Servicio"
              // onChangeText={(text) => {
              //   formik.setFieldValue("NumeroAIT", text);
              //   setAit(text);
              // }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "iqbfConductor");
                },
              }}
            />
            <Input
              label="Manejo Defensivo"
              value={formatdate(formik.values.manejoDefensivo.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "manejoDefensivo");
                },
              }}
            />
            <Input
              label="Seguro Vida Ley"
              value={formatdate(formik.values.seguroVidaLey.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "seguroVidaLey");
                },
              }}
            />
            <Input
              label="SCTR Salud"
              value={formatdate(formik.values.sctrSalud.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "sctrSalud");
                },
              }}
            />
            <Input
              label="SCTR Pension"
              value={formatdate(formik.values.sctrPension.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "sctrPension");
                },
              }}
            />
          </>
        )}
        {tipoActivo === "Equipo o Activo" && (
          <>
            <Text style={styles.subtitleForm}>Documentacion Vehicular</Text>
            <Input
              label="Habilitacion Vehicular"
              value={formatdate(formik.values.habilitacionVehicular.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "habilitacionVehicular");
                },
              }}
            />
            <Input
              label="Resolucion Materiales Peligrosos"
              value={formatdate(
                formik.values.resolucionMaterialesPeligrosos.toString()
              )}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "resolucionMaterialesPeligrosos");
                },
              }}
            />
            <Input
              label="Inspeccion Tecnica"
              value={formatdate(formik.values.inspeccionTecnica.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "inspeccionTecnica");
                },
              }}
            />
            <Input
              label="Vencimiento SUNAT IQBF"
              value={formatdate(formik.values.sunatIQBF.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "sunatIQBF");
                },
              }}
            />
            <Input
              label="SOAT"
              value={formatdate(formik.values.soat.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "soat");
                },
              }}
            />
            <Input
              label="Poliza Responsabilidad Civil"
              value={formatdate(
                formik.values.polizaResponsabilidadCivil.toString()
              )}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "polizaResponsabilidadCivil");
                },
              }}
            />

            <Input
              label="Plan de Contingencia"
              value={formatdate(formik.values.planContingencia.toString())}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "planContingencia");
                },
              }}
            />
            <Input
              label="R.D De Habilitacion"
              value={formatdate(formik.values.RDHabilitacion.toString())}
              onChangeText={(text) => {
                formik.setFieldValue("RDHabilitacion", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "RDHabilitacion");
                },
              }}
            />

            <Input
              label="Partida Registral"
              value={formatdate(formik.values.partidaRegistral.toString())}
              onChangeText={(text) => {
                formik.setFieldValue("partidaRegistral", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "partidaRegistral");
                },
              }}
            />
          </>
        )}

        {tipoActivo === "Area Empresa" && (
          <>
            <Input
              value={formik.values.NombreArea.toString()}
              label="Nombre del Area"
              // placeholder="Area del Servicio a Realizar"
              // editable={false}
              onChangeText={(text) => {
                formik.setFieldValue("NombreArea", text);
                setNombre(text);
              }}
              // errorMessage={formik.errors.AreaServicio}
            />
            <Text style={styles.subtitleForm}>Documentos de la Empresa</Text>

            <Input
              label="Ficha RUC"
              value={formatdate(formik.values.FichaRUC.toString())}
              onChangeText={(text) => {
                formik.setFieldValue("FichaRUC", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "FichaRUC");
                },
              }}
            />
            <Input
              label="Seguro de Carga"
              value={formatdate(formik.values.SeguroCarga.toString())}
              onChangeText={(text) => {
                formik.setFieldValue("SeguroCarga", text);
              }}
              // errorMessage={formik.errors.NumeroAIT}
              rightIcon={{
                type: "material-community",
                name: "update",
                color: "#c2c2c2",
                onPress: () => {
                  selectComponent("date", "SeguroCarga");
                },
              }}
            />
          </>
        )}
      </View>

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}
