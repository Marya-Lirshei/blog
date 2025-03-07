import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/reducers/authSlice";



const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };
  return (
    <div className={styles.header}>
      <div>Realworld Blog</div> 
      <div>
        {isAuthenticated ? (
          <div className={styles.authHeader}>
            <button >Create article</button>
            <Link to="/profile" className={styles.profile}>
              <div>{user?.username}</div>
              <img className={styles.authorImage} src={user?.image || "	https://static.productionready.io/images/smiley-cyrus.jpg"} alt="Author" />
            </Link>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <>
            <Link to="/sign-in">
              <button>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
