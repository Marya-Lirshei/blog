import axios from "axios";
import { ArticleApiData, IFormData, TCreateArticle } from "../../types/types";

export const BaseURL = "https://blog-platform.kata.academy/api/";

export const registerUser = async (userData: IFormData) => {
  const response = await axios.post(`${BaseURL}users`, {
    user: userData,
  });
  console.log('response: ', response);
  return response;
};

export const loginUser = async (userData: IFormData) => {
  const response = await axios.post(`${BaseURL}users/login`, {
    user: userData,
  });
  return response.data.user.token;
};

export const getProfile = async () => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(`${BaseURL}user`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data.user;
};

export const updateProfile = async (userData: Partial<IFormData>) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.put(
    `${BaseURL}user`,
    { user: userData },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.user;
};

export const createArticle = async (articleData: Partial<TCreateArticle>) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.post(
    `${BaseURL}articles`,
    { article: articleData },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data.article;
};
export const updateArticle = async (
  slug: string,
  articleData: ArticleApiData
) => {
  const token = localStorage.getItem("authToken");   
  if (!token) throw new Error("Authentication required");
  try {
    const response = await axios.put(
      `${BaseURL}articles/${slug}`,
      { article: articleData },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data.article;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
export const deleteArticle = async (slug: string) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Authentication required");
  try {
    const response = await axios.delete(`${BaseURL}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.article;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
export const favoriteArticle = async (slug: string) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Authentication required");
  try {
    const response = await axios.post(
      `${BaseURL}articles/${slug}/favorite`,
      {}, // пустое тело запроса
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data.article;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
export const unFavoriteArticle = async (slug: string) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Authentication required");
  try {
    const response = await axios.delete(`${BaseURL}articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.article;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
