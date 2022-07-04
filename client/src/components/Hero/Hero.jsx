import Button from "../Utilities/Button/Button";
import Link from "../Utilities/Link/Link";
import classes from "./Hero.module.css";
import { useDispatch } from "react-redux";
import { toggleLogRegModalActions } from "../../features/toggleLogRegModal";
import { isRegisteringActions } from "../../features/isRegistering";
import { isTeacherActions } from "../../features/isTeacher";

const Hero = () => {
  const dispatch = useDispatch();

  const registerMentorHandler = () => {
    dispatch(toggleLogRegModalActions.setIsModal());
    dispatch(isRegisteringActions.setIsRegistering(true));
    dispatch(isTeacherActions.setIsTeacher(true));
  };

  const registerStudentHandler = () => {
    dispatch(toggleLogRegModalActions.setIsModal());
    dispatch(isTeacherActions.setIsTeacher(false));
    dispatch(isRegisteringActions.setIsRegistering(true));
  };

  const directToLogInHandler = () => {
    dispatch(toggleLogRegModalActions.setIsModal());
    dispatch(isRegisteringActions.setIsRegistering(false));
  };

  return (
    <article className={classes.article}>
      <div className={classes.div}>
        <div className={classes.txtBox}>
          <h2 className={classes.h2}>¡BIENVENIDO!</h2>
          <p className={classes.mainP}>
            Portal Academico es su plataforma para participar en la tutoría y el aprendizaje.
            Una solución de un solo lugar para la comunicación directa entre aquellos que están
            dispuestos a enseñar y los que están dispuestos a aprender!
          </p>
        </div>
        <div className={classes.btnBox}>
          <p className={classes.identifierP}>Yo soy...</p>
          <Button innerTxt={"Profesor"} clickMe={registerMentorHandler} />
          <p className={classes.identifierP}>Yo soy...</p>
          <Button innerTxt={"Estudiante"} clickMe={registerStudentHandler} />
          <div className={classes.padLink}>
            <Link
              innerTxt={"¿Estas Registrado? Logueate"}
              clickMe={directToLogInHandler}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Hero;