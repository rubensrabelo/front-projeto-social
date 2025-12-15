import styles from "./Navbar.module.css";

import logo from "../../assets/logo-eeep.webp";
import notification from "../../assets/notification_icon.svg";
import profile from "../../assets/user-profile.svg";
import logoutIcon from "../../assets/logout.png";

import { clearUserSession } from "../../utils/session/clearUserSession";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearUserSession();
    navigate("/");
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.systemName}>Sistema de Avaliações</span>
      </div>

      <div className={styles.right}>
        <img
          src={notification}
          alt="Notificações"
          className={styles.icon}
        />

        <img
          src={profile}
          alt="Perfil"
          className={styles.profile}
        />

        <button
          className={styles.iconButton}
          onClick={handleLogout}
        >
          <img
            src={logoutIcon}
            alt="Logout"
            className={styles.icon}
          />
        </button>
      </div>
    </nav>
  );
}
