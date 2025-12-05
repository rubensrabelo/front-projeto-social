import { useEffect, useState } from "react";
import styles from "./AnswerExamPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "././components/QuestionCard"
import type { Question } from "../Questions/types/QuestionType";

export default function AnswerExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos

  // Chamar a API para buscar as questões da prova
  useEffect(() => {
    setQuestions([
      {
        id: 1,
        enunciado: "Quanto vale a raiz quadrada de 16?",
        alternativa_a: "6",
        alternativa_b: "8",
        alternativa_c: "4",
        alternativa_d: "2",
        alternativa_e: "4",
        materia: "Matemática",
        correta: "c",
        banco_questao_id: 1,
        nivel_de_dificuldade: "fácil"
      },
      {
        id: 2,
        enunciado: "Qual é o resultado de 7 × 8?",
        alternativa_a: "54",
        alternativa_b: "56",
        alternativa_c: "48",
        alternativa_d: "58",
        alternativa_e: "60",
        materia: "Matemática",
        correta: "b",
        banco_questao_id: 1,
        nivel_de_dificuldade: "fácil"
      },
      {
        id: 3,
        enunciado: "Qual é o valor de 25 ÷ 5?",
        alternativa_a: "4",
        alternativa_b: "6",
        alternativa_c: "3",
        alternativa_d: "5",
        alternativa_e: "8",
        materia: "Matemática",
        correta: "d",
        banco_questao_id: 1,
        nivel_de_dificuldade: "fácil"
      },
      {
        id: 4,
        enunciado: "Qual é o próximo número da sequência: 2, 4, 6, 8, ...?",
        alternativa_a: "9",
        alternativa_b: "10",
        alternativa_c: "12",
        alternativa_d: "14",
        alternativa_e: "16",
        materia: "Matemática",
        correta: "b",
        banco_questao_id: 1,
        nivel_de_dificuldade: "fácil"
      },
      {
        id: 5,
        enunciado: "Quanto é 12 + 15?",
        alternativa_a: "27",
        alternativa_b: "28",
        alternativa_c: "25",
        alternativa_d: "30",
        alternativa_e: "32",
        materia: "Matemática",
        correta: "a",
        banco_questao_id: 1,
        nivel_de_dificuldade: "fácil"
      }

    ]);
  }, []);

  // Timer
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const handleSelect = (qid: number, letra: string) => {
    setAnswers({ ...answers, [qid]: letra });
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const finalize = () => {
    navigate(`/student/examResult/${examId}`);
  };

  return (
    <div className={styles.container}>

      {/* BLOCO DE QUESTÕES */}
      <div className={styles.questionsArea}>
        <h2 className={styles.examTitle}>Prova de Matemática 1</h2>

        {questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              selected={answers[q.id!]}
              onSelect={(alt) => handleSelect(q.id!, alt)}
            />
          ))}

        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          Anterior
        </button>
      </div>

      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <div className={styles.progressCard}>
          <h3>Progresso</h3>
          <p className={styles.progressCount}>
            {Object.keys(answers).length}/{questions.length}
          </p>

          <h3>Tempo Restante</h3>
          <p className={styles.timer}>{formatTime(timeLeft)}</p>

          <button className={styles.finishBtn} onClick={finalize}>
            Finalizar prova
          </button>
        </div>
      </div>

    </div>
  );
}