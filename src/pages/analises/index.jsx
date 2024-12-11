import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ResultCards from "@/components/ResultsPage";
import Table from "@/components/Table";
import MainContent from "@/components/MainContent";
import { useEffect, useState } from "react";

import styles from "@/styles/pages/Analises.module.css";
import api from "@/services/api";
import { useContractContext } from "@/context/ContractContext";

export default function Analises() {
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dbData, setDbData] = useState(null);

  const { updateContracts, contracts } = useContractContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Número de itens por página

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

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleTableUpdate = () => {
    fetchDbData();
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
              <input type="checkbox" />
              <span className={styles.updateFilter}>
                <i
                  className="bi bi-arrow-counterclockwise"
                  onClick={handleTableUpdate}
                ></i>
                <i className="bi bi-trash"></i>
              </span>
            </div>
          </div>
          <Table
            data={currentItems} // Passando os itens filtrados pela página
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </MainContent>
      </div>
    </div>
  );
}
