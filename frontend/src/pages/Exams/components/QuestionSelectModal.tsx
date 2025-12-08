import { useEffect, useState } from "react";
import styles from "../Exams.module.css";
import { getUserSession } from "../../../utils/session/getUserSession";
import { GetAllQuestionService } from "../../../api/services/questions/GetAllQuestionService";

interface Props {
  close: () => void;
  banks: any[];
  onConfirm: (questions: number[], bankId: number) => void;
}

export default function QuestionSelectModal({ close, banks, onConfirm }: Props) {
  const [selectedBank, setSelectedBank] = useState<number | "">("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const loadQuestions = async (bankId: number) => {
    const user = getUserSession();
    const data = await GetAllQuestionService(user.id, bankId);
    setQuestions(data);
  };

  useEffect(() => {
    if (selectedBank !== "") {
      loadQuestions(Number(selectedBank));
    }
  }, [selectedBank]);

  const toggleSelect = (id: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3 className={styles.modalTitle}>Selecionar Questões</h3>

        <select
          value={selectedBank}
          onChange={(e) => setSelectedBank(Number(e.target.value))}
        >
          <option value="">Selecione um Banco</option>
          {banks.map((b) => (
            <option key={b.id} value={b.id}>
              {b.area}
            </option>
          ))}
        </select>

        <div className={styles.questionList}>
          {selectedBank === "" ? (
            <div className={styles.emptyState}>
              <p>Selecione um banco para visualizar as questões.</p>
            </div>
          ) : questions.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Nenhuma questão cadastrada para este banco.</p>
            </div>
          ) : (
            questions.map((q) => (
              <label key={q.id} className={styles.questionItem}>
                <div className={styles.questionHeader}>
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={() => toggleSelect(q.id)}
                    className={styles.checkbox}
                  />

                  <span className={styles.questionText}>{q.enunciado}</span>
                </div>

                <span className={styles.difficultyBadge}>
                  {q.nivel_de_dificuldade}
                </span>
              </label>
            ))
          )}
        </div>


        <div className={styles.modalActions}>
          <button className={`${styles.modalBtn} ${styles.modalCancel}`} onClick={close}>
            Cancelar
          </button>

          <button
            className={styles.modalBtn}
            onClick={() => onConfirm(selectedQuestions, Number(selectedBank))}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
