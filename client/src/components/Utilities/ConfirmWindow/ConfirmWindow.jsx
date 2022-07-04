import React from "react";
import Button from "../Button/Button";
import classes from "./ConfirmWindow.module.css";
import { wrapperActions } from "../../../features/wrapper";
import { currentUserActions } from "../../../features/currentUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { currentClassActions } from "../../../features/currentClass";
import { isLoadingActions } from "../../../features/loading";
import { errorActions } from "../../../features/error";

const ConfirmWindow = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.CurrentUser.user);
  const currentClass = useSelector((state) => state.CurrentClass.class);
  const dark = useSelector((state) => state.DarkMode.isDarkMode);
  console.log(currentClass);

  let url;
  user.role === "Profesor"
    ? (url = "/api/teacher/classes/delete")
    : (url = "/api/student/classes/delete");

  const dispatchBunch = () => {
    dispatch(currentUserActions.removeClass(currentClass));
    dispatch(wrapperActions.setInitial());
    dispatch(currentClassActions.setCurrentClass({ className: "" }));
  };

  const dropHandler = async () => {
    console.log(currentClass);

    dispatch(isLoadingActions.setIsLoading(true));
    await axios
      .put(url, { classId: currentClass._id, userId: user._id })
      .then((serverRes) => {
        dispatchBunch();
        dispatch(isLoadingActions.setIsLoading(false));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          dispatch(errorActions.setIsError(true));
          dispatch(errorActions.setMsg("La clase ya no existe"));
          dispatchBunch();
        } else {
          dispatch(errorActions.setIsError(true));
          dispatch(errorActions.setMsg("Error de servidor. Intentelo de nuevo"));
        }
      });
  };

  const deleteHandler = async () => {
    dispatch(isLoadingActions.setIsLoading(true));

    await axios
      .delete(url, { data: { classId: currentClass._id } })
      .then((serverRes) => {
        dispatchBunch();
        dispatch(isLoadingActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(errorActions.setIsError(true));
        dispatch(errorActions.setMsg("Error de servidor. Intentelo de nuevo"));
      });
  };

  const cancelHandler = () => {
    dispatch(wrapperActions.setInitial());
  };

  return (
    <div className={classes.popUp}>
      <p className={dark ? `${classes.darkP}` : `${classes.lightP}`}>
        {user.role === "Profesor"
          ? `delete ${currentClass.className}?`
          : `Drop out of ${currentClass.className}?`}
      </p>

      <p className={classes.p}>¿Estas Seguro?</p>

      <div className={classes.btnBox}>
        <Button innerTxt={"Cancelar"} clickMe={cancelHandler} />
        {user.role === "Profesor" ? (
          <Button innerTxt={"Confirmar"} clickMe={deleteHandler} />
        ) : (
          <Button innerTxt={"Confirmar"} clickMe={dropHandler} />
        )}
      </div>
    </div>
  );
};

export default ConfirmWindow;
