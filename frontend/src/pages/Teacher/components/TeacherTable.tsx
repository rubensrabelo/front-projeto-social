import styles from "../ManageTeacher.module.css";
import type { Teacher } from "../types/Teacher";

interface Props {
    teacher: Teacher[]
    handleDelete: (t: Teacher) => void;
    startEdit: (t: Teacher) => void;
}

export default function TeacherTable({ teacher, handleDelete, startEdit }: Props) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Matéria Ensinada</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {teacher.map((e) => (
                        <tr key={e.id}>
                            <td>{e.nome}</td>
                            <td>{e.matricula}</td>
                            <td>{e.materia_ensinada}</td>
                            <td>
                                <button
                                    className={styles.editBtn}
                                    onClick={() => startEdit(e)}
                                >
                                    Editar
                                </button>

                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(e)}
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
