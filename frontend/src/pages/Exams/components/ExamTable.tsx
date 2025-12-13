import styles from "../Exams.module.css";
import type { Exam } from "../types/ExamsType";

interface Props {
  exams: Exam[];
  handleDelete: (id: number) => void;
  startEdit: (e: Exam) => void;
}

export default function ExamTable({ exams, handleDelete, startEdit }: Props) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Área</th>
            <th>Qtde Questões</th>
            <th>Bimestre</th>
            <th>Data de Realização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((e) => (
            <tr key={e.id}>
              <td>{e.titulo}</td>
              <td>{e.area}</td>
              <td>{e.quantidade_questoes}</td>
              <td>{e.bimestre}</td>
              <td>{e.dia_a_ser_realizada}</td>
              <td>
                <button className={styles.editBtn} onClick={() => startEdit(e)}>Editar</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(e.id!)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
