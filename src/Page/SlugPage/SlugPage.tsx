import { useLocation } from 'react-router-dom';
import styles from "./SlugPage.module.css"
// import styles from './ArticlePage.module.css';
// import { TPostProps } from '../types/types';

const ArticlePage: React.FC= () => {

  const location = useLocation();
  const { article } = location.state || {};
 
  if (!article) return <div>Статья не найдена.</div>;


  return (
    <div className={styles.wrapper}>
      <h1>{article.title}</h1>
      <div>{article.body}</div>
      <div>Автор: {article.author.username}</div>
      <div>Дата: {new Date(article.createdAt).toLocaleDateString()}</div>
      <div>Теги: {article.tagList.join(", ")}</div>
    </div>
  );
};

export default ArticlePage;