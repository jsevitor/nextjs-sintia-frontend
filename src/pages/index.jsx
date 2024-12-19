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
            <div className={styles.welcomeContent}>
              <h2>Bem-vindo(a) ao seu portal de análise de contratos!</h2>
              <p>
                Sintia é sua assistente para simplificar a análise contratos com
                inteligência artificial.
              </p>
              <p style={{ marginTop: "1.5rem" }}>
                Use o botão <strong>"Enviar Arquivo"</strong> para fazer upload
                de um arquivo PDF e começar a analisar.
              </p>
            </div>
          </div>
        </MainContent>
      </div>
    </div>
  );
}
