import styles from "../Exams.module.css";
import type { Exam } from "../types/ExamsType";

// interface ExamSummary {
//     id: number;
//     year: string;
//     bimester: string;
//     title: string;
//     subject: string;
// }

interface Props {
    exams: Exam[];
    handleDelete: (id: number) => void;
    startEdit: (e: Exam) => void;
}

export default function ExamsTable({ exams, handleDelete, startEdit }: Props) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Bimestre</th>
                        <th>Título</th>
                        <th>Disciplina</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {exams.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.bimestre}</td>
                            <td>{e.titulo}</td>
                            <td>{e.area}</td>
                            <td>
                                <button 
                                    className={styles.editBtn}
                                    onClick={() => startEdit(e)}
                                >
                                    Editar
                                </button>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(e.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
