import { create } from 'zustand';

interface StoreState {
  isloggedIn: boolean;
  userId: number | null;
  storeLogin: (token: string, userId: number) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const useAuthStore = create<StoreState>((set) => ({
  isloggedIn: getToken() ? true : false, // 초기값
  userId: localStorage.getItem('userId')
    ? Number(localStorage.getItem('userId'))
    : null,
  storeLogin: (token: string, userId: number) => {
    set({ isloggedIn: true, userId });
    setToken(token);
    localStorage.setItem('userId', userId.toString());
  },
  storeLogout: () => {
    set({ isloggedIn: false, userId: null });
    removeToken();
    localStorage.removeItem('userId');
  },
}));
