import { useEffect, useState } from "react";
import { useFetchArticles } from "../../hooks/useFetchArticles";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import List from "../../components/List/List";
import { TTypeArticles } from "../../types/types";
import styles from "./HomePage.module.css";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page") || "";
  const initialPage = parseInt(pageParam) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { articles, loading, error, totalPages, fetchArticles } = useFetchArticles();

  useEffect(() => {
    const offset = (currentPage - 1) * 20;
    fetchArticles(offset, 20);
  }, [currentPage]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <List className={styles.list}>
      {articles.map((article: TTypeArticles) => (
        <div key={article.slug} className={styles.post}>
          <Post
            username={article.author.username}
            image={article.author.image}
            date={article.createdAt}
            title={article.title}
            tagList={article.tagList}
            body={article.body}
            description={article.description}//после тайтла
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
        total={totalPages * 20}
        pageSize={20}
        onChange={handlePageChange}
      />
    </List>
  );
}
export default HomePage;
