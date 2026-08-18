<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-sm mx-auto px-4 py-24">
      <h1 class="font-heading text-2xl font-bold mb-6 text-center text-brand-text">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-3">
        <input v-model="email" type="email" required placeholder="Email" class="w-full bg-brand-surface border border-neutral-800 rounded-lg px-3 py-2 text-sm text-brand-text placeholder:text-neutral-500 focus:outline-none focus:border-brand-accent transition-colors" />
        <input v-model="password" type="password" required placeholder="Password" class="w-full bg-brand-surface border border-neutral-800 rounded-lg px-3 py-2 text-sm text-brand-text placeholder:text-neutral-500 focus:outline-none focus:border-brand-accent transition-colors" />
        <button type="submit" :disabled="loading" class="w-full rounded-full bg-brand-accent text-black py-2.5 text-sm font-semibold hover:bg-brand-accentDark transition-colors disabled:opacity-60">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
      </form>
      <p class="text-sm text-center text-brand-muted mt-4">
        Don't have an account?
        <router-link to="/register" class="text-brand-accent font-medium">Register</router-link>
      </p>
    </div>
  </div>
</template>
 
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
 
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const auth = useAuthStore();
const router = useRouter();
 
async function handleLogin() {
  loading.value = true;
  error.value = "";
  try {
    await auth.login(email.value, password.value);
    router.push(auth.isAdmin ? "/admin" : "/");
  } catch (e) {
    error.value = e.response?.data?.message || "Login failed";
  } finally {
    loading.value = false;
  }
}
</script>