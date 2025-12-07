import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TurmaDetails.module.css";
import AddTeacherModal from "./components/AddTeacherModal";
import { GetAllSchoolClassesByIdService } from "../../../../api/services/school-classes/GetSchoolClassesByIdService";
import AddStudentModal from "./components/AddStudentModal";
import { getUserSession } from "../../../../utils/session/getUserSession";
import PersonItem from "./components/PersonItem";

export default function TurmaDetails() {
    const { id } = useParams();
    const user = getUserSession();
    const navigate = useNavigate();

    const [turma, setTurma] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [showProfessores, setShowProfessores] = useState(false);
    const [showAlunos, setShowAlunos] = useState(false);

    const [addingTeacher, setAddingTeacher] = useState(false);
    const [addingStudent, setAddingStudent] = useState(false);

    const loadData = async () => {
        try {
            const data = await GetAllSchoolClassesByIdService(Number(id));
            setTurma(data.turma || data);
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

                <button
                    className={styles.toggleBtn}
                    onClick={() => setShowProfessores(prev => !prev)}
                >
                    Professores ({turma.professores?.length})
                    <span>{showProfessores ? "▲" : "▼"}</span>
                </button>

                <div
                    className={styles.sectionContent}
                    style={{ maxHeight: showProfessores ? "320px" : "0px" }}
                >
                    <ul className={styles.sectionList}>
                        {turma.professores?.map((p: any) => (
                            <PersonItem
                                key={typeof p === "string" ? p : p._id}
                                id={typeof p === "string" ? p : p._id}
                                type="professor"
                                data={typeof p === "object" ? p : undefined}
                            />
                        ))}
                    </ul>
                </div>

                <button
                    className={styles.addSmallBtn}
                    onClick={() => setAddingTeacher(true)}
                >
                    + Adicionar Professor
                </button>

                <button
                    className={styles.toggleBtn}
                    onClick={() => setShowAlunos(prev => !prev)}
                >
                    Alunos ({turma.alunos?.length})
                    <span>{showAlunos ? "▲" : "▼"}</span>
                </button>

                <div
                    className={styles.sectionContent}
                    style={{ maxHeight: showAlunos ? "320px" : "0px" }}
                >
                    <ul className={styles.sectionList}>
                        {turma.alunos?.map((idAluno: string) => (
                            <PersonItem key={idAluno} id={idAluno} type="aluno" />
                        ))}
                    </ul>
                </div>

                <button
                    className={styles.addSmallBtn}
                    onClick={() => setAddingStudent(true)}
                >
                    + Adicionar Aluno
                </button>
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
