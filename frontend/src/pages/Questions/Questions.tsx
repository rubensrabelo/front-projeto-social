import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import QuestionCreateForm from "./components/QuestionCreateForm";
import QuestionsTable from "./components/QuestionsTable";
import type { Question } from "./types/QuestionType";

import styles from "./Questions.module.css";
import { GetAllQuestionService } from "../../api/services/questions/GetAllQuestionService";
import { CreateQuestionService } from "../../api/services/questions/CreateQuestionService";
import { DeleteQuestionService } from "../../api/services/questions/DeletelQuestionService";
import ConfirmDialog from "./components/ConfirmDialog";

export default function Questions() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bank = state?.bank;

  const emptyQuestion: Question = {
    id: null,
    enunciado: "",
    alternativa_a: "",
    alternativa_b: "",
    alternativa_c: "",
    alternativa_d: "",
    alternativa_e: "",
    materia: "",
    correta: "",
    banco_questao_id: bank?.id ?? 0,
    nivel_de_dificuldade: ""
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  const [question, setQuestion] = useState<Question>(emptyQuestion);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  useEffect(() => {
    if (!bank) return;

    async function fetchData() {
      const result = await GetAllQuestionService(bank.professor_id, bank.id);
      setQuestions(result);
    };

    fetchData();
  }, [bank]);


  async function handleCreate() {
    const payload = { ...question, banco_questao_id: bank.id };

    await CreateQuestionService(bank.professor_id, bank.id, payload);

    const result = await GetAllQuestionService(bank.professor_id, bank.id);
    setQuestions(result);

    setQuestion(emptyQuestion);
    setCreating(false);
  };

  async function handleEdit() {
    alert("Edição habilitada.");
  };

  function handleDelete(question: Question) {
    setQuestionToDelete(question);
    setConfirmOpen(true);
  }

  async function confirmDeletion() {
    if (!questionToDelete) return;

    try {
      await DeleteQuestionService(
        bank.professor_id,
        Number(questionToDelete.id)
      );

      setQuestions(prev => prev.filter(q => q.id !== questionToDelete.id));
    } catch (error) {
      alert("Erro ao deletar questão!");
      console.log(error);
    }

    setConfirmOpen(false);
    setQuestionToDelete(null);
  }


  return (
    <div className={styles.container}>
      <button
        className={styles.backBtn}
        onClick={() => navigate("/banco_de_questoes")}
      >
        ⬅ Voltar
      </button>

      <h1>Gerenciar Questões</h1>

      <button className={styles.createBtn} onClick={() => setCreating(true)}>
        + Criar Questão
      </button>

      <QuestionsTable
        questions={questions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {creating && (
        <QuestionCreateForm
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleCreate}
          close={() => setCreating(false)}
        />
      )}

      {editing && (
        <QuestionCreateForm
          question={question}
          setQuestion={setQuestion}
          handleSubmit={handleEdit}
          close={() => setEditing(false)}
          isEdit
        />
      )}

      {confirmOpen && (
        <ConfirmDialog
          title="Excluir questão"
          message={`Tem certeza que deseja excluir a questão?\n\n"${questionToDelete?.enunciado}"`}
          onConfirm={confirmDeletion}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}
