import * as Yup from "yup";

export function initialValues() {
  return {
    displayNameform: "",
    cargo: "",
    descripcion: "",
    photoURL: "",
    email: "",
    companyName: "",
    companyRUC: "",
    userType: "",
    uid: "",
    assetAssigned: "",
    companyManagerConfimation: "",
  };
}

export function validationSchema() {
  return Yup.object({
    displayNameform: Yup.string().required(
      "El nombre y apellidos son requeridos"
    ),
    cargo: Yup.string().required("el cargo es requerido"),
    companyRUC: Yup.string().required("la descripcion es requerida"),
  });
}
