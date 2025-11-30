import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Questions.module.css";

import QuestionsFilters from "./components/QuestionsFilters";
import QuestionCreateForm from "./components/QuestionCreateForm";
import QuestionsTable from "./components/QuestionsTable";
import type { Question, QuestionPayload } from "./types/QuestionType";

import { GetAllQuestionService } from "../../api/services/questions/GetAllQuestionService";
import { CreateQuestionService } from "../../api/services/questions/CreateQuestionService";

export default function Questions() {
  const navigate = useNavigate();
  const location = useLocation();
  const bank = location.state?.bank;

  const [questions, setQuestions] = useState<Question[]>([]);

  const emptyQuestion: Question = {
    id: null,
    statement: "",
    subject: "",
    difficulty: "",
    correct: "",
    options: { A: "", B: "", C: "", D: "", E: "" }
  };

  const [creating, setCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Question>(emptyQuestion);

  useEffect(() => {
    async function load() {
      if (!bank) return;

      try {
        const result = await GetAllQuestionService(
          String(bank.professor_id),
          Number(bank.id)
        );
        setQuestions(result);
      } catch (e) {
        alert("Erro ao carregar questões.");
      }
    }
    load();
  }, [bank]);

  const handleCreate = async () => {
    if (
      !newQuestion.statement ||
      !newQuestion.subject ||
      !newQuestion.correct ||
      !newQuestion.difficulty
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const payload: QuestionPayload = {
      enunciado: newQuestion.statement,
      alternativa_a: newQuestion.options.A,
      alternativa_b: newQuestion.options.B,
      alternativa_c: newQuestion.options.C,
      alternativa_d: newQuestion.options.D,
      alternativa_e: newQuestion.options.E,
      materia: newQuestion.subject,
      correta: newQuestion.correct,
      nivel_de_dificuldade: newQuestion.difficulty,
      banco_questao_id: Number(bank.id)
    };

    try {
      const created = await CreateQuestionService(
        bank.professor_id,
        Number(bank.id),
        payload
      );

      setQuestions([...questions, created]);
      setNewQuestion(emptyQuestion);
      setCreating(false);
    } catch (e: any) {
      alert("Erro ao criar questão: " + e.message);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backBtn}
        onClick={() => navigate("/banco_de_questoes")}
      >
        ⬅ Voltar
      </button>

      <h1 className={styles.title}>Gerenciar Questões</h1>

      <QuestionsFilters
        filters={{}}
        setFilters={() => {}}
        openCreateForm={() => setCreating(true)}
      />

      {creating && (
        <QuestionCreateForm
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          handleCreate={handleCreate}
          close={() => setCreating(false)}
        />
      )}

      <QuestionsTable questions={questions} handleDelete={() => {}} startEdit={() => {}} />
    </div>
  );
}
