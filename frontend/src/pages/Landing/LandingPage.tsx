import styles from "./LandingPage.module.css";
import CardOption from "../../Components/CardOption/CardOption";

import logo from "../../assets/logo-eeep.webp";

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <img
        src={logo}
        alt="Logo da EP"
        className={styles.landingImage}
      />

      <div className={styles.cardContainer}>
        <CardOption title="Aluno" image="/img/aluno.png" />
        <CardOption title="Professor" image="/img/professor.png" />
        <CardOption title="Coordenador" image="/img/coordenador.png" />
      </div>
    </div>
  );
}
