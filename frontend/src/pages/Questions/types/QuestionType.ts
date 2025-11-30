export interface QuestionPayload {
  enunciado: string;
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  alternativa_e: string;
  materia: string;
  correta: string;
  banco_questao_id: number;
  nivel_de_dificuldade: string;
}

export interface Question {
  id?: number | null;

  statement: string;
  subject: string;
  correct: string;
  difficulty: string;

  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
}
