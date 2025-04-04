import axios from "axios";
import { useState } from "react";
import { BaseURL } from "../components/Api/authApi";
import { useNavigate } from "react-router-dom";

export const useFetchArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0); // для пагинации
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchArticles = async (offset = 0, limit = 20) => {
    try {
      let token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/sign-in");
        return;
      }

      const response = await axios.get(`${BaseURL}articles`, {
        params: { limit, offset },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setArticles(response.data.articles);
      setTotalPages(Math.ceil(response.data.articlesCount / limit)); //общее кол-во страниц
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Ошибка при загрузке статей");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка");
      }
      console.error("Ошибка при загрузке статей:", error);
    } finally {
      setLoading(false);
    }
  };


  return { articles, loading, error, totalPages, fetchArticles };
};
