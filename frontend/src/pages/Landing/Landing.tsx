import styles from "./Landing.module.css";
import CardOption from "../../Components/CardOption/CardOption";

import logo from "../../assets/logo-eeep.webp";
import UserIcon from "../../assets/UserIcon";

import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  const navigate = useNavigate();

  const handleSelect = (role: "alunos" | "professores" | "coordenadores") => {
    navigate(`/login?type=${role}`);
  };

  return (
    <div className={styles.landingContainer}>
      <img
        src={logo}
        alt="Logo da EP"
        className={styles.landingImage}
      />

      <div className={styles.cardContainer}>
        <CardOption
          title="Aluno"
          Icon={UserIcon}
          onClick={() => handleSelect("alunos")}
        />
        <CardOption
          title="Professor"
          Icon={UserIcon}
          onClick={() => handleSelect("professores")}
        />
        <CardOption
          title="Coordenador"
          Icon={UserIcon}
          onClick={() => handleSelect("coordenadores")}
        />
      </div>
    </div>
  );
}
