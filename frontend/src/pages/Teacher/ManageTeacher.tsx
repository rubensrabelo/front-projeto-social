import { useNavigate } from "react-router-dom";
import styles from "./ManageTeacher.module.css";
import { useEffect, useState } from "react";
import type { Teacher } from "./types/Teacher";
import TeacherCreateForm from "./components/TeacherCreateForm";
import TeacherTable from "./components/TeacherTable";
import { getUserSession } from "../../utils/session/getUserSession";
import { GetAllTeacherService } from "../../api/services/teacher/GetAllTeacherService";
import { CreateTeacherService } from "../../api/services/teacher/CreateTeacherService";

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
    const [newTeacher, setNewTeacher] = useState<Teacher>(emptyTeacher);

    useEffect(() => {
        async function loadTeacher() {
            try {
                const data = getUserSession();
                const teacherApi = await GetAllTeacherService(data.id);

                setTeacher(teacherApi);
            } catch (err) {
                alert("Erro ao carregar professores.")
            }
        }

        loadTeacher();
    }, []);

    async function handleCreate() {
        if(!newTeacher.nome || !newTeacher.matricula) {
            alert("Preencha todos os campos.");
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
            alert("Erro ao criar o professor");
        }
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
                close={() => setCreating(false)}
                 />
            )}

            <TeacherTable
            teacher={teacher}
            />
        </div>
    );
}