import Post from "../Post/Post";
import styles from "./List.module.css"

const List: React.FC = () => {
  return (
    <div className={styles.list}>
    <div className={styles.post}><Post /></div>
    <div className={styles.post}><Post /></div>
    <div className={styles.post}><Post /></div>
    <div className={styles.post}><Post /></div>
    <div className={styles.post}><Post /></div>
  </div>
  );
};

export default List;
