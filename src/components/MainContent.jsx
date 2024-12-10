import styles from "@/styles/components/MainContent.module.css";

const MainContent = ({ children }) => {
  return <div className={styles.mainContent}>{children}</div>;
};

export default MainContent;
