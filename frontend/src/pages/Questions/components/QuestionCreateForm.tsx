import styles from "../Questions.module.css";

export default function QuestionCreateForm({
  question,
  setQuestion,
  handleSubmit,
  close,
  isEdit = false
}: any) {
  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{isEdit ? "Editar Questão" : "Criar Questão"}</h2>

        {/* ENUNCIADO */}
        <textarea
          className={styles.textarea}
          placeholder="Enunciado da questão..."
          value={question.enunciado}
          onChange={(e) =>
            setQuestion({ ...question, enunciado: e.target.value })
          }
        />

        {/* ALTERNATIVAS */}
        <input
          placeholder="Alternativa A"
          value={question.alternativa_a}
          onChange={(e) =>
            setQuestion({ ...question, alternativa_a: e.target.value })
          }
        />

        <input
          placeholder="Alternativa B"
          value={question.alternativa_b}
          onChange={(e) =>
            setQuestion({ ...question, alternativa_b: e.target.value })
          }
        />

        <input
          placeholder="Alternativa C"
          value={question.alternativa_c}
          onChange={(e) =>
            setQuestion({ ...question, alternativa_c: e.target.value })
          }
        />

        <input
          placeholder="Alternativa D"
          value={question.alternativa_d}
          onChange={(e) =>
            setQuestion({ ...question, alternativa_d: e.target.value })
          }
        />

        <input
          placeholder="Alternativa E"
          value={question.alternativa_e}
          onChange={(e) =>
            setQuestion({ ...question, alternativa_e: e.target.value })
          }
        />

        {/* CORRETA */}
        <select
          value={question.correta}
          onChange={(e) =>
            setQuestion({ ...question, correta: e.target.value })
          }
        >
          <option value="">Selecione a alternativa correta</option>
          <option value="A">Alternativa A</option>
          <option value="B">Alternativa B</option>
          <option value="C">Alternativa C</option>
          <option value="D">Alternativa D</option>
          <option value="E">Alternativa E</option>
        </select>

        {/* MATÉRIA */}
        <select
          value={question.materia}
          onChange={(e) =>
            setQuestion({ ...question, materia: e.target.value })
          }
        >
          <option value="">Selecione a Matéria</option>
          <option value="Português">Português</option>
          <option value="Matemática">Matemática</option>
          <option value="Física">Física</option>
          <option value="Química">Química</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
        </select>

        {/* DIFICULDADE */}
        <select
          value={question.nivel_de_dificuldade}
          onChange={(e) =>
            setQuestion({ ...question, nivel_de_dificuldade: e.target.value })
          }
        >
          <option value="">Nível de Dificuldade</option>
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>

        {/* BOTÕES */}
        <div className={styles.formButtons}>
          <button onClick={handleSubmit}>
            {isEdit ? "Salvar" : "Criar"}
          </button>
          <button className={styles.cancelBtn} onClick={close}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
