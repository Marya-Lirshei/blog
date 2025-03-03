import { Link } from "react-router-dom";
import styles from "./Header.module.css"

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
    <div>Realworld blog</div>
    <div>
      <Link to={`/sign-in`}>
      <button>Sign In</button>
      </Link>
      <Link to={`/sign-up`}>
      <button>Sign Up</button>
      </Link>
      {/* <button>Create article</button> */}
    </div>
  </div>
  );
};

export default Header;
