import { useState } from "react";
import styles from "./CreateArticlePage.module.css";
import { TCreateArticle } from "../../types/types";
import {createArticle} from "../../components/Api/authApi"
import { useNavigate } from "react-router-dom";
import { useFetchArticles } from "../../hooks/useFetchArticles";
const CreateArticle = () => {
  const [tags, setTags] = useState([""]);
  const [ error, setError] = useState("")

  const navigate = useNavigate();
  const { fetchArticles } = useFetchArticles();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const articleData: TCreateArticle = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      body: formData.get("body") as string,
      tagList: tags.filter((tag) => tag.trim() !== ""),
    };
    try {
      await createArticle(articleData);
      await fetchArticles(); 
      navigate("/"); 
    } catch (error) {
      setError("Ошибка при создании статьи");
      console.error("Ошибка при создании статьи:", error);
    }
  };

  const showError = (message: string)=>{
    setError(message)
    setTimeout(()=>{
      setError("")
    }, 3000)
  }

  const addTag = () => {
    if (tags[tags.length - 1].trim() === "") {
      showError("Пожалуйста, заполните текущий тег.");
      return;
    }
    setTags([...tags, ""]);
  };

  const deleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Create new article</h1>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <form className={styles.formWrapper} onSubmit={handleSubmit} >
            <div className={styles.formGroup}>
              <input
                className={styles.formControl}
                placeholder=" "
                name="title"
              />
              <label className={styles.formLabel}>Title</label>
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.formControl}
                placeholder=" "
                name="description"
              />
              <label className={styles.formLabel}>Short description</label>
            </div>

            <div className={styles.formGroup}>
              <input
                className={`${styles.formControl} ${styles.addInputText}`}
                placeholder=" "
                name="body" 
              />
              <label className={styles.formLabel}>Text</label>
            </div>
            <div className={styles.formTags}>
              {tags.map((tag, index) => (
                <div key={index} className={`${styles.formGroup} ${styles.formGroupTag}`}>
                  <input
                    className={`${styles.formControl} ${styles.addTagName}`}
                    placeholder=" " 
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <label className={styles.formLabel}>Tag {index + 1}</label>
                  <button
                    type="button"
                    className={styles.buttonDelete}
                    onClick={() => deleteTag(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles.buttonAddTag}
                onClick={addTag}
              >
                Add tag
              </button>
            </div>

            <div className={styles.formButton}>
              <input type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
