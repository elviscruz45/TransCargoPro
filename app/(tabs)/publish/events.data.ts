import * as Yup from "yup";
export function initialValues() {
  return {
    tipoEvento: "",
    comentarios: "",
    kilometraje: "",
    ubicacion: "",
    combustible: "",
    totalCombustible: "",
    facturacionFlete: "",
    llanta: [],
    costoTotalRepuesto: "",
    repuesto: "",
    costoMantenimiento: "",
    photoEvent: "",
    userType: "",
    photoAssetURL: "",
    placa: "",
    //Datos Adicionales para Firebase
    fechaPostFormato: "",
    fechaPostISO: new Date().toISOString(),
    createdAt: new Date(),
    LastEventPosted: new Date(),
    photoProfileURL: "",
    emailPerfil: "",
    nombrePerfil: "",
    nombreAsset: "",
    companyName: "",
    idFirebaseAsset: "",
    idEventFirebase: "",
  };
}

export function validationSchema() {
  return Yup.object({
    tipoEvento: Yup.string().required("Campo obligatorio"),
    //   comentarios: Yup.string().required("Campo obligatorio"),
    //   kilometraje: Yup.string().required("Campo obligatorio"),
    ubicacion: Yup.object().required("Campo obligatorio"),
    //   combustible: Yup.string().required("Campo obligatorio"),
    //   totalCombustible: Yup.string().required("Campo obligatorio"),
    //   facturacionFlete: Yup.string().required("Campo obligatorio"),
    //   llanta: Yup.string().required("Campo obligatorio"),
    //   costoTotalRepuesto: Yup.string().required("Campo obligatorio"),
    //   repuesto: Yup.string().required("Campo obligatorio"),
    //   costoMantenimiento: Yup.string().required("Campo obligatorio"),
    //   //   tipoEvento: Yup.string().required("Campo obligatorio"),
    //   //   comentarios: Yup.string().required("Campo obligatorio"),
    //   //   kilometraje: Yup.string().required("Campo obligatorio"),
    //   //   ubicacion: Yup.string().required("Campo obligatorio"),
    //   //   // porcentajeAvance: Yup.string().required("Campo obligatorio"),
    //   //   // aprobacion: Yup.string().required("Campo obligatorio"),
    //   //   // pdfFile: Yup.string().required("Campo obligatorio"),
    //   //   // MontoModificado: Yup.string().required("Campo obligatorio"),
    //   //   // NuevaFechaEstimada: Yup.string().required("Campo obligatorio"),
    //   //   // HHModificado: Yup.string().required("Campo obligatorio"),
    //   //   // visibilidad: Yup.string().required("Campo obligatorio"),
  });
}
