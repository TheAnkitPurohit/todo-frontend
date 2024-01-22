import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  AuthState,
  resetState,
  setCredentials,
  selectCurrentToken,
  selectCurrentRefreshToken,
} from 'src/store/slices/authSlice';

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const refreshToken = useAppSelector(selectCurrentRefreshToken);

  const dipatch = useAppDispatch();

  const handleSetCredentails = (tokens: AuthState) => {
    dipatch(setCredentials(tokens));
  };

  const handleResetAuth = () => {
    dipatch(resetState());
  };

  return { token, refreshToken, handleSetCredentails, handleResetAuth };
};

export default useAuth;
