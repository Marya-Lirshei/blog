import { useForm } from "react-hook-form";
import styles from "./SignUpPage.module.css";
import { IFormData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/redux";

const SignUp = () => {
  const {
    register: registerForm,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<IFormData>({ mode: "onBlur" });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (userData: IFormData) => {
    try {
      await dispatch(register(userData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const goToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Create new account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
          <div className={styles.formGroup}>
            <input
              {...registerForm("username", {
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
              {...registerForm("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Некорректный адрес электронной почты",
                },
              })}
              type="email"
              className={styles.formControl}
              placeholder=" "
            />
            <label className={styles.formLabel}>Email address</label>
          </div>

          <div className={styles.formGroup}>
            <input
              {...registerForm("password", {
                required: "Поле обязательно к заполнению",
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
            <label className={styles.formLabel}>Password</label>
            {errors?.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              {...registerForm("repeatPassword", {
                required: "Поле обязательно к заполнению",
                validate: (value) =>
                  value === getValues("password") || "Пароли не совпадают",
              })}
              type="password"
              className={styles.formControl}
              placeholder=" "
            />
            <label className={styles.formLabel}>Repeat password</label>
            {errors?.repeatPassword && (
              <p className={styles.error}>{errors.repeatPassword.message}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                {...registerForm("agreeToTerms", {
                  required: "Необходимо согласие на обработку данных",
                })}
              />
              <span> I agree to the processing of my personal information</span>
            </label>
            {errors?.agreeToTerms && (
              <p className={styles.error}>{errors?.agreeToTerms?.message}</p>
            )}
          </div>

          <div className={styles.formButton}>
            <input type="submit" value="Create" />
          </div>
        </form>
        <div className={styles.signInLink}>
          Already have an account?
          <span className={styles.signInText} onClick={goToSignIn}>
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
