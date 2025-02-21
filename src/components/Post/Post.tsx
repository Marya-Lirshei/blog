import { TPostProps } from "../../types/types";
import { format } from "date-fns";
import styles from "./Post.module.css";
// import { trimText } from "../utils/utils.js";
const Post: React.FC<TPostProps> = ({
  username,
  image,
  date,
  title,
  tagList,
  body,
  // description,
  // favorited,
  // favoritesCount,
  // slug,
  // updatedAt,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.header}>
          <div className={styles.author}>
            <div className={styles.name}>{username}</div>
            <div className={styles.date}>
              {date ? format(new Date(date), "MMM dd, yyyy") : null}
            </div>
          </div>
          <img className={styles.img} src={image || undefined} alt="Author" />
        </div>
      </div>
      <div className={styles.tag}>
        {tagList.map((tag, index) => (
          <span key={index} className={styles.tagItem}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.text}>{body}</div>
    </div>
  );
};

export default Post;
