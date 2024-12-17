import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "@/styles/components/ResultCard.module.css";

const ResultCard = ({
  title,
  value,
  percentage,
  description,
  showProgress,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.value}>
        {showProgress ? (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "-10% 70%",
            }}
          >
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              styles={buildStyles({
                textColor: "#333",
                pathColor: "#4510A3",
                trailColor: "#a08fbf",
                textSize: "16px",
              })}
            />
          </div>
        ) : (
          <p className={styles.value}>{value}</p>
        )}
      </div>
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
