import { TPostProps } from "../../types/types";
import { Link} from "react-router-dom";
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
  slug,
  article,
  // description,
  // favorited,
  // favoritesCount,
  // updatedAt,
}) => {
  // const navigate  =  useNavigate();

/*   const handleClick = () => {
    navigate(`/article/${slug}`, { state: { article } });
  }; */
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Link to={`/article/${slug}`} state={{ article }} /* onClick={handleClick} */ className={styles.title}>
          {title}
        </Link>
        <div className={styles.header}>
          <div className={styles.author}>
            <div className={styles.name}>{username}</div>
            <div className={styles.date}>
              {date ? format(new Date(date), "MMM dd, yyyy") : null}
            </div>
          </div>
          <img className={styles.img} src={image || "default-image-url"} alt="Author" />
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
