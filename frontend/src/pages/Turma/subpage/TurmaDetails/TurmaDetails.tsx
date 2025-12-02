import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../TurmaDetails/TurmaDetails.module.css";
import { GetAllSchoolClassesByIdService } from "../../../../api/services/school-classes/GetSchoolClassesByIdService";

export default function TurmaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turma, setTurma] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showProfessores, setShowProfessores] = useState(true);
  const [showAlunos, setShowAlunos] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await GetAllSchoolClassesByIdService(Number(id));
        setTurma(data.turma || data);
      } catch (err) {
        alert("Erro ao carregar detalhes da turma");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <h2>Carregando...</h2>;
  if (!turma) return <h2>Turma não encontrada</h2>;

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate("/turmas")}>
        ⬅ Voltar
      </button>

      <h1 className={styles.title}>Detalhes da Turma</h1>

      <div className={styles.card}>
        <p><strong>Ano:</strong> {turma.ano}</p>
        <p><strong>Curso:</strong> {turma.curso}</p>

        {/* PROFESSORES */}
        <button
          className={styles.toggleBtn}
          onClick={() => setShowProfessores((prev) => !prev)}
        >
          Professores ({turma.professores?.length})
          <span>{showProfessores ? "▲" : "▼"}</span>
        </button>

        <div
          className={styles.sectionContent}
          style={{ maxHeight: showProfessores ? "500px" : "0px" }}
        >
          <ul className={styles.sectionList}>
            {turma.professores?.map((p: any) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* ALUNOS */}
        <button
          className={styles.toggleBtn}
          onClick={() => setShowAlunos((prev) => !prev)}
        >
          Alunos ({turma.alunos?.length})
          <span>{showAlunos ? "▲" : "▼"}</span>
        </button>

        <div
          className={styles.sectionContent}
          style={{ maxHeight: showAlunos ? "500px" : "0px" }}
        >
          <ul className={styles.sectionList}>
            {turma.alunos?.map((a: any) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
