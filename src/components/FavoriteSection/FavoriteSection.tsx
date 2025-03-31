import { TFavoriteSectionProps } from "../../types/types";
import styles from "./FavoriteSection.module.css";
import heart from "../../../public/heart.svg";

const FavoriteSection: React.FC<TFavoriteSectionProps> = ({
  favoritesCount,
}) => {
  return (
    <div className={styles.favoriteSection}>
      <img src={heart} alt="Heart" />
      <div>{favoritesCount}</div>
    </div>
  );
};
export default FavoriteSection;
