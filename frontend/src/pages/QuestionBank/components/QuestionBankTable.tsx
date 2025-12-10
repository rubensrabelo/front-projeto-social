import styles from "../QuestionBank.module.css";
import { useNavigate } from "react-router-dom";
import type { Bank } from "../types/BankType";


export default function BankQuestionsTable({ banks, onEdit, onDelete }: any) {

  const navigate = useNavigate();

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
          <th>Série</th>
          <th>Bimestre</th>
          <th>Detalhes</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {banks.map((b: Bank, index: number) => (
          <tr key={b.id ?? index}>
            <td>{b.id}</td>
            <td>{b.area}</td>
            <td>{b.ano}</td>
            <td>{b.bimestre}</td>
            <td>
              <button
                  className={styles.detailBtn}
                  onClick={() => openQuestions(b)}
              >
                  Ver Detalhes
              </button>
            </td>
            <td>
              <button className={styles.editBtn} onClick={() => onEdit(b)}>Editar</button>
              <button onClick={() => onDelete(b)} className={styles.deleteBtn}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
