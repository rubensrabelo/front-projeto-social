import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Turmas.module.css";

import TurmaCreateForm from "./components/TurmaForm";
import TurmasTable from "./components/TurmaTable";
import type { Turma } from "./types/TurmaType";
import { GetAllSchoolClassesService } from "../../api/services/school-classes/GetAllSchoolClassesService";
import { CreateSchoolClassService } from "../../api/services/school-classes/CreateSchoolClassService";
import { getUserSession } from "../../utils/session/getUserSession";

export default function Turmas() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [turmas, setTurmas] = useState<Turma[]>([]);

  const emptyTurma: Turma = {
    ano: 0,
    curso: "",
    alunos: [],
    professores: [],
  };

  const [creating, setCreating] = useState(false);
  const [newTurma, setNewTurma] = useState<Turma>(emptyTurma);

  useEffect(() => {
    const loadTurmas = async () => {
      try {
        const turmasFromApi = await GetAllSchoolClassesService();
        setTurmas(turmasFromApi);
      } catch (err) {
        alert("Erro ao carregar turmas");
      }
    };

    loadTurmas();
  }, []);

  const handleCreate = async () => {
    if (!newTurma.ano || !newTurma.curso) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const user = getUserSession();
      if (!user?.id) return;

      const payload = {
        turma: { ...newTurma },
        professores_id: newTurma.professores || [],
      };

      await CreateSchoolClassService(user.id, payload);
      const result = await GetAllSchoolClassesService();

      setTurmas(result);
      setNewTurma(emptyTurma);
      setCreating(false);
    } catch (err) {
      alert("Erro ao criar a turma");
    }
  };


  const startEdit = (e: Turma) => {
    setNewTurma({ ...e });
    setEditId(e._id ?? null);
    setEditing(true);
  };

  const handleEdit = () => {
    if (!editId) return;

    setTurmas((prev) =>
      prev.map((e) => (e._id === editId ? { ...newTurma, _id: editId } : e))
    );

    setNewTurma(emptyTurma);
    setEditing(false);
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    setTurmas((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backBtn}
        onClick={() => navigate("/home?type=coordenadores")}
      >
        ⬅ Voltar
      </button>

      <h1 className={styles.title}> Gerenciar Turmas</h1>

      <button className={styles.newBtn} onClick={() => setCreating(true)}>
        + Nova Turma
      </button>

      {creating && (
        <TurmaCreateForm
          newTurma={newTurma}
          setNewTurma={setNewTurma}
          handleCreate={handleCreate}
          close={() => setCreating(false)}
        />
      )}

      {editing && (
        <TurmaCreateForm
          newTurma={newTurma}
          setNewTurma={setNewTurma}
          handleCreate={handleEdit}
          close={() => setEditing(false)}
          isEdit
        />
      )}

      <TurmasTable
        turmas={turmas}
        handleDelete={handleDelete}
        startEdit={startEdit}
      />
    </div>
  );
}
