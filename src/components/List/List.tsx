import { useState } from "react";
import { TTypeArticles } from "../../types/types";
import useFetchArticles from "../Api/api";
import Post from "../Post/Post";
import styles from "./List.module.css";
import { Pagination } from "antd";

const List: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { articles, loading, error, fetchArticles } = useFetchArticles();
  console.log('articles: ', articles);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const offset = (page - 1) * 20;
    fetchArticles(offset, 20);
  };

  return (
    <div className={styles.list}>
      {articles.map((articl: TTypeArticles, index: number) => (
        <div key={index} className={styles.post}>
          <Post
            username={articl.author.username}
            image={articl.author.image}
            date={articl.createdAt}
            title={articl.title}
            tagList={articl.tagList}
            body={articl.body}
            description={articl.description}
            favorited={articl.favorited}
            favoritesCount={articl.favoritesCount}
            slug={articl.slug} 
            updatedAt={articl.updatedAt}
          />
        </div>
      ))}

      <Pagination  current={currentPage}
        total={1300} 
        pageSize={20} 
        onChange={handlePageChange}/>
    </div>
  );
};

export default List;
