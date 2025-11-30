import styles from "../Questions.module.css";

export default function QuestionsTable({ questions, onEdit, onDelete }: any) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Enunciado</th>
          <th>Matéria</th>
          <th>Nível</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q: any) => (
          <tr key={q.id}>
            <td>{q.enunciado}</td>
            <td>{q.materia}</td>
            <td>{q.nivel_de_dificuldade}</td>
            <td>
              <button onClick={() => onEdit(q)}>Editar</button>
              <button onClick={() => onDelete(q.id)} className={styles.deleteBtn}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
