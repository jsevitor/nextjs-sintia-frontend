import styles from "@/styles/components/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Pesquisar por um arquivo..."
          className={styles.searchInput}
        />
      </div>
    </header>
  );
};

export default Header;
