import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout, fetchUserProfile } from "../../store/reducers/authSlice";
import { useEffect } from "react";


const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  console.log('user: ', user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);
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
            <Link to="/new-article">
            <button >Create article</button>
            </Link>
            <Link to="/profile" className={styles.profile}>
              <div>{user?.username}</div>
              <img className={styles.authorImage} src={user?.image || "	https://static.productionready.io/images/smiley-cyrus.jpg"} alt="Author" />
            </Link>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : ( 
          <div className={styles.authHeader}>
            <Link to="/sign-in">
              <button>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
