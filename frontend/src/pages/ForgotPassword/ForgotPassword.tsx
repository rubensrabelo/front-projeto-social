import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import styles from "./ForgotPassword.module.css";
import Input from "../../Components/Input/Input";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "usuario";

  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Password recovery request:", email);

    alert("Se um usuário existir com esse email, enviaremos um link de recuperação.");
    navigate(`/login?type=${type}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Recuperar Senha</h1>

        <p className={styles.subtitle}>
          Informe o email associado à sua conta <strong>{type}</strong>.
        </p>

        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={styles.submitButton} onClick={handleSubmit}>
          Enviar recuperação
        </button>

        <div className={styles.backLink}>
          <Link to={`/login?type=${type}`}>Voltar ao login</Link>
        </div>
      </div>
    </div>
  );
}
