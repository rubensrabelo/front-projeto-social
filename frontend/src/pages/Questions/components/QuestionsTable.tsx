import styles from "../Questions.module.css";
import type { Question } from "../types/QuestionType";

interface Props {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
}

export default function QuestionsTable({ questions, onEdit, onDelete }: Props) {

  function editQuestion(question: Question) {
    onEdit(question);
  }

  function deleteQuestion(question: Question) {
    onDelete(question);
  }

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
        {questions.map((q: Question, index: number) => (
          <tr key={q.id ?? index}>
            <td>{q.enunciado}</td>
            <td>{q.materia}</td>
            <td>{q.nivel_de_dificuldade}</td>
            <td>
              <button
                className={styles.editBtn}
                onClick={() => editQuestion(q)}
              >
                Editar
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteQuestion(q)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
