import Header from "../Header/Header"
import List from "../List/List"
import styles from "./App.module.css"

const App: React.FC = () => {

  return (
    <div className={styles.wrapper}>
      <Header />
      <List />

    </div>
  )
}

export default App
