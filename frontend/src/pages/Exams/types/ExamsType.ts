export interface Exam {
  id?: string;
  titulo: string;
  quantidade_questoes: number;
  turmas: number[];
  bimestre: number;
  area: string;
  dia_a_ser_realizada: string;
  hora_a_ser_liberada: string;
  banco_questao_id: number;
  questoes_id: number[];
  metodo_de_selecao_de_ap: string;
}
