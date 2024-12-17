import { useEffect, useState } from "react";
import { useContractContext } from "@/context/ContractContext";
import Header from "@/components/Header";
import Table from "@/components/Table";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import ResultCards from "@/components/ResultsPage";
import ConfirmDeleteModal from "@/components/ConfirmModal";

import api from "@/services/api";
import styles from "@/styles/pages/Analises.module.css";
import toast from "react-hot-toast";

export default function Analises() {
  const [selectedContracts, setSelectedContracts] = useState([]); // Estado para os contratos selecionados
  const [selectAllChecked, setSelectAllChecked] = useState(false); // Estado para controlar o checkbox "Selecionar todos"
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar se o modal está aberto
  const [contractsToDelete, setContractsToDelete] = useState([]); // Estado para armazenar os contratos a serem deletados
  const { updateContracts, contracts } = useContractContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Número de itens por página

  const fetchDbData = async () => {
    try {
      const response = await api.get("/contracts");
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      updateContracts(data); // Atualiza o estado do contexto
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  // Lógica de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contracts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(contracts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Função para selecionar/deselecionar contratos
  const handleCheckboxChange = (contractId, isChecked) => {
    setSelectedContracts((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, contractId];
      } else {
        return prevSelected.filter((id) => id !== contractId);
      }
    });
  };

  // Função para chamar a exclusão e abrir o modal
  const handleDeleteContracts = () => {
    if (selectedContracts.length === 0) {
      // Exibe um toast de erro se nenhum contrato for selecionado
      toast.error("Nenhum contrato selecionado!");
    } else {
      // Caso contrário, exibe o modal de confirmação
      setContractsToDelete(selectedContracts);
      setIsModalOpen(true);
    }
  };

  // Função para excluir os contratos quando confirmado
  const confirmDeleteContracts = async () => {
    try {
      await api.delete("/contracts", {
        data: { ids: contractsToDelete },
      });

      toast.success("Deletado com sucesso!"), { duration: 3000 };
      fetchDbData();
      setSelectedContracts([]);
      setIsModalOpen(false); // Fecha o modal após a exclusão
      setContractsToDelete([]); // Limpa a lista de contratos a serem deletados
    } catch (error) {
      toast.error("Erro ao deletar contratos");
      console.error("Erro ao deletar contratos:", error);
      setIsModalOpen(false); // Fecha o modal em caso de erro
    }
  };

  // Função para fechar o modal sem excluir
  const closeModal = () => {
    setIsModalOpen(false);
    setContractsToDelete([]);
  };

  // Função para atualizar a tabela
  const handleTableUpdate = () => {
    fetchDbData();
    toast.success("Atualizado com sucesso!");
  };

  // Função para selecionar/deselecionar todos os contratos
  const handleSelectAllChange = (isChecked) => {
    setSelectAllChecked(isChecked); // Atualiza o estado de "Selecionar todos"

    if (isChecked) {
      // Se "Selecionar todos" estiver marcado, selecionar todos os contratos da tabela
      const allContractIds = currentItems.map((contract) => contract.id);
      setSelectedContracts(allContractIds);
    } else {
      // Caso contrário, desmarcar todos os contratos
      setSelectedContracts([]);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <ResultCards />
        <MainContent>
          <div className={styles.analiseContainer}>
            <div className={styles.analiseFilters}>
              <input
                type="checkbox"
                checked={selectAllChecked} // O checkbox "Selecionar todos" será marcado/desmarcado com base no estado
                onChange={(e) => handleSelectAllChange(e.target.checked)} // Atualiza o estado de "Selecionar todos"
              />
              <span className={styles.updateFilter}>
                <i
                  className="bi bi-arrow-counterclockwise"
                  onClick={handleTableUpdate}
                ></i>
                <i
                  className="bi bi-trash"
                  onClick={handleDeleteContracts} // Chama a função de deletar
                ></i>
              </span>
            </div>
          </div>
          <Table
            data={currentItems} // Passando os itens filtrados pela página
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onCheckboxChange={handleCheckboxChange} // Passando a função para a tabela
            selectedContracts={selectedContracts} // Passando os contratos selecionados
          />
        </MainContent>
      </div>

      {/* Modal de confirmação */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDeleteContracts}
      />
    </div>
  );
}
