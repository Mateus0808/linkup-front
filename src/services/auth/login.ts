import Cookies from "js-cookie";
import { ILoginProps } from "@/types/user.type"
import api from "../axios.service"

export const userLogin = async (data: ILoginProps) => {
  try {
    const response = await api.post("/auth/login", {
      email: data.email,
      password: data.password
    })

    const { accessToken, refreshToken, userId, tokenId } = response.data.data;
    Cookies.set("userId", userId, { expires: 1 });
    Cookies.set("tokenId", tokenId, { expires: 1 });
    Cookies.set("linkupToken", accessToken, { expires: 1, secure: true, sameSite: "Strict" });
    Cookies.set("linkupRefreshToken", refreshToken, { expires: 1, secure: true, sameSite: "Strict" });

    return true
  } catch (error: any) {
    return error.response?.data || "Erro ao realizar login";
  }
}