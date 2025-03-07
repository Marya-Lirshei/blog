import axios from 'axios';
import { IFormData } from '../../types/types';

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
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  console.log("Response from getProfile:", response.data); // Логирование ответа
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

  // const user: userData = {
  //   user: {
  //     email: "jake3@gmail.com",
  //     username: "jake22222223",
  //     password: "yourpassword3",
  //   },
  // };//4