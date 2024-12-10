import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <MainContent>
          <div className={styles.homeContent}>
            <div className={styles.welcomeIcon}>
              <img src="/file.svg" alt="Documento" />
            </div>
            <h2>Seja bem vindo(a), ao seu portal de análise de contratos</h2>
            <p>
              Arraste seus arquivos e pastas para cá ou use o botão "Enviar
              Arquivo" para fazer upload e começar a analisar.
            </p>
          </div>
        </MainContent>
      </div>
    </div>
  );
}
