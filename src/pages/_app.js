import { ContractProvider } from "@/context/ContractContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
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
        <title>Análise de Contratos</title>
      </Head>
      <ContractProvider>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </ContractProvider>
    </>
  );
}
