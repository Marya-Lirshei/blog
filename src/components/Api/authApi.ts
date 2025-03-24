import axios from 'axios';
import { IFormData, TCreateArticle } from '../../types/types';

export const BaseURL = 'https://blog-platform.kata.academy/api/';

export const registerUser = async (userData: IFormData) => {
  const response = await axios.post(`${BaseURL}users`, {
    user: userData,
  });
  return response;
};

export const loginUser = async (userData: IFormData) => {
  const response = await axios.post(`${BaseURL}users/login`, {
    user: userData,
  });
  return response.data.user.token;
};
    
export const getProfile = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${BaseURL}user`, {
    headers: {      Authorization: `Token ${token}`,
    },
  });
  // console.log("Response from getProfile:", response.data);
  return response.data.user;
};

export const updateProfile = async (userData: Partial<IFormData>) => {
  const token = localStorage.getItem('authToken');
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


export const createArticle= async (articleData: Partial<TCreateArticle>)=>{
  const token = localStorage.getItem('authToken');
  const response = await axios.post( `${BaseURL}articles`,
  { article: articleData },
  {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
  )
  console.log('response.data.article: ', response.data.article);
  return response.data.article;
}

  // const user: userData = {
  //   user: {
  //     email: "kracozabra@gmail.com",
  //     username: "Kracozabra",
  //     password: "88005553535",
  //   },
  // };//4
  // const user: userData = {
  //   user: {
  //     email: "kracozabra1@gmail.com",
  //     username: "Kracozabra!",
  //     password: "8800555353588005553535",
  //   },
  // };//4
  // const user: userData = {
  //   user: {
  //     email: "tortugaprun@gmail.com",
  //     username: "lysbo3786992",
  //     password: "24463546578473a",
  //   },
  // };//4

