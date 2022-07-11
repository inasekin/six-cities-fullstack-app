import {AuthResult} from '../types/auth-result';
import {TokenTypes} from '../const';

export const getToken = (tokenType: TokenTypes) => {
  const token = localStorage.getItem(tokenType);

  return token ?? '';
};

export const saveToken = ({token, refreshToken}: AuthResult) => {
  localStorage.setItem(TokenTypes.Token, token);
  localStorage.setItem(TokenTypes.RefreshToken, refreshToken);
};

export const dropToken = () => {
  localStorage.removeItem(TokenTypes.Token);
  localStorage.removeItem(TokenTypes.RefreshToken);
};
