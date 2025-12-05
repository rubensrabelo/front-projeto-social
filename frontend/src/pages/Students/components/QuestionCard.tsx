// components/QuestionCard.tsx
import styles from "../AnswerExamPage.module.css";

interface Props {
  question: {
    id: number | null;
    enunciado: string;
    alternativa_a: string;
    alternativa_b: string;
    alternativa_c: string;
    alternativa_d: string;
    alternativa_e: string;
  };
  selected?: string; // alternativa escolhida
  onSelect: (alt: string) => void;
}

export default function QuestionCard({ question, selected, onSelect }: Props) {
  const alternativas = [
    { key: "a", texto: question.alternativa_a },
    { key: "b", texto: question.alternativa_b },
    { key: "c", texto: question.alternativa_c },
    { key: "d", texto: question.alternativa_d },
    { key: "e", texto: question.alternativa_e },
  ];

  return (
    <div className={styles.questionBox}>
      <p className={styles.questionText}>
        {question.id} — {question.enunciado}
      </p>

      {alternativas.map((alt) => (
        <label key={alt.key} className={styles.option}>
          <input
            type="radio"
            name={`q-${question.id}`}
            checked={selected === alt.key}
            onChange={() => onSelect(alt.key)}
          />
          <span>{alt.texto}</span>
        </label>
      ))}
    </div>
  );
}
