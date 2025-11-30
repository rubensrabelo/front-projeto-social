import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import QuestionCreateForm from "./components/QuestionCreateForm";
import QuestionsTable from "./components/QuestionsTable";
import type { Question } from "./types/QuestionType";

import styles from "./Questions.module.css";
import { getUserSession } from "../../utils/session/getUserSession";
import { GetAllQuestionService } from "../../api/services/questions/GetAllQuestionService";
import { CreateQuestionService } from "../../api/services/questions/CreateQuestionService";

export default function Questions() {
  const navigate = useNavigate();
  const { state } = useLocation();  
  const bank = state?.bank;

  const user = getUserSession();

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

  useEffect(() => {
    if (!bank || !user) return;

    (async () => {
      const result = await GetAllQuestionService(user.id, bank.id);
      setQuestions(result);
    })();
  }, [bank]);

  const handleCreate = async () => {
    const payload = { ...question, banco_questao_id: bank.id };

    const created = await CreateQuestionService(user.id, bank.id, payload);
    setQuestions([...questions, created]);

    setQuestion(emptyQuestion);
    setCreating(false);
  };

  // const handleEdit = async () => {
  //   if (!question.id) return;

  //   const updated = await UpdateQuestionService(question.id, question);

  //   setQuestions((prev) =>
  //     prev.map((q) => (q.id === question.id ? updated : q))
  //   );

  //   setQuestion(emptyQuestion);
  //   setEditing(false);
  // };

  // const handleDelete = async (id: number) => {
  //   await DeleteQuestionService(id);
  //   setQuestions((prev) => prev.filter((q) => q.id !== id));
  // };

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
        // onEdit={(q) => {
        //   setQuestion(q);
        //   setEditing(true);
        // }}
        // onDelete={handleDelete}
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
          // handleSubmit={handleEdit}
          close={() => setEditing(false)}
          isEdit
        />
      )}
    </div>
  );
}
