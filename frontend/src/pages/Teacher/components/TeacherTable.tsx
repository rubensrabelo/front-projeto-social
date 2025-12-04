import styles from "../ManageTeacher.module.css";
import type { Teacher } from "../types/Teacher";

interface Props {
    teacher: Teacher[]
    // handleDelete: (id: string) => void;
    // startEdit: (t: Teacher) => void;
}

export default function TeacherTable({ teacher }: Props) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Matéria Ensinada</th>
                    </tr>
                </thead>

                <tbody>
                    {teacher.map((e) => (
                        <tr key={e.id}>
                            <td>{e.nome}</td>
                            <td>{e.matricula}</td>
                            <td>{e.materia_ensinada}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
