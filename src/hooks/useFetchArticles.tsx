import axios from "axios";
import { useEffect, useState } from "react";
import { loginUser } from "../components/Api/loginUser";
import { BaseURL } from "../components/Api/registerUser";

export const useFetchArticles = () => {
    const [articles, setArticles] = useState([]);
    console.log('articles: ', articles);
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