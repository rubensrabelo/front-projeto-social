import type { Teacher } from "../types/Teacher";

import styles from "../ManageTeacher.module.css";

interface props {
    newTeacher: Teacher,
    setNewTeacher: (e: Teacher) => void,
    handleCreate: () => void,
    close: () => void,
    isEdit?: boolean,
}

export default function TeacherCreateForm({
    newTeacher,
    setNewTeacher,
    handleCreate,
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
                </div>
            </div>
        </div>
    );
}