import { format } from "date-fns";
import styles from "./AuthorSection.module.css";
import { IAuthorSectionProps } from "../../types/types";

const AuthorSection: React.FC<IAuthorSectionProps> = ({
  username,
  image,
  date,
}) => {
  return (
    <div className={styles.authorSection}>
      <div className={styles.authorDetails}>
        <div className={styles.authorName}>{username}</div>
        <div className={styles.publicationDate}>
          {date ? format(new Date(date), "MMM dd, yyyy") : null}
        </div>
      </div>
      <img
        className={styles.authorImage}
        src={image || "default-image-url"}
        alt="Author"
      />
    </div>
  );
};

export default AuthorSection;
