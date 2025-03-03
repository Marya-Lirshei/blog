import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./App.module.css";
import ArticlePage from "../../Page/SlugPage/SlugPage";
import HomePage from "../../Page/HomePage/HomePage";
import SignUp from "../../Page/SignUpPage/SignUpPage";
import SignIn from "../../Page/SignInPage/SignInPage";

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {/* <List /> */}
      {/* <HomePage /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
