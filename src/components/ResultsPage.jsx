import ResultCard from "@/components/ResultCard";
import styles from "@/styles/pages/ResultsPage.module.css";

const ResultsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <ResultCard
          title="Total Contratos"
          value="1"
          percentage="100%"
          description="Mais que o mês anterior"
        />
        <ResultCard
          title="Valor Total Contratos"
          value="R$ 410k"
          percentage="100%"
          description="Aumento"
        />
        <ResultCard
          title="Progresso em Relação à Meta"
          value="14%"
          percentage="Meta Restante"
          description="Meta Restante"
        />
      </div>
    </div>
  );
};

export default ResultsPage;
