import styles from './Post.module.css';
const Post: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.title}>Some article title</div>
        <div className={styles.author}>
          <div className={styles.name}>John Doe</div>
          <div className={styles.date}>March 5, 2020</div>
        </div>
      </div>
      <div className={styles.tag}>Tag1, Some Tag, Tag2</div>
      <div className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, unde
        quia fugiat et cum adipisci molestias, eligendi fugit sunt sequi tempora
        hic numquam perspiciatis. Libero obcaecati laboriosam quos eos quidem!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, unde
        quia fugiat et cum adipisci molestias, eligendi fugit sunt sequi tempora
        hic numquam perspiciatis. Libero obcaecati laboriosam quos eos quidem!
      </div>
    </div>
  );
};

export default Post;
