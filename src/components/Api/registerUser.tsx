import axios from "axios";
import { IFormData } from "../../types/types";
export const BaseURL = "https://blog-platform.kata.academy/api/";
export const registerUser = async (userData: IFormData) => {
    try {
      const response = await axios.post(`${BaseURL}users`, {
        user: userData, 
      });
      const token = response.data.user.token;
  
      localStorage.setItem("authToken", token);
      return token;
    } catch (error) {
      throw new Error("request error");
    }
  };

  // const user: userData = {
  //   user: {
  //     email: "jake3@gmail.com",
  //     username: "jake22222223",
  //     password: "yourpassword3",
  //   },
  // };//4