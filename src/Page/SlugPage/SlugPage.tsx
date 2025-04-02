import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SlugPage.module.css";
import FavoriteSection from "../../components/FavoriteSection/FavoriteSection";
import AuthorSection from "../../components/AuthorSection/AuthorSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useAppSelector } from "../../hooks/redux";
import { deleteArticle } from "../../components/Api/authApi";
import { useFetchArticles } from "../../hooks/useFetchArticles";

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchArticles } = useFetchArticles();

  const { article } = location.state || {};

  const currentUser = useAppSelector((state) => state.auth.user);

  if (!article) return <div>Статья не найдена.</div>;
  const handleEdit = () => {
    navigate("/articles/{slug}/edit", { state: { article } });
  };

  const handleDelete = async () => {
    await deleteArticle(article.slug);
    await fetchArticles();
    navigate("/");
  };

  const isAuthor = currentUser?.username === article.author.username;
  return (
    <div className={styles.wrapper}>
      <div className={styles.articleCard}>
        <div className={styles.articleInfo}>
          <div className={styles.titleSection}>
            <div className={styles.articleTitle}>{article.title}</div>
            <FavoriteSection
              favoritesCount={article.favoritesCount}
              slug={article.slug}
              favorited={article.favorited}
            />
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
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
          {isAuthor && (
            <div className={styles.articleButton}>
              <button className={styles.editButton} onClick={handleEdit}>
                Edit Article
              </button>
              <button className={styles.deleteButton} onClick={handleDelete}>
                Delete Article
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
