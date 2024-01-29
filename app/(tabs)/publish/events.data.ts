import * as Yup from "yup";
export function initialValues() {
  return {
    tipoEvento: "",
    comentarios: "",
    kilometraje: "Todos",
    ubicacion: null,
    combustible: 0,
    totalCombustible: 0,
    facturacionFlete: 0,
    llanta: {},
    costoTotalRepuesto: 0,
    repuesto: "",
    costoMantenimiento: 0,
    //Datos Adicionales para Firebase
    fechaPostFormato: "",
    fechaPostISO: new Date().toISOString(),
    createdAt: new Date(),
    LastEventPosted: new Date(),
    photoServiceURL: "",
    emailPerfil: "",
    nombrePerfil: "",
    companyName: "",
    idFirebaseAsset: "",
  };
}

export function validationSchema() {
  // return Yup.object({
  //   tipoEvento: Yup.string().required("Campo obligatorio"),
  //   comentarios: Yup.string().required("Campo obligatorio"),
  //   kilometraje: Yup.string().required("Campo obligatorio"),
  //   ubicacion: Yup.string().required("Campo obligatorio"),
  //   // porcentajeAvance: Yup.string().required("Campo obligatorio"),
  //   // aprobacion: Yup.string().required("Campo obligatorio"),
  //   // pdfFile: Yup.string().required("Campo obligatorio"),
  //   // MontoModificado: Yup.string().required("Campo obligatorio"),
  //   // NuevaFechaEstimada: Yup.string().required("Campo obligatorio"),
  //   // HHModificado: Yup.string().required("Campo obligatorio"),
  //   // visibilidad: Yup.string().required("Campo obligatorio"),
  // });
}
