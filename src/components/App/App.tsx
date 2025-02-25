import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./App.module.css";
import ArticlePage from "../../Page/SlugPage/SlugPage";
import HomePage from "../../Page/HomePage/HomePage";

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {/* <List /> */}
      {/* <HomePage /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </div>
  );
};

export default App;
