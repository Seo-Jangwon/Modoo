import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string;
  setAccesstoken: (token: string) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: '',
      setAccesstoken: (token) => {
        set({ accessToken: token, isLoggedIn: true });
      },
      signOut: () => {
        set({ accessToken: '', isLoggedIn: false });
      },
    }),
    { name: 'auth-store' },
  ),
);

export default useAuthStore;
