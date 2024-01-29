import { SelectList } from "react-native-dropdown-select-list";
import React, { useState } from "react";
import { connect } from "react-redux";
// import { tipoEvento } from "../../../../utils/modalList";
import { tipoActivo } from "../../../../utils/tipoActivo";

interface Event {
  onClose: () => void;
  formik: any; // replace with the actual type
  setTipoActivo: (value: string) => void;
}

export const SelectActivo: React.FC<Event> = ({
  onClose,
  formik,
  setTipoActivo,
}) => {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  //   //render the list the best suit depend of TipoServicio property
  //   let serviceType;
  //   if (props.actualServiceAIT.TipoServicio === "Reparacion") {
  //     serviceType = Reparacion;
  //   } else if (props.actualServiceAIT.TipoServicio === "Fabricacion") {
  //     serviceType = Fabricacion;
  //   } else if (props.actualServiceAIT.TipoServicio === "Ingenieria") {
  //     serviceType = Ingenieria;
  //   } else if (props.actualServiceAIT.TipoServicio === "IngenieriayFabricacion") {
  //     serviceType = IngenieriayFabricacion;
  //   } else {
  //     serviceType = [];
  //   }

  function saveProperty(itemValue: any) {
    // setText(itemValue);
    formik.setFieldValue("tipoActivo", itemValue);
    setTipoActivo(itemValue);

    onClose();
  }

  return (
    // <SelectList
    //   setSelected={(val) => setSelected(val)}
    //   data={tipoEvento}
    //   save="value"
    //   maxHeight={150}
    //   onSelect={() => saveProperty(selected)}
    // />
    <SelectList
      setSelected={(val: any) => saveProperty(val)}
      data={tipoActivo}
      save="value"
      maxHeight={250}
    />
  );
};
