import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./App.module.css";
import ArticlePage from "../../Page/SlugPage/SlugPage";
import HomePage from "../../Page/HomePage/HomePage";
import SignUp from "../../Page/SignUpPage/SignUpPage";
import SignIn from "../../Page/SignInPage/SignInPage";
import Profile from "../../Page/ProfilePage/ProfilePage";
import CreateArticle from "../../Page/CreateArticlePage/CreateArticlePage";

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:slug/edit" element={<CreateArticle />} />
      </Routes>
    </div>
  );
};

export default App;
