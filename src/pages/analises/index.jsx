import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ResultCards from "@/components/ResultsPage";
import Table from "@/components/Table";
import MainContent from "@/components/MainContent";
import { useEffect, useState } from "react";

import styles from "@/styles/pages/Analises.module.css";
import api from "@/services/api";

export default function Analises() {
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dbData, setDbData] = useState(null);

  const fetchDbData = async () => {
    try {
      const response = await api.get("/contracts");

      // Verifica se os dados retornados são um array, senão transforma em array
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setDbData(data); // Agora dbData será sempre um array
    } catch (error) {
      console.error("Erro ao buscar contratos:", error);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSelectAll = (event) => {
    const updatedCheckedState = new Array(data.length).fill(
      event.target.checked
    );
    setCheckedState(updatedCheckedState);
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
              </span>
            </div>
          </div>
          <Table data={dbData || []} />
        </MainContent>
      </div>
    </div>
  );
}
