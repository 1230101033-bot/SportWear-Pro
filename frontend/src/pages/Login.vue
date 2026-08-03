<template>
  <div class="max-w-sm mx-auto px-4 py-16">
    <h1 class="font-heading text-2xl font-bold mb-6 text-center">Login</h1>
    <form @submit.prevent="handleLogin" class="space-y-3">
      <input v-model="email" type="email" required placeholder="Email" class="w-full border rounded-lg px-3 py-2 text-sm" />
      <input v-model="password" type="password" required placeholder="Password" class="w-full border rounded-lg px-3 py-2 text-sm" />
      <button type="submit" :disabled="loading" class="w-full rounded-full bg-black text-white py-2.5 text-sm font-semibold disabled:opacity-60">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
      <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
    </form>
    <p class="text-sm text-center text-gray-500 mt-4">
      Don't have an account?
      <router-link to="/register" class="text-black font-medium">Register</router-link>
    </p>
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
