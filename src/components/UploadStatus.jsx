import { useState, useEffect } from "react";
import styles from "@/styles/components/UploadStatus.module.css";

const UploadStatus = ({ fileName, isUploading, onCancel, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular progresso de upload
    if (isUploading) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 10;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isUploading]);

  return (
    <div className={styles.uploadStatus}>
      <div className={styles.uploadHeader}>
        <span>Processando um arquivo</span>
        <i className="bi bi-x-circle" onClick={onClose}></i>
      </div>
      <div className={styles.progressContent}>
        <div className={styles.progressInfo}>
          <span>
            {progress < 100
              ? "Menos de um minuto restante."
              : "Upload concluído!"}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.cancelUpload}>
            <button onClick={onCancel} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <div className={styles.fileInfo}>
        <i className="bi bi-file-earmark-text"></i>
        <span>{fileName}</span>
      </div>
    </div>
  );
};

export default UploadStatus;
