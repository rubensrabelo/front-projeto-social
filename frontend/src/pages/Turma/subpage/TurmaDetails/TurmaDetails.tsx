import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TurmaDetails.module.css";

import AddTeacherModal from "./components/AddTeacherModal";
import { GetAllSchoolClassesByIdService } from "../../../../api/services/school-classes/GetSchoolClassesByIdService";
import AddStudentModal from "./components/AddStudentModal";
import { getUserSession } from "../../../../utils/session/getUserSession";

export default function TurmaDetails() {
    const { id } = useParams();
    const user = getUserSession();
    const navigate = useNavigate();

    const [turma, setTurma] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [showProfessores, setShowProfessores] = useState(true);
    const [showAlunos, setShowAlunos] = useState(true);

    const [addingTeacher, setAddingTeacher] = useState(false);
    const [addingStudent, setAddingStudent] = useState(false);

    const loadData = async () => {
        try {
            const data = await GetAllSchoolClassesByIdService(Number(id));
            setTurma(data.turma || data);
        } catch (err) {
            alert("Erro ao carregar detalhes da turma");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
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
                            <li key={p.id}>{p.nome}</li>
                        ))}
                    </ul>

                    <button
                        className={styles.addSmallBtn}
                        onClick={() => setAddingTeacher(true)}
                    >
                        + Adicionar Professor
                    </button>
                </div>

                {/* ALUNOS (vai implementar depois) */}
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
                        {turma.alunos?.map((aluno: any) => (
                            <li key={aluno}>
                                {aluno} — Matrícula: {aluno}
                            </li>
                        ))}
                    </ul>

                    <button
                        className={styles.addSmallBtn}
                        onClick={() => setAddingStudent(true)}
                    >
                        + Adicionar Aluno
                    </button>
                </div>
            </div>

            {addingTeacher && (
                <AddTeacherModal
                    idClass={Number(id)}
                    onClose={() => setAddingTeacher(false)}
                    reload={loadData}
                />
            )}

            {addingStudent && (
                <AddStudentModal
                    idClass={Number(id)}
                    idCoordinator={user.id}
                    onClose={() => setAddingStudent(false)}
                    reload={loadData}
                />
            )}
        </div>
    );
}
