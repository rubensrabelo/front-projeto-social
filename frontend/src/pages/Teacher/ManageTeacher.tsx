import { useNavigate } from "react-router-dom";
import styles from "./ManageTeacher.module.css";
import { useState } from "react";
import type { Teacher } from "./types/Teacher";

export default function ManageTeacher() {
    const navigate = useNavigate();

    const emptyTeacher = {
        nome: "",
        matricula: 0,
        senha: "",
    }

    const [creating, setCreating] = useState(false);
    const [newTeacher, setNewTeacher] = useState<Teacher>(emptyTeacher);

    return (
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => navigate("/home?type=coordenadores")}
            >
                ⬅ Voltar
            </button>

            <h1 className={styles.title}>Gerenciar Professores</h1>

            <button
                className={styles.newBtn}
                onClick={() => setCreating(true)}
            >
                + Professor
            </button>
        </div>
    );
}