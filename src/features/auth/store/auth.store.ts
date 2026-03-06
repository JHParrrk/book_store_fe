import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  actions: {
    login: (token: string) => void;
    logout: () => void;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: !!localStorage.getItem('token'),
      token: localStorage.getItem('token'),
      actions: {
        login: (token) => {
          localStorage.setItem('token', token);
          set({ isLoggedIn: true, token });
        },
        logout: () => {
          localStorage.removeItem('token');
          set({ isLoggedIn: false, token: null });
        },
      },
    }),
    {
      name: 'auth-storage', // Key name in storage
      storage: createJSONStorage(() => localStorage), // Persist in LocalStorage
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        token: state.token,
      }), // Filter specific state properties to persist
    },
  ),
);

// Selector Pattern: Export use functions for individual state pieces to optimize re-renders
export const useIsLoggedIn = () => useAuthStore((state) => state.isLoggedIn);
export const useAuthActions = () => useAuthStore((state) => state.actions);
