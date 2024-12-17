import styles from "@/styles/components/Header.module.css";

const Header = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value); // Passa o valor da pesquisa para o componente pai
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Pesquisar por um contrato..."
          className={styles.searchInput}
          onChange={handleSearchChange} // Chama a função ao digitar
        />
      </div>
    </header>
  );
};

export default Header;
