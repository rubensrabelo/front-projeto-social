import styles from "./CardOption.module.css";

type CardOptionProps = {
  title: string;
  image: string;
  onClick?: () => void;
};

export default function CardOption({ title, image, onClick }: CardOptionProps) {
  return (
    <button className={styles.cardOption} onClick={onClick}>
      <img src={image} alt={title} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{title}</h3>
    </button>
  );
}
