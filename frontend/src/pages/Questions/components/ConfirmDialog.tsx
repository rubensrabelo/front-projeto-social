import styles from "../Questions.module.css";

interface ConfirmDialogProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title = "Confirmar ação",
  message,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <div className={styles.confirmOverlay}>
      <div className={styles.confirmBox}>
        <h2>{title}</h2>
        <p>{message}</p>

        <div className={styles.confirmButtons}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirmar
          </button>
          <button className={styles.confirmCancelBtn} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
