import { useRef, useState } from "react";
import { useRouter } from "next/router"; // Importar useRouter
import styles from "@/styles/components/Sidebar.module.css";
import api from "@/services/api";
import UploadStatus from "./UploadStatus"; // Certifique-se de que o caminho para o componente UploadStatus esteja correto
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const router = useRouter(); // Usar o hook useRouter para capturar a rota atual

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true); // Defina isUploading para true assim que o arquivo for selecionado
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Enviar o arquivo para o servidor usando Axios
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Arquivo enviado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    } finally {
      setIsUploading(false); // Finaliza o processo de upload
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCancelUpload = () => {
    setIsUploading(false); // Cancela o upload
    setFileName("");
  };

  const handleCloseUpload = () => {
    setIsUploading(false); // Cancela o upload
    setFileName("");
  };

  const isActive = (path) => {
    return router.pathname === path ? styles.active : ""; // Verifica se o item é a página atual
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        {/* <img src="" alt="Granto Seguros" /> */}
        <Image src="./logo.svg" alt="Granto Seguros" width={100} height={100} />
      </div>

      {/* Input escondido para seleção de arquivos */}
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Botão para enviar arquivo */}
      <button className={styles.uploadButton} onClick={triggerFileInput}>
        + Enviar Arquivo
      </button>

      <nav>
        <ul className={styles.menu_items}>
          <li className={isActive("/")}>
            <Link href={"/"}>
              <i className="bi bi-house"></i>
              Home
            </Link>
          </li>
          <li className={isActive("/analises")}>
            <Link href={"/analises"}>
              <i className="bi bi-file"></i>
              Contratos
            </Link>
          </li>
        </ul>
      </nav>

      {/* Exibir o status de upload */}
      {isUploading && (
        <UploadStatus
          fileName={fileName}
          isUploading={isUploading}
          onCancel={handleCancelUpload}
          onClose={handleCloseUpload}
        />
      )}
    </aside>
  );
};

export default Sidebar;
