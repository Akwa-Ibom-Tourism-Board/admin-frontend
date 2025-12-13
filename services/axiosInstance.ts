/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


const getAccessToken = () => Cookies.get("access_token");
const setAccessToken = (token: string) => Cookies.set("access_token", token, {
  expires: 30,
  secure: true,
  sameSite: 'strict'
});
const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("userProfile");
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers['x-access-token'];
    
    if (newAccessToken) {
      setAccessToken(newAccessToken);
    }
    
    return response;
  },
  async (error) => {
    // if (error.response?.status === 403) {
    //   const errorMessage = error.response?.data?.message?.toLowerCase() || '';
      
    // const loginRequiredMessages = [
    //     'Please login again',
    //     'Login required',
    //     'refresh token not found',
    //     'Refresh Token Expired. Please login again.',
    //     'user not found',
    //     'account blocked',
    //     'login again',
    //     'Invalid token',
    //     'Invalid token format',
    //     'User not found, please login again or contact admin',
    //     'Account blocked, please contact admin',
    //     'Login Again, Invalid Token:'
    //   ];
      
    //   const requiresLogin = loginRequiredMessages.some(msg => 
    //     errorMessage.includes(msg.toLowerCase())
    //   );
      
    //   if (requiresLogin) {
    //     clearTokens();
    //     window.location.href = '/login';
    //     return Promise.reject(error);
    //   }
    }
    
    // return Promise.reject(error);
//   }
);

export default axiosInstance;
