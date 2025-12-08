import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./Exams.module.css";
import ExamTable from "./components/ExamTable";
import type { Exam } from "./types/ExamsType";

export default function Exams() {
  const navigate = useNavigate();

  const [exams, setExams] = useState<Exam[]>([]);

  const startCreate = () => {
    navigate("/exams/create");
  };

  const startEdit = (e: Exam) => {
    sessionStorage.setItem("editing_exam", JSON.stringify(e));
    navigate(`/exams/edit/${e.id}`);
  };

  const handleDelete = (id: number) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backBtn}
        onClick={() => navigate("/home?type=professores")}
      >
        ⬅ Voltar
      </button>

      <h1 className={styles.title}>Gerenciar Provas</h1>

      <button className={styles.newBtn} onClick={startCreate}>
        + Nova Prova
      </button>

      <ExamTable
        exams={exams}
        handleDelete={handleDelete}
        startEdit={startEdit}
      />
    </div>
  );
}
