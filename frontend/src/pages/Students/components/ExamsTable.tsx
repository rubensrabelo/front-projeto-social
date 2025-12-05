import { useNavigate } from "react-router-dom";
import styles from "../../Students/StudentsHome.module.css";
import type { Exam } from "../../Students/types/ExamsType";

interface Props {
    exams: Exam[]
}
function isExamAvailable(exam: Exam): boolean {
    const currentDate = new Date()
    const examDate = new Date(exam.dia_a_ser_realizada + 'T' + exam.hora_a_ser_liberada)

    if(currentDate > examDate) return true
    return false
}

export default function ExamsTable({ exams }: Props) {
    const navigate = useNavigate();
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Quantidade de Questões</th>
                        <th>Data</th>
                        <th>Horário de liberação</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {exams.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.titulo}</td>
                            <td>{e.quantidade_questoes}</td>
                            <td>{e.dia_a_ser_realizada}</td>
                            <td>{e.hora_a_ser_liberada}</td>
                            <td>
                                {isExamAvailable(e) ?
                                <button 
                                className={styles.answerBtn}
                                onClick={() => navigate(`/student/answerExam/${e.id}`)}
                                >
                                    Iniciar Prova
                                </button>: "Prova indisponível"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
