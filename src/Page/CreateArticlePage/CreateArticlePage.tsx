import styles from "./CreateArticlePage.module.css"
const CreateArticle = () => {



const handleSubmit = (userData)=>{
    console.log(JSON.stringify(userData));
}


  return (
    <div>
      <div className={styles.container}>
      <div className={styles.form}>
      <h1>Create new article</h1>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div className={styles.formGroup}>
            <input
              className={styles.formControl}
              placeholder=" "
              defaultValue="Title"
            />
            <label className={styles.formLabel}>Title</label>
          </div>

          <div className={styles.formGroup}>
            <input
              className={styles.formControl}
              placeholder=" "
              defaultValue="Short description"
              />
            <label className={styles.formLabel}>Title</label>
          </div>

          <div className={styles.formGroup}>
            <input
              className={styles.formControl}
              placeholder=" "   
              defaultValue="Text"
              />
            <label className={styles.formLabel}>Text</label>
          </div>
        <div className={styles.formTags}>
          <div className={styles.formGroup}>
            <input
              className={styles.formControl}
              placeholder=" "
              defaultValue="tag"
            />
            <label className={styles.formLabel}>Tags</label>
          </div>
          <button>Delete</button>
          <button>Add tag</button>

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