export type Question = {
  id: number | null;
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
};
