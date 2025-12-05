import styles from "./StudentsHome.module.css";
import { useEffect, useState } from "react";
import ExamsTable from "./components/ExamsTable";
import type { Exam } from "./types/ExamsType";
import { getUserSession } from "../../utils/session/getUserSession";

export default function StudentsHome() {
    
    const UserName = getUserSession().nome;

    const [exams, setExams] = useState<Exam[]>([]);

    useEffect(() => {
        async function loadExams() {
        // Exame fake para testar a tabela
        const exemplo: Exam = {
            id: 1,
            titulo: "Prova de Matemática",
            quantidade_questoes: 10,
            turmas: [1, 2],
            bimestre: 1,
            area: "Matemática",
            dia_a_ser_realizada: "2025-11-15",
            hora_a_ser_liberada: "08:00",
            banco_questao_id: 3,
            questoes_id: [10, 11, 12],
            metodo_de_selecao_de_ap: "aleatorio"
        };

        setExams([exemplo]);
        }

        loadExams();
    }, []);

    return (
        <div className={styles.container}>

            <h1 className={styles.title}>Bem vindo(a) {UserName}</h1>
            <h2 className={styles.subtitle}>Provas disponíveis</h2>


            <ExamsTable
            exams={exams}
            />
        </div>
    );
}