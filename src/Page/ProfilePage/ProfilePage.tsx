import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../store/reducers/authSlice";
import { IFormData } from "../../types/types";
import { useForm } from "react-hook-form";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const {
    register: update,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>({ mode: "onBlur" });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleUpdateProfile = (updatedData: Partial<IFormData>) => {
    dispatch(updateUserProfile(updatedData));
    navigate("/")
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Edit Profile</h1>
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className={styles.formWrapper}
        >
          <div className={styles.formGroup}>
            <input
              {...update("username", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа",
                },
                maxLength: {
                  value: 20,
                  message: "Максимум 20 символов",
                },
              })}
              className={styles.formControl}
              placeholder=" "
              defaultValue={user.username}
            />
            <label className={styles.formLabel}>Username</label>
            {errors?.username && (
              <p className={styles.error}>
                {errors?.username?.message || "Error!"}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              {...update("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Некорректный адрес электронной почты",
                },
              })}
              type="email"
              className={styles.formControl}
              placeholder=" "
              defaultValue={user.email}
            />
            <label className={styles.formLabel}>Email address</label>
          </div>

          <div className={styles.formGroup}>
            <input
              {...update("password", {
                minLength: {
                  value: 6,
                  message: "Минимум 6 символов",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов",
                },
              })}
              type="password"
              className={styles.formControl}
              placeholder=" "
            />
            <label className={styles.formLabel}>New password</label>
            {errors?.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              {...update("image", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: "Некорректный URL",
                },
              })}
              // type="image"
              className={styles.formControl}
              placeholder=" "
              defaultValue={user.image}
            />
            <label className={styles.formLabel}>Avatar image (url)</label>
            {errors?.image && (
              <p className={styles.error}>{errors.image.message}</p>
            )}
          </div>

          <div className={styles.formButton}>
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
