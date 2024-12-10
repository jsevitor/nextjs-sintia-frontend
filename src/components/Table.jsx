import styles from "@/styles/components/Table.module.css";
import { useState } from "react";
import DetailModal from "./DatailModal";

const Table = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const currencyFormat = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const openModal = (contract) => {
    setSelectedContract(contract);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedContract(null);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableContent}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>N° Contrato</th>
              <th>Contratado</th>
              <th>CPF/CNPJ Contratado</th>
              <th>Unidade Contratante</th>
              <th>Objeto de Contrato</th>
              <th>Valor Contratado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((contract, index) => (
              <tr key={index}>
                <td className={""}>
                  <input type="checkbox" />
                </td>
                <td>{contract.contract_number || "N/A"}</td>
                <td>{contract.contractor_name || "N/A"}</td>
                <td>{contract.contracted_party_document || "N/A"}</td>
                <td>{contract.contracted_party_name || "N/A"}</td>
                <td>{contract.contract_object || "N/A"}</td>
                <td>{currencyFormat(contract.contract_value)}</td>
                <td>
                  <i
                    className="bi bi-search"
                    onClick={() => openModal(contract)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal de detalhes fora do fluxo de componentes */}
        <DetailModal
          isOpen={isOpen}
          onClose={closeModal}
          contract={selectedContract}
        />
      </div>
    </div>
  );
};

export default Table;
