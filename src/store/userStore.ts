import { create } from "zustand";
import Cookies from "js-cookie";
import { UserResponse } from "@/types/user.type";
import { apiService } from "@/services/axios.service";

interface UserState {
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
  loading: boolean
  setLoading: (loading: boolean) => void
  setUserId: (id: string) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  setUserId: (id) => {
    Cookies.set("userId", id, { expires: 7 });
    set({ user: null });
  },

  fetchUser: async () => {
    set({ loading: true });

    const userId = Cookies.get("userId");
    if (!userId) return;
    try {
      const response = await apiService.get(`/users/${userId}`);
      const { data }= response.data
      set({ user: data });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    const tokenId = Cookies.get("tokenId");
    console.log("tokenId", tokenId)
    await apiService.get(`/auth/logout/${tokenId}`)
    Cookies.remove("userId");
    Cookies.remove("tokenId");
    Cookies.remove("linkupToken");
    Cookies.remove("linkupRefreshToken");
  },
}));
