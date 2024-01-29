import * as Yup from "yup";

export function initialValues() {
  return {
    displayNameform: "",
    cargo: "",
    descripcion: "",
    photoURL: "",
    email: "",
    companyName: "",
    userType: "",
    uid: "",
  };
}

export function validationSchema() {
  return Yup.object({
    displayNameform: Yup.string().required(
      "El nombre y apellidos son requeridos"
    ),
    cargo: Yup.string().required("el cargo es requerido"),
    descripcion: Yup.string().required("la descripcion es requerida"),
  });
}
