import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useContractContext } from "@/context/ContractContext"; // Importando o contexto
import UploadStatus from "./UploadStatus";
import Link from "next/link";
import Image from "next/image";
import api from "@/services/api";
import styles from "@/styles/components/Sidebar.module.css";
import toast from "react-hot-toast";

const Sidebar = () => {
  const fileInputRef = useRef(null);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { updateContracts } = useContractContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true);
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Enviar o arquivo para o servidor
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Arquivo enviado com sucesso:", response.data);

      // Recarregar os dados após o upload
      const contractsResponse = await api.get("/contracts");
      const updatedContracts = Array.isArray(contractsResponse.data)
        ? contractsResponse.data
        : [contractsResponse.data];
      toast.success("Contrato adicionado com sucesso!"),
        {
          duration: 3000,
        };
      updateContracts(updatedContracts); // Atualiza o contexto
    } catch (error) {
      toast.error("Erro ao enviar o arquivo");
      console.error("Erro ao enviar o arquivo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setFileName("");
  };

  const handleCloseUpload = () => {
    setIsUploading(false);
    setFileName("");
  };

  const isActive = (path) => {
    return router.pathname === path ? styles.active : "";
  };

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterna o estado (abre ou fecha o menu)
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
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
        <i className="bi bi-plus"></i> <span>Enviar Arquivo</span>
      </button>

      <nav className={styles.menu}>
        <ul className={`${styles.menu_items} ${isOpen ? styles.open : ""}`}>
          <li className={isActive("/")}>
            <Link href={"/"}>
              <i className="bi bi-house"></i>
              Home
            </Link>
          </li>
          <li className={isActive("/analises")}>
            <Link href={"/analises"}>
              <i className="bi bi-file-earmark-break"></i>
              Contratos
            </Link>
          </li>
        </ul>

        <button className={styles.hamburgerMenu} onClick={toggleMenu}>
          <i className={isOpen ? "bi bi-x" : "bi bi-list"}></i>
        </button>
      </nav>

      <footer className={styles.footer}>
        <div className={styles.attribution}>
          © 2024 Voliverx Dev.
          <br /> Todos os direitos reservados.
        </div>
        <div className={styles.attribution}>
          Coded by{" "}
          <a href="https://jsevitor.github.io/portfolio/">Vitor Oliveira</a>.
        </div>
      </footer>
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
