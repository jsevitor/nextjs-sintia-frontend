import ResultCard from "@/components/ResultCard";
import { useContractContext } from "@/context/ContractContext";
import styles from "@/styles/pages/ResultsPage.module.css";

const ResultsPage = () => {
  const { analyzedCount, totalContractValue } = useContractContext();

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <ResultCard
          title="Total Contratos"
          value={analyzedCount}
          percentage="100%"
          description="&nbsp;a mais que o mês anterior"
        />
        <ResultCard
          title="Valor Total Contratos"
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalContractValue)}
          percentage="Aumento"
          description="&nbsp;no valor acumulado dos contratos"
        />
        <ResultCard
          title="Progresso em Relação à Meta"
          value={analyzedCount} // Progresso em %
          percentage="Valor total"
          description="&nbsp;Meta Restante"
          showProgress={true} // Ativa o gráfico de roda
        />
      </div>
    </div>
  );
};

export default ResultsPage;
