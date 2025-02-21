import axios from "axios";
import { useEffect, useState } from "react";

const BaseURL = "https://blog-platform.kata.academy/api/";
// const BaseURL = "https://blog.kata.academy/api/";

const registerUser = async () => {
  try {
    const userData = {
      user: {
        email: "jake@gmail.com",
        username: "jake2222222",
        password: "yourpassword",
      },
    };
    const response = await axios.post(`${BaseURL}users`, userData);
    const token = response.data.user.token;

    localStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    throw new Error("request error");
  }
};

const loginUser = async () => {
  try {
    let token1 = localStorage.getItem("authToken");
    console.log("token: ", token1);
    if (!token1) {
      token1 = await registerUser();
    }

    const userData = {
      user: {
        email: "jake@gmail.com",
        password: "yourpassword",
      },
    };

    const response = await axios.post(`${BaseURL}users/login`, userData);
    const token = response.data.user.token;
    console.log("token: ", token);

    console.log("Registration successful:", response.data);
    return response.data.user.token;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed");
  }
};

const useFetchArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (offset = 0, limit = 20) => {
    try {
      let token = localStorage.getItem("authToken");
      console.log("token: ", token);
      if (!token) {
        token = await loginUser();
      }

      const response = await axios.get(
        `${BaseURL}articles?limit=${limit}&offset=${offset}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log();
      setArticles(response.data.articles);
    } catch (error) {
      setError("Ошибка при доступе к защищенному ресурсу");
      console.error("Ошибка при доступе к защищенному ресурсу:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error, fetchArticles };
};

export default useFetchArticles;
