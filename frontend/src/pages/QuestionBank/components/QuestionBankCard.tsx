import styles from "../QuestionBank.module.css";

export default function QuestionBankCard({ bank, onClick }: any) {
  return (
    <div className={styles.bankCard} onClick={onClick}>
      <h3>Área: {bank.area}</h3>
      <p><strong>Ano:</strong> {bank.ano}</p>
      <p><strong>Bimestre:</strong> {bank.bimestre}º</p>
    </div>
  );
}
