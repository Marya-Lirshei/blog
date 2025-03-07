import { useForm } from "react-hook-form";
import { IFormData } from "../../types/types";
import styles from "./SignInPage.module.css";
// import { loginUser } from "../../components/Api/loginUser";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../hooks/redux';
import { fetchUserProfile, login } from "../../store/reducers/authSlice";


const SignIn = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormData>({ mode: "onBlur" });
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const onSubmit = async (userData: IFormData) => {
      try {
        await dispatch(login(userData)).unwrap();
        await dispatch(fetchUserProfile()).unwrap();
        navigate('/');

      } catch (error) {
        console.error('Login failed:', error);
      }
    };


      const goToSignUp = () => {
        navigate("/sign-up");
      };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
          <div className={styles.formGroup}>
            <input {...register("email", {
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
            {errors?.email && (
              <p className={styles.error}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={styles.formGroup}>
            <input {...register("password", {
                required: "Password is required",
              })}
              type="password"
              className={styles.formControl}
              placeholder=" "
              />
            <label className={styles.formLabel}>Password</label>
            {errors?.password && (
              <p className={styles.error}>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={styles.formButton}>
            <input type="submit" value="Create" />
          </div>
        </form>
        <div className={styles.signUpLink}>
          Don`t have an account?
          <span className={styles.signUpText} onClick={goToSignUp}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
