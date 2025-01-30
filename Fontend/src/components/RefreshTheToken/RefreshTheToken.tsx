import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

const refreshToken = async () => {
  console.log("refreshToken");

  try {
    const res = await axios.post("http://localhost:3000/user/refresh", {
      withCredentials: true,
    });

    return res.data.accessToken;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    return undefined;
  }
};

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.error("No access token available");
      throw new Error("No access token available");
    }

    const decodedToken = jwtDecode<JwtPayload>(accessToken);
    if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Access token expired, attempting to refresh");
      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        Cookies.set("accessToken", newAccessToken, {
          sameSite: "Strict",
        });
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      } else {
        console.error("Failed to refresh token, new access token is undefined");
        throw new Error("Failed to refresh token");
      }
    }

    return config;
  },
  (error) => {
    console.error("Error during axios interceptor request:", error);
    return Promise.reject(error);
  }
);

export default axiosJWT;
