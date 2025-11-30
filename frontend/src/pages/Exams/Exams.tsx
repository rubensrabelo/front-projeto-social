import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Exams.module.css";

import ExamFilters from "./components/ExamFilters";
import ExamCreateForm from "./components/ExamForm";
import ExamTable from "./components/ExamTable";
import type { Exam } from "./types/ExamsType";

export default function Exams() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ bimestre: "", disciplina: "" });

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      titulo: "Prova de Matemática",
      quantidade_questoes: 10,
      turmas: [1, 2],
      bimestre: 1,
      area: "Matemática",
      dia_a_ser_realizada: "2025-02-15",
      hora_a_ser_liberada: "09:00",
      banco_questao_id: 1,
      questoes_id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      metodo_de_selecao_de_ap: "aleatório",
    }
  ]);

  const emptyExam: Exam = {
    titulo: "",
    quantidade_questoes: 0,
    turmas: [],
    bimestre: 0,
    area: "",
    dia_a_ser_realizada: "",
    hora_a_ser_liberada: "",
    banco_questao_id: 0,
    questoes_id: [],
    metodo_de_selecao_de_ap: "",
  };

  const [creating, setCreating] = useState(false);
  const [newExam, setNewExam] = useState<Exam>(emptyExam);

  const handleCreate = () => {
    if (
      !newExam.titulo ||
      !newExam.bimestre ||
      !newExam.quantidade_questoes ||
      !newExam.area ||
      !newExam.dia_a_ser_realizada ||
      !newExam.hora_a_ser_liberada ||
      !newExam.banco_questao_id ||
      newExam.turmas.length === 0 ||
      newExam.questoes_id.length === 0 ||
      !newExam.metodo_de_selecao_de_ap
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const newE: Exam = {
      ...newExam,
      id: exams.length + 1,
    };

    setExams([...exams, newE]);
    setNewExam(emptyExam);
    setCreating(false);
  };

  const startEdit = (e: Exam) => {
    setNewExam({ ...e });
    setEditId(e.id ?? null);
    setEditing(true);
  };

  const handleEdit = () => {
    if (!editId) return;

    setExams((prev) =>
      prev.map((e) => (e.id === editId ? { ...newExam, id: editId } : e))
    );

    setNewExam(emptyExam);
    setEditing(false);
    setEditId(null);
  };

  const handleDelete = (id: number) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backBtn}
        onClick={() => navigate("/home?type=professor")}
      >
        ⬅ Voltar
      </button>

      <h1 className={styles.title}> Gerenciar Provas</h1>

      <ExamFilters
        filters={filters}
        setFilters={setFilters}
        openCreateForm={() => setCreating(true)}
      />

      {creating && (
        <ExamCreateForm
          newExam={newExam}
          setNewExam={setNewExam}
          handleCreate={handleCreate}
          close={() => setCreating(false)}
        />
      )}

      {editing && (
        <ExamCreateForm
          newExam={newExam}
          setNewExam={setNewExam}
          handleCreate={handleEdit}
          close={() => setEditing(false)}
          isEdit
        />
      )}

      <ExamTable
        exams={exams}
        handleDelete={handleDelete}
        startEdit={startEdit}
      />
    </div>
  );
}
