import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../Exams.module.css";
import type { Exam } from "../types/ExamsType";
import { getUserSession } from "../../../utils/session/getUserSession";
import { GetAllQuestionBankService } from "../../../api/services/QuestionBank/GetAllQuestionBankService";
import { UpdateExamService } from "../../../api/services/exams/DeleteExamService";
import { CreateExamService } from "../../../api/services/exams/CreateExamService";
import ExamCreateForm from "../components/ExamForm";


export default function ExamCreatePage() {
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = Boolean(params.id);

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

  const [exam, setExam] = useState<Exam>(emptyExam);
  const [questionBanks, setQuestionBanks] = useState([]);

  useEffect(() => {
    const loadBanks = async () => {
      const user = getUserSession();
      const id = user.id;

      try {
        const banks = await GetAllQuestionBankService(id);
        setQuestionBanks(banks);
      } catch {
        alert("Erro carregando bancos de questões.");
      }
    };

    loadBanks();
  }, []);

  useEffect(() => {
    if (isEdit) {
      const saved = sessionStorage.getItem("editing_exam");
      if (saved) {
        setExam(JSON.parse(saved));
      }
    }
  }, [isEdit]);

  const save = async () => {
    const user = getUserSession();
    const teacherId = user.id;

    try {
      if (isEdit) {
        await UpdateExamService(teacherId, params.id!, exam);
      } else {
        await CreateExamService(teacherId, exam);
      }

      navigate("/exams");
    } catch {
      alert("Erro ao salvar prova");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate("/exams")}>
        ⬅ Voltar
      </button>

      <ExamCreateForm
        newExam={exam}
        setNewExam={setExam}
        handleCreate={save}
        close={() => navigate("/exams")}
        isEdit={isEdit}
        questionBanks={questionBanks}
      />
    </div>
  );
}
