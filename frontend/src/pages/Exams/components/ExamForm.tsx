import { useState } from "react";
import styles from "../Exams.module.css";
import type { Exam } from "../types/ExamsType";
import QuestionSelectModal from "./QuestionSelectModal";

interface Props {
  newExam: Exam;
  setNewExam: (e: Exam) => void;
  handleCreate: () => void;
  close: () => void;
  isEdit?: boolean;
  questionBanks: any[];
}

export default function ExamCreateForm({
  newExam,
  setNewExam,
  handleCreate,
  close,
  isEdit = false,
  questionBanks
}: Props) {

  const [modalOpen, setModalOpen] = useState(false);

  const update = (field: keyof Exam, value: any) =>
    setNewExam({ ...newExam, [field]: value });

  const handleQuestionsSelected = (questionsIds: number[], bankId: number) => {
    update("questoes_id", questionsIds);
    update("banco_questao_id", bankId);
    setModalOpen(false);
  };

  return (
    <div className={styles.formPage}>
      <h2 className={styles.formTitle}>{isEdit ? "Editar Prova" : "Criar Nova Prova"}</h2>

      <input type="text" placeholder="Título"
        value={newExam.titulo} onChange={(e) => update("titulo", e.target.value)} />

      <input type="number" placeholder="Quantidade de Questões"
        value={newExam.quantidade_questoes || ""} onChange={(e) => update("quantidade_questoes", Number(e.target.value))} />

      <select value={newExam.bimestre} onChange={(e) => update("bimestre", Number(e.target.value))}>
        <option value="">Bimestre</option>
        <option value={1}>1º</option>
        <option value={2}>2º</option>
        <option value={3}>3º</option>
        <option value={4}>4º</option>
      </select>

      <select value={newExam.area} onChange={(e) => update("area", e.target.value)}>
        <option value="">Disciplina</option>
        {/* ... opcoes ... */}
      </select>

      <input type="date" value={newExam.dia_a_ser_realizada}
        onChange={(e) => update("dia_a_ser_realizada", e.target.value)} />

      <input type="time" value={newExam.hora_a_ser_liberada}
        onChange={(e) => update("hora_a_ser_liberada", e.target.value)} />

      {/* BOTÃO PARA ABRIR MODAL */}
      <button className={styles.openModalBtn} onClick={() => setModalOpen(true)}>
        Selecionar Questões
      </button>

      {/* LISTA DE QUESTÕES ESCOLHIDAS */}
      {newExam.questoes_id.length > 0 && (
        <div className={styles.selectedContainer}>
          <h4>Questões Selecionadas:</h4>
          {newExam.questoes_id.map((q) => (
            <p key={q}>Questão #{q}</p>
          ))}
        </div>
      )}

      <div className={styles.formActions}>
        <button className={styles.cancelBtn} onClick={close}>Cancelar</button>
        <button className={styles.saveBtn} onClick={handleCreate}>
          {isEdit ? "Salvar Alterações" : "Salvar"}
        </button>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <QuestionSelectModal
          close={() => setModalOpen(false)}
          banks={questionBanks}
          onConfirm={handleQuestionsSelected}
        />
      )}
    </div>
  );
}
