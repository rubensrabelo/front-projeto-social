import styles from "../QuestionBank.module.css";
import { useNavigate } from "react-router-dom";


export default function BankQuestionsTable({ bank, onEdit, onDelete }: any) {

  const navigate = useNavigate();
  console.log(bank);

  function openQuestions(bank: any) {
    navigate("/questoes", {
      state: { bank }
    }); 
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Área</th>
          <th>Ano</th>
          <th>Bimestre</th>
          <th>Detalhes</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {bank.map((b: any) => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.area}</td>
            <td>{b.ano}</td>
            <td>{b.bimestre}</td>
            <td>
              <button
                  className={styles.confirmBtn}
                  onClick={() => openQuestions(b)}
              >
                  Ver Detalhes
              </button>
            </td>
            <td>
              <button className={styles.editBtn} onClick={onEdit}>Editar</button>
              <button onClick={() => onDelete(b)} className={styles.deleteBtn}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
