import { useNavigate } from "react-router-dom";
import styles from "./ManageTeacher.module.css";
import { useEffect, useState } from "react";
import type { Teacher } from "./types/Teacher";
import TeacherCreateForm from "./components/TeacherCreateForm";
import TeacherTable from "./components/TeacherTable";
import { getUserSession } from "../../utils/session/getUserSession";
import { GetAllTeacherService } from "../../api/services/teacher/GetAllTeacherService";
import { CreateTeacherService } from "../../api/services/teacher/CreateTeacherService";
import { UpdateTeacherService } from "../../api/services/teacher/UpdateTeacherService";
import { DeleteTeacherService } from "../../api/services/teacher/DeleteTeacherService";
import ConfirmDeleteTurma from "./components/ConfirmDialog";

export default function ManageTeacher() {
    const navigate = useNavigate();

    const emptyTeacher = {
        nome: "",
        matricula: 0,
        senha: "",
        materia_ensinada: "",
    }

    const [teacher, setTeacher] = useState<Teacher[]>([]);
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(false);
    const [newTeacher, setNewTeacher] = useState<Teacher>(emptyTeacher);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
    const [error, setError] = useState<string>("");

    async function loadTeacher() {
        try {
            const data = getUserSession();
            const teacherApi = await GetAllTeacherService(data.id);

            setTeacher(teacherApi);
        } catch (err) {
            setError("Erro ao carregar professores.")
        }
    }

    useEffect(() => {
        loadTeacher();
    }, []);

    async function handleCreate() {
        if (!newTeacher.nome || !newTeacher.matricula) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            const data = getUserSession();
            const payload = {
                nome: newTeacher.nome,
                matricula: newTeacher.matricula,
                senha: newTeacher.senha,
                materia_ensinada: newTeacher.materia_ensinada,
            };

            await CreateTeacherService(data.id, payload);
            const result = await GetAllTeacherService(data.id);

            setTeacher(result);
            setNewTeacher(emptyTeacher);
            setCreating(false);
        } catch (err) {
            setError("Erro ao criar o professor");
        }
    }

    const startEdit = (teacher: Teacher) => {
        setNewTeacher(teacher);
        setEditing(true);
    };

    const handleEdit = async () => {
        if (!newTeacher.id) return setError("Erro: turma sem ID");

        const data = getUserSession();

        const payload = {
            nome: newTeacher.nome,
            matricula: newTeacher.matricula,
            materia_ensinada: newTeacher.materia_ensinada,
        };

        await UpdateTeacherService(data.id, newTeacher.id, payload);
        await loadTeacher();
        setEditing(false);
        setNewTeacher(emptyTeacher);
    };

    // DELETE
    const handleDelete = (teacher: Teacher) => {
        setTeacherToDelete(teacher);
        setConfirmOpen(true);
    };

    async function confirmDeletion() {
        if (!teacherToDelete?.id) return;

        try {
            const data = getUserSession();
            await DeleteTeacherService(data.id, teacherToDelete.id);
            setTeacher(prev => prev.filter(t => t.id !== teacherToDelete.id));
        } catch (error) {
            setError("Erro ao deletar turma!");
        }

        setConfirmOpen(false);
        setTeacherToDelete(null);
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => navigate("/home?type=coordenadores")}
            >
                ⬅ Voltar
            </button>

            <h1 className={styles.title}>Gerenciar Professores</h1>

            <button
                className={styles.newBtn}
                onClick={() => setCreating(true)}
            >
                + Professor
            </button>

            {creating && (
                <TeacherCreateForm
                    newTeacher={newTeacher}
                    setNewTeacher={setNewTeacher}
                    handleCreate={handleCreate}
                    error={error}
                    close={() => {setError(""), setCreating(false)}}
                />
            )}

            <TeacherTable
                teacher={teacher}
                handleDelete={handleDelete}
                startEdit={startEdit}
            />

            {editing && (
                <TeacherCreateForm
                    newTeacher={newTeacher}
                    setNewTeacher={setNewTeacher}
                    handleCreate={handleEdit}
                    error={error}
                    close={() => {setError(""), setEditing(false)}}
                    isEdit
                />
            )}


            {confirmOpen && (
                <ConfirmDeleteTurma
                    teacherName={teacherToDelete?.nome}
                    onConfirm={confirmDeletion}
                    onCancel={() => setConfirmOpen(false)}
                />
            )}
        </div>
    );
}