import styles from "@/styles/components/ConfirmModal.module.css";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Confirmar exclusão dos itens selecionados?</h2>
          <p>Após a exclusão, não será possível recuperar os itens.</p>
        </div>
        <div className={styles.modalActions}>
          <button
            className={styles.cancelButton}
            onClick={onClose} // Fecha o modal sem excluir
          >
            Cancelar
          </button>
          <button
            className={styles.confirmButton}
            onClick={onConfirm} // Chama a função para confirmar a exclusão
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
