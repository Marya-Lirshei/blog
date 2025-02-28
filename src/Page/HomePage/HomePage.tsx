import { useEffect, useState } from "react";
import { useFetchArticles } from "../../hooks/useFetchArticles";
// import styles from "./List.module.css";
import styles from "./HomePage.module.css";
import Post from "../../components/Post/Post";
import { TTypeArticles } from "../../types/types";
import { Pagination } from "antd";
import List from "../../components/List/List";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page") || "";
  const initialPage = parseInt(pageParam) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { articles, loading, error, fetchArticles } = useFetchArticles();
  console.log("articles: ", articles);

  useEffect(() => {
    const offset = (currentPage - 1) * 20;
    fetchArticles(offset, 20);
  }, [currentPage/* , fetchArticles */]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <List className={styles.list}>
      {articles.map((article: TTypeArticles, index: number) => (
        <div key={index} className={styles.post}>
          <Post
            username={article.author.username}
            image={article.author.image}
            date={article.createdAt}
            title={article.title}
            tagList={article.tagList}
            body={article.body}
            description={article.description}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            slug={article.slug}
            updatedAt={article.updatedAt}
            article={article}
          />
        </div>
      ))}

      <Pagination
        current={currentPage}
        total={1300}
        pageSize={20}
        onChange={handlePageChange}
      />
    </List>
  );
}
export default HomePage;
