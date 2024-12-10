import styles from "@/styles/components/ResultCard.module.css";

const ResultCard = ({ title, value, percentage, description, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {/* {icon ? icon : <AiOutlineFileText />}  */}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.footer}>
        <span className={`${styles.percentage} ${styles.positive}`}>
          {percentage}
        </span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default ResultCard;
