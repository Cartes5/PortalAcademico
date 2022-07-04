import classes from "./MainSecCompThree.module.css";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";

import { wrapperActions } from "../../../features/wrapper";
import React from "react";
const MainSecCompThree = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.WhatRole.role);

  const addAssignmentHandler = () => {
    dispatch(wrapperActions.setForm(true));
    dispatch(wrapperActions.setMain(false));
  };

  const deleteClass = () => {
    dispatch(wrapperActions.setMain(false));
    dispatch(wrapperActions.setConfirm(true));
  };

  return (
    <section className={classes.section2}>
      {role === "Profesor" && (
        <React.Fragment>
          <Button innerTxt={"Añadir Asignatura"} clickMe={addAssignmentHandler} />
          <Button innerTxt={"Borrar Clase"} clickMe={deleteClass} />
        </React.Fragment>
      )}
      {role === "Alumno" && (
        <Button innerTxt={"Darse de baja de la clase"} clickMe={deleteClass} />
      )}
    </section>
  );
};

export default MainSecCompThree;