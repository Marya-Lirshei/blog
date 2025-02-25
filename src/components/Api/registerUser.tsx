import axios from "axios";
export const BaseURL = "https://blog-platform.kata.academy/api/";
export const registerUser = async () => {
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