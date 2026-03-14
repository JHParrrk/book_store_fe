import { AuthProps } from '@/pages/signup';
import { httpClient } from '@/apis/https';

export const signup = async (userData: AuthProps) => {
  const response = await httpClient.post('/users/signup', userData);
  return response.data;
};

export const resetRequest = async (data: AuthProps) => {
  const response = await httpClient.post('/users/reset', data);
  return response.data;
};

export const changePassword = async (userData: AuthProps) => {
  const response = await httpClient.put('/users/reset', userData);
  return response.data;
};

export const getMyUserInfo = async () => {
  const response = await httpClient.get('/users/me');
  return response.data;
};

export const updateUserInfo = async (
  userId: number,
  userData: Partial<AuthProps> & {
    name?: string;
    address?: string;
    phone_number?: string;
  },
) => {
  const response = await httpClient.put(`/users/${userId}`, userData);
  return response.data;
};

export const getMyReviews = async (page: number = 1, limit: number = 5) => {
  const response = await httpClient.get('/users/me/reviews', {
    params: { page, limit },
  });
  return response.data;
};

interface LoginResponse {
  accessToken: string;
}

export const login = async (userData: AuthProps) => {
  const response = await httpClient.post<LoginResponse>(
    '/users/login',
    userData,
  );
  return response.data;
};
