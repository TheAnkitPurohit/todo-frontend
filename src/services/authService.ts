import axios, { AxiosResponse } from 'axios';

const authService = {
  register: async (user: UserRegister): Promise<any> => {
    const response: AxiosResponse<any> = await axios.post('/users/create/', user);
    return response?.data;
  },

  login: async (user: UserLogin): Promise<any> => {
    const response: AxiosResponse<any> = await axios.post('/users/login/', user);
    return response?.data;
  },

  refreshToken: async (refresh: string): Promise<any> => {
    const response: AxiosResponse<any> = await axios.patch(`/users/token/refresh/`, {
      refresh,
    });
    return response?.data;
  },

  logout: async (refresh_token: string): Promise<any> => {
    const response: AxiosResponse<any> = await axios.post(`/users/logout/blacklist/`, {
      refresh_token,
    });
    return response?.data;
  },
};

export default authService;
