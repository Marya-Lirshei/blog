import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { useFetchArticles } from "../../hooks/useFetchArticles";
import { createArticle, updateArticle } from "../../components/Api/authApi";
import { ArticleApiData, TCreateArticle } from "../../types/types";

import styles from "./CreateArticlePage.module.css";

const CreateArticle = () => {
  const location = useLocation();
  const { article } = location.state || {};
  const isEditMode = !!article;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<TCreateArticle>({
    defaultValues: {
      tagList: [{ id: Date.now().toString(), nameTag: "" }], // 1 пустой тег по умолчанию
    },
  });

  const { fields, append, remove } = useFieldArray<TCreateArticle, "tagList">({
    control,
    name: "tagList",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { fetchArticles } = useFetchArticles();

  useEffect(() => {
    if (isEditMode && article) {
      reset({
        ...article,
        tagList: article.tagList.map((tag: string, index: number) => ({
          id: (Date.now() + index).toString(),
          nameTag: tag,
        })),
      });
    }
  }, [isEditMode, article, reset]);

  const onSubmit = async (data: TCreateArticle) => {
    try {
      const articleData: ArticleApiData = {
        ...data,
        tagList: data.tagList
          .map((item) => item.nameTag) // преобр в string[]
          .filter((tag) => tag.trim() !== ""),
      };
      if (isEditMode) {
        await updateArticle(article.slug, articleData);
        console.log("article.slug: ", article.slug);
      } else {
        await createArticle(articleData as unknown as Partial<TCreateArticle>);
      }
      await fetchArticles();
      navigate("/");
    } catch (error) {
      setError(
        isEditMode
          ? "Ошибка при обновлении статьи"
          : "Ошибка при создании статьи"
      );
      console.error("Ошибка:", error);
    }
  };

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const addTag = () => {
    if (fields.length > 0) {
      const lastTagValue = watch(`tagList.${fields.length - 1}.nameTag`);
      console.log("lastTagValue: ", lastTagValue);
      if (!lastTagValue?.trim()) {
        showError("Заполните текущий тег перед добавлением нового");
        return;
      }
    }
    append({ id: Date.now().toString(), nameTag: "" });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>{isEditMode ? "Edit article" : "Create new article"}</h1>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <form
            className={styles.formWrapper}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.formGroup}>
              <input
                className={styles.formControl}
                placeholder=" "
                {...register("title", { required: "Title is required" })}
              />
              <label className={styles.formLabel}>Title</label>
              {errors.title && (
                <p className={styles.errorMessage}>{errors.title.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                className={styles.formControl}
                placeholder=" "
                {...register("description", {
                  required: "Description is required",
                })}
              />
              <label className={styles.formLabel}>Short description</label>
              {errors.description && (
                <p className={styles.errorMessage}>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                className={`${styles.formControl} ${styles.addInputText}`}
                placeholder=" "
                {...register("body", { required: "Text is required" })}
              />
              <label className={styles.formLabel}>Text</label>
              {errors.body && (
                <p className={styles.errorMessage}>{errors.body.message}</p>
              )}
            </div>

            <div className={styles.formTags}>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`${styles.formGroup} ${styles.formGroupTag}`}
                >
                  <input
                    className={`${styles.formControl} ${styles.addTagName}`}
                    placeholder=" "
                    {...register(`tagList.${index}.nameTag`)}
                    defaultValue={field.nameTag}
                  />
                  <label className={styles.formLabel}>Tag {index + 1}</label>
                  {index > 0 && (
                    <button
                      type="button"
                      className={styles.buttonDelete}
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  )}
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
