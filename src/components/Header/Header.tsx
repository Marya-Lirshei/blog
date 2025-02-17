import styles from "./Header.module.css"

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
    <div>Realworld blog</div>
    <div>
      <button>Sign In</button>
      <button>Sign Up</button>
      <button>Create article</button>
    </div>
  </div>
  );
};

export default Header;
