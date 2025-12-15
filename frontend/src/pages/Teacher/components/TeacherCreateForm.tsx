import type { Teacher } from "../types/Teacher";

import styles from "../ManageTeacher.module.css";

interface props {
    newTeacher: Teacher,
    setNewTeacher: (e: Teacher) => void,
    handleCreate: () => void,
    error: string,
    close: () => void,
    isEdit?: boolean,
}

export default function TeacherCreateForm({
    newTeacher,
    setNewTeacher,
    handleCreate,
    error,
    close,
    isEdit = false,
}: props) {
    const update = (field: keyof Teacher, value: any) => {
        setNewTeacher({ ...newTeacher, [field]: value });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <div className={styles.modalScroll}>
                    <h2 className={styles.modalTitle}>
                        {isEdit ? "Editar Professor" : "Criar Professor"}
                    </h2>

                    <input
                        placeholder="Nome"
                        value={newTeacher.nome || ""}
                        onChange={(e) => update("nome", e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="matricula"
                        value={newTeacher.matricula || ""}
                        onChange={(e) => update("matricula", Number(e.target.value))}
                    />

                    <input
                        placeholder="senha"
                        value={newTeacher.senha || ""}
                        onChange={(e) => update("senha", e.target.value)}
                    />

                    <select
                        value={newTeacher.materia_ensinada || ""}
                        onChange={(e) => update("materia_ensinada", e.target.value)}
                    >
                        <option value="">Selecione a Matéria</option>
                        <option value="Português">Português</option>
                        <option value="Matemática">Matemática</option>
                        <option value="Física">Física</option>
                        <option value="Química">Química</option>
                        <option value="História">História</option>
                        <option value="Geografia">Geografia</option>
                    </select>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </div>


                <div className={styles.modalActions}>
                    <button className={styles.modalCancel} onClick={close}>
                        Cancelar
                    </button>
                    <button className={styles.modalSave} onClick={handleCreate}>
                        {isEdit ? "Salvar Alterações" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    );
}