import { createContext, useContext, useState, useMemo } from "react";

// Criação do Contexto
const ContractContext = createContext();

// Provedor do Contexto
export const ContractProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [analyzedCount, setAnalyzedCount] = useState(0);

  // Função para atualizar os contratos e o contador de contratos analisados
  const updateContracts = (newContracts) => {
    setContracts(newContracts);
    setAnalyzedCount(newContracts.length);
  };

  // Calcula o valor total dos contratos
  const totalContractValue = useMemo(() => {
    return contracts.reduce(
      (total, contract) => total + (contract.contract_value || 0),
      0
    );
  }, [contracts]);

  return (
    <ContractContext.Provider
      value={{ contracts, analyzedCount, totalContractValue, updateContracts }}
    >
      {children}
    </ContractContext.Provider>
  );
};

// Hook para usar o contexto
export const useContractContext = () => useContext(ContractContext);
