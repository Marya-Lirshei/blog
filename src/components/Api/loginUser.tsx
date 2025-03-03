import axios from "axios";
import { BaseURL, registerUser } from "./registerUser";
import { IFormData } from "../../types/types";

export const loginUser = async (userData: IFormData) => {
  try {
    let token1 = localStorage.getItem("authToken");
    console.log("token: ", token1);
    if (!token1) {
      token1 = await registerUser(userData);
    }

    // const userData = {
    //   user: {
    //     email: "jake@gmail.com",
    //     password: "yourpassword",
    //   },
    // };

    const response = await axios.post(`${BaseURL}users/login`, {
      user: userData,
    });
    const token = response.data.user.token;
    console.log("token: ", token);

    console.log("Registration successful:", response.data);
    return response.data.user.token;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed");
  }
};
