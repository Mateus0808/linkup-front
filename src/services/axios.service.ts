import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiAuth = api

apiAuth.interceptors.request.use(
  (config) => {
    const token = Cookies.get("linkupToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta
apiAuth.interceptors.response.use(
  (response) => response, // Se a requisição foi bem-sucedida, retorna a resposta
  async (error) => {
    const originalRequest = error.config;

    // Verifica se o erro foi 401 (token expirado) e se já não está tentando renovar o token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marca a requisição como já tentada

      try {
        // Obtém o refreshToken do cookie
        const refreshToken = Cookies.get("linkupRefreshToken");

        // Faz uma requisição para renovar o accessToken usando o refreshToken
        if (!refreshToken) throw new Error()
        const response = await api.post("/refresh", {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Atualiza o accessToken no cookie
        Cookies.set("linkupToken", accessToken);

        // Atualiza o cabeçalho de autorização com o novo accessToken
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Repete a requisição original com o novo token
        return api(originalRequest);
      } catch (refreshError) {
        // Se o refreshToken também estiver expirado ou inválido, redireciona para o login
        console.error("Erro ao renovar o token:", refreshError);
        Cookies.remove("linkupToken");
        Cookies.remove("linkupRefreshToken");
        window.location.href = "/login"; // Redireciona para a página de login
        return Promise.reject(refreshError);
      }
    }

    // Se o erro não for 401, rejeita a promessa
    return Promise.reject(error);
  }
);

export const apiService = {
  get: (url: string, params?: object) => apiAuth.get(url, { params }),
  post: (url: string, data?: object) => apiAuth.post(url, data),
  put: (url: string, data?: object) => apiAuth.put(url, data),
  patch: (url: string, data?: object) => apiAuth.patch(url, data),
  delete: (url: string) => api.delete(url),
};

export default api;
