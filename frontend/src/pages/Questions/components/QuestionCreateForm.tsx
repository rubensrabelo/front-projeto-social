import styles from "../Questions.module.css";
import type { Question } from "../types/QuestionType";

interface Props {
  newQuestion: Question;
  setNewQuestion: (v: Question) => void;
  handleCreate: () => void;
  close: () => void;
}

export default function QuestionCreateForm({
  newQuestion,
  setNewQuestion,
  handleCreate,
  close
}: Props) {
  const update = (field: keyof Question, value: any) => {
    setNewQuestion({ ...newQuestion, [field]: value });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <div className={styles.modalScroll}>
          <h2 className={styles.modalTitle}>Criar Nova Questão</h2>

          <textarea
            className={styles.textarea}
            placeholder="Enunciado da questão"
            value={newQuestion.statement}
            onChange={(e) => update("statement", e.target.value)}
          />

          <select
            value={newQuestion.subject}
            onChange={(e) => update("subject", e.target.value)}
          >
            <option value="">Disciplina</option>
            <option value="Português">Português</option>
            <option value="Matemática">Matemática</option>
            <option value="Biologia">Biologia</option>
            <option value="História">História</option>
            <option value="Geografia">Geografia</option>
          </select>

          <select
            value={newQuestion.difficulty}
            onChange={(e) => update("difficulty", e.target.value)}
          >
            <option value="">Nível de dificuldade</option>
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
          </select>

          <div className={styles.multipleBox}>
            <h4>Alternativas</h4>

            {["A", "B", "C", "D", "E"].map((opt) => (
              <input
                key={opt}
                type="text"
                placeholder={`Alternativa ${opt}`}
                value={newQuestion.options[opt]}
                onChange={(e) =>
                  update("options", {
                    ...newQuestion.options,
                    [opt]: e.target.value
                  })
                }
              />
            ))}

            <select
              value={newQuestion.correct}
              onChange={(e) => update("correct", e.target.value)}
            >
              <option value="">Alternativa Correta</option>
              {["A", "B", "C", "D", "E"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.modalCancel} onClick={close}>
            Cancelar
          </button>
          <button className={styles.modalSave} onClick={handleCreate}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
