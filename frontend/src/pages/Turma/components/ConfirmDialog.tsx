import styles from "./ConfirmDialog.module.css";

interface ConfirmDeleteTurmaProps {
  turmaNome?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteTurma({
  turmaNome = "esta turma",
  onConfirm,
  onCancel
}: ConfirmDeleteTurmaProps) {
  return (
    <div className={styles.confirmOverlay}>
      <div className={styles.confirmBox}>
        <h2>Excluir Turma</h2>

        <p>
          Tem certeza que deseja excluir <strong>{turmaNome}</strong>?
          <br />
          Esta ação não pode ser desfeita.
        </p>

        <div className={styles.confirmButtons}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirmar
          </button>

          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
