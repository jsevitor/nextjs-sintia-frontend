import { ContractProvider } from "@/context/ContractContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  // Estado para armazenar a posição do toast
  const [toastPosition, setToastPosition] = useState("top-right");

  // Detecta o tamanho da tela e ajusta a posição do toast
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setToastPosition("bottom-center"); // Posição para mobile
      } else {
        setToastPosition("top-right"); // Posição para desktop
      }
    };

    // Chama a função ao carregar a página e a cada resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Limpa o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
        />
        <title>Sintia - Análise de Contratos</title>
      </Head>
      <ContractProvider>
        <Toaster position={toastPosition} />
        <Component {...pageProps} />
      </ContractProvider>
    </>
  );
}
