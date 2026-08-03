import { defineStore } from "pinia";
import apiClient from "@/api/client";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },
  actions: {
    async login(email, password) {
      const { data } = await apiClient.post("/auth/login", { email, password });
      this.setSession(data.token, data.user);
    },
    async register(name, email, password) {
      const { data } = await apiClient.post("/auth/register", { name, email, password });
      this.setSession(data.token, data.user);
    },
    setSession(token, user) {
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
