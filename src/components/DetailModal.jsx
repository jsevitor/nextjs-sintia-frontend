import ReactDOM from "react-dom";
import styles from "@/styles/components/DetailModal.module.css";
import Image from "next/image";

const DetailModal = ({ isOpen, onClose, contract }) => {
  if (!isOpen) return null;

  // Bloqueia a rolagem do corpo ao abrir o modal
  document.body.style.overflow = "hidden";

  const handleClose = () => {
    document.body.style.overflow = "auto"; // Restaura a rolagem do corpo ao fechar o modal
    onClose(); // Chama a função para fechar o modal
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderContent}>
            <h1>
              INFORMAÇÕES <br /> <span>DO CONTRATO</span>
            </h1>
            <div className={styles.modalImg}>
              <Image
                src={"/search.svg"}
                width={200}
                height={200}
                alt="Imagem de busca"
              />
            </div>
          </div>
        </div>
        <div className={styles.modalBg}>
          <div className={styles.modalBody}>
            <div className={styles.infoSection}>
              <div className={styles.contractInfo}>
                <p className={styles.sectionName}>
                  <strong>CONTRATO</strong>
                </p>
                <div className={styles.contractInfo__um}>
                  <p className={styles.contractNumber}>
                    <strong>N° Contrato:</strong> {contract.contract_number}
                  </p>
                  <p className={styles.contractTerm}>
                    <strong>Vigência:</strong> {contract.contract_term}
                  </p>
                </div>
                <p className={styles.contractObject}>
                  <strong>Objeto do Contrato:</strong>{" "}
                  {contract.contract_object}
                </p>

                <p className={styles.contractValue}>
                  <strong>Valor Contratado: </strong>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(contract.contract_value)}
                </p>
              </div>

              {/* PARTE CONTRATADA */}
              <div className={styles.contractedPartyInfo}>
                <p className={styles.sectionName}>
                  <strong>PARTE CONTRATADA</strong>
                </p>
                <p className={styles.contractNumber}>
                  <strong>CNPJ:</strong> {contract.contracted_party_document}
                </p>
                <p className={styles.contractContractedParty}>
                  <strong>Contratado:</strong> {contract.contracted_party_name}
                </p>

                <p className={styles.contractRepresentativeParties}>
                  <strong>Representante:</strong>{" "}
                  {contract.contracted_party_representative}
                </p>
              </div>

              {/* UNIDADE CONTRATANTE */}
              <div className={styles.contractorInfo}>
                <p className={styles.sectionName}>
                  <strong>UNIDADE CONTRATANTE</strong>
                </p>
                <p className={styles.contractNumber}>
                  <strong>CNPJ:</strong> {contract.contractor_document}
                </p>
                <p className={styles.contractContractor}>
                  <strong>Contratante:</strong> {contract.contractor_name}
                </p>

                <p className={styles.contractRepresentativeParties}>
                  <strong>Representante:</strong>{" "}
                  {contract.contractor_representative}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
              onClick={handleClose}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body // Renderiza o modal diretamente no body
  );
};

export default DetailModal;
