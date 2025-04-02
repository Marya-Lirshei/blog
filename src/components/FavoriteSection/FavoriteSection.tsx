import { TFavoriteSectionProps } from "../../types/types";
import styles from "./FavoriteSection.module.css";
import heart from "../../../public/heart.svg";
import heardRed from "../../../public/heartRed.svg";
import { useState } from "react";
import { favoriteArticle, unFavoriteArticle } from "../Api/authApi";

const FavoriteSection: React.FC<TFavoriteSectionProps> = ({
  favoritesCount: initialFavoritesCount,
  slug,
  favorited: initialFavorited,
}) => {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (favorited) {
        const article = await unFavoriteArticle(slug);
        setFavoritesCount(article.favoritesCount);
        setFavorited(article.favorited);
      } else {
        const article = await favoriteArticle(slug);
        setFavoritesCount(article.favoritesCount);
        setFavorited(article.favorited);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${styles.favoriteSection} ${
        favorited ? styles.favorited : ""
      }`}
      onClick={handleFavoriteClick}
      disabled={isLoading}
    >
      <img src={favorited ? heardRed : heart} alt="Heart" />
      <div>{favoritesCount}</div>
    </button>
  );
};
export default FavoriteSection;
