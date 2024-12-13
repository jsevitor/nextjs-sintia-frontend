import styles from "@/styles/components/Table.module.css";
import { useState } from "react";
import DetailModal from "./DatailModal";
import { useContractContext } from "@/context/ContractContext";
import api from "@/services/api";

const Table = ({ data, currentPage, totalPages, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteContract } = useContractContext();

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

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((id) => id !== index)
        : [...prevSelected, index]
    );
  };

  // Função para deletar o contrato
  const handleDelete = async (contractId) => {
    try {
      await api.delete(`/contracts/${contractId}`); // Chamada ao backend
      deleteContract(contractId); // Remove o contrato do estado global
      alert("Contrato deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar contrato:", error);
      alert("Erro ao deletar contrato. Tente novamente.");
    }
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
              <tr
                key={index}
                className={
                  selectedRows.includes(index) ? styles.selectedRow : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{contract.contract_number || "N/A"}</td>
                <td>{contract.contracted_party_name || "N/A"}</td>
                <td>{contract.contracted_party_document || "N/A"}</td>
                <td>{contract.contractor_name || "N/A"}</td>
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

        <DetailModal
          isOpen={isOpen}
          onClose={closeModal}
          contract={selectedContract}
        />
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="bi bi-caret-left-fill"></i>
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="bi bi-caret-right-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default Table;
