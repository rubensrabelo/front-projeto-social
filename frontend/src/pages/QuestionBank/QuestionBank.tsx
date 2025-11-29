import { useState } from "react";
import styles from "./QuestionBank.module.css";
import { createQuestionBank } from "../../api/services/QuestionBank/CreateQuestionBankService";

export default function QuestionBank() {
  const [banks, setBanks] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    bimestre: "",
    ano: "",
    area: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id_professor = user?.id;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreate() {
    if (!form.bimestre || !form.ano || !form.area) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const body = {
        bimestre: Number(form.bimestre),
        ano: Number(form.ano),
        area: form.area
      };

      await createQuestionBank(id_professor, body);

      const newBank = {
        id: banks.length + 1,
        ...body
      };

      setBanks([...banks, newBank]);
      setCreating(false);
      setForm({ bimestre: "", ano: "", area: "" });

    } catch (err: any) {
      alert(err.message || "Erro ao criar banco.");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bancos de Questões</h1>

      <button className={styles.createBtn} onClick={() => setCreating(true)}>
        + Criar Banco de Questões
      </button>

      <div className={styles.list}>
        {banks.length === 0 && <p>Nenhum banco criado ainda.</p>}

        {banks.map((b) => (
          <div key={b.id} className={styles.bankCard}>
            <h3>Área: {b.area}</h3>
            <p><strong>Ano:</strong> {b.ano}</p>
            <p><strong>Bimestre:</strong> {b.bimestre}º</p>
          </div>
        ))}
      </div>

      {creating && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2 className={styles.modalTitle}>Criar Banco de Questões</h2>

            <input
              name="ano"
              placeholder="Ano"
              type="number"
              value={form.ano}
              onChange={handleChange}
            />

            <input
              name="bimestre"
              placeholder="Bimestre"
              type="number"
              value={form.bimestre}
              onChange={handleChange}
            />

            <input
              name="area"
              placeholder="Área"
              value={form.area}
              onChange={handleChange}
            />

            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setCreating(false)}>
                Cancelar
              </button>

              <button className={styles.modalSave} onClick={handleCreate}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
