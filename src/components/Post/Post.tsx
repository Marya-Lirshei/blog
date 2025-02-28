import { TPostProps } from "../../types/types";
import { Link } from "react-router-dom";
import styles from "./Post.module.css";
import FavoriteSection from "../FavoriteSection/FavoriteSection";
import AuthorSection from "../AuthorSection/AuthorSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
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
  favoritesCount,
  // updatedAt,
}) => {
  // const navigate  =  useNavigate();

  /*   const handleClick = () => {
    navigate(`/article/${slug}`, { state: { article } });
  }; */
  return (
    <div className={styles.articleCard}>
      <div className={styles.articleInfo}>
        <div className={styles.titleSection}>
          <Link
            to={`/article/${slug}`}
            state={{ article }}
            className={styles.articleTitle}
          >
            {title}
          </Link>
          <FavoriteSection favoritesCount={favoritesCount} />
        </div>
        <AuthorSection username={username} image={image} date={date} />
      </div>
      <div className={styles.tagsList}>
        {tagList.map((tag, index) => (
          <span key={index} className={styles.tagItem}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.articleBody}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Post;
