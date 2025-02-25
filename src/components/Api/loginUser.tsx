import axios from "axios";
import { BaseURL, registerUser } from "./registerUser";
// const BaseURL = "https://blog.kata.academy/api/";

export const loginUser = async () => {
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


