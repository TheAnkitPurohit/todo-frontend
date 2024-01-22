import { BASE_URL } from 'src/utils/environments';
import client from 'src/lib/client';
import axios from 'axios';
import { resetState, setCredentials } from 'src/store/slices/authSlice';

let isRefreshTokenUpdating = false;

export default function addAuthTokenInterceptor(store: any) {
  client.interceptors.request.use((req) => {
    const { token } = store.getState().auth;
    if (!token) return req;
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error?.config;

      const { token, refreshToken } = store.getState().auth;

      //   originalConfig._retry = true;

      if (error.response) {
        if (
          !isRefreshTokenUpdating &&
          refreshToken &&
          error?.response?.status === 401 &&
          !originalConfig._retry
        ) {
          // If user login and have refresh token
          isRefreshTokenUpdating = true;
          originalConfig._retry = true;

          console.log('Started');

          try {
            const data = JSON.stringify({
              refresh: refreshToken,
            });

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: `${BASE_URL}/users/token/refresh/`,
              headers: {
                'Content-Type': 'application/json',
              },
              data: data,
            };

            const result = await axios.request(config);
            console.log({ result });
            isRefreshTokenUpdating = false;
            store.dispatch(setCredentials(result.data));
            return client(originalConfig);
          } catch (error) {
            isRefreshTokenUpdating = false;
            store.dispatch(resetState());
            window.location.reload();
            return localStorage.removeItem('persist:root');
          }
        } else if (isRefreshTokenUpdating) {
          // If refresh token is updating
          await isRefreshTokenDone();
          //console.log("isRefreshTokenUpdating");
          return client(originalConfig);
        } else if (token && token.length === 0) {
          //   store.dispatch(resetState());
          //   localStorage.removeItem('persist:root');
          //   window.location.assign = '/login';
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Stop Function excution still refresh token did't update
 */
const isRefreshTokenDone: any = async () => {
  if (isRefreshTokenUpdating) {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for one second
    return await isRefreshTokenDone();
  } else {
    return true;
  }
};
