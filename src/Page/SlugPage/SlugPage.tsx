import { useLocation } from "react-router-dom";
import styles from "./SlugPage.module.css";
import FavoriteSection from "../../components/FavoriteSection/FavoriteSection";
import AuthorSection from "../../components/AuthorSection/AuthorSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const { article } = location.state || {};

  if (!article) return <div>Статья не найдена.</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.articleCard}>
        <div className={styles.articleInfo}>
          <div className={styles.titleSection}>
            <div className={styles.articleTitle}>{article.title}</div>
            <FavoriteSection favoritesCount={article.favoritesCount} />
          </div>
          <AuthorSection
            username={article.author.username}
            image={article.author.image}
            date={article.createdAt}
          />
        </div>
        <div className={styles.tagsList}>
          {article.tagList.map((tag: string, index: number) => (
            <span key={index} className={styles.tagItem}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.articleDescription}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {article.description}
        </ReactMarkdown>
      </div>
        <div className={styles.articleBody}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {article.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
