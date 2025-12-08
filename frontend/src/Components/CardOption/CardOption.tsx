import styles from "./CardOption.module.css";

type CardOptionProps = {
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  onClick?: () => void;
};

export default function CardOption({ title, Icon, onClick }: CardOptionProps) {
  return (
    <button className={styles.cardOption} onClick={onClick}>
      <Icon className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{title}</h3>
    </button>
  );
}
