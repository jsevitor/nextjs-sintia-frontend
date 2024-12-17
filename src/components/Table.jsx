import { useState } from "react";
import DetailModal from "./DetailModal";
import { useContractContext } from "@/context/ContractContext";
import api from "@/services/api";
import styles from "@/styles/components/Table.module.css";

const Table = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
  onCheckboxChange,
  selectedContracts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  // Estado para armazenar a ordenação
  const [sortConfig, setSortConfig] = useState({
    key: "contract_number", // Coluna inicial para ordenar
    direction: "asc", // Direção da ordenação (ascendente)
  });

  const currencyFormat = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleCheckboxChange = (event, contractId) => {
    onCheckboxChange(contractId, event.target.checked);
  };

  const openModal = (contract) => {
    setSelectedContract(contract);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedContract(null);
  };

  // Função para aplicar a ordenação
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Função para ordenar os dados
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableContent}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th onClick={() => handleSort("contract_number")}>
                N° Contrato{" "}
                {sortConfig.key === "contract_number" ? (
                  sortConfig.direction === "asc" ? (
                    <i className="bi bi-arrow-up-short"></i>
                  ) : (
                    <i className="bi bi-arrow-down-short"></i>
                  )
                ) : (
                  <i className="bi bi-arrow-up-down"></i>
                )}
              </th>
              <th onClick={() => handleSort("contracted_party_name")}>
                Contratado{" "}
                {sortConfig.key === "contracted_party_name" ? (
                  sortConfig.direction === "asc" ? (
                    <i className="bi bi-arrow-up-short"></i>
                  ) : (
                    <i className="bi bi-arrow-down-short"></i>
                  )
                ) : (
                  <i className="bi bi-arrow-up-down"></i>
                )}
              </th>
              <th>CPF/CNPJ Contratado</th>
              <th>Unidade Contratante</th>
              <th>Objeto de Contrato</th>
              <th onClick={() => handleSort("contract_value")}>
                Valor Contratado{" "}
                {sortConfig.key === "contract_value" ? (
                  sortConfig.direction === "asc" ? (
                    <i className="bi bi-arrow-up-short"></i>
                  ) : (
                    <i className="bi bi-arrow-down-short"></i>
                  )
                ) : (
                  <i className="bi bi-arrow-up-down"></i>
                )}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((contract) => {
              const isSelected = selectedContracts.includes(contract.id);

              return (
                <tr
                  key={contract.id}
                  className={isSelected ? styles.selectedRow : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(event) =>
                        handleCheckboxChange(event, contract.id)
                      }
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
              );
            })}
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
