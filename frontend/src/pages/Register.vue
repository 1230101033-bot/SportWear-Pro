<template>
  <div class="max-w-sm mx-auto px-4 py-16">
    <h1 class="font-heading text-2xl font-bold mb-6 text-center">Create Account</h1>
    <form @submit.prevent="handleRegister" class="space-y-3">
      <input v-model="name" required placeholder="Full name" class="w-full border rounded-lg px-3 py-2 text-sm" />
      <input v-model="email" type="email" required placeholder="Email" class="w-full border rounded-lg px-3 py-2 text-sm" />
      <input v-model="password" type="password" required placeholder="Password" minlength="6" class="w-full border rounded-lg px-3 py-2 text-sm" />
      <button type="submit" :disabled="loading" class="w-full rounded-full bg-black text-white py-2.5 text-sm font-semibold disabled:opacity-60">
        {{ loading ? "Creating account..." : "Register" }}
      </button>
      <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
    </form>
    <p class="text-sm text-center text-gray-500 mt-4">
      Already have an account?
      <router-link to="/login" class="text-black font-medium">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const auth = useAuthStore();
const router = useRouter();

async function handleRegister() {
  loading.value = true;
  error.value = "";
  try {
    await auth.register(name.value, email.value, password.value);
    router.push("/");
  } catch (e) {
    error.value = e.response?.data?.message || "Registration failed";
  } finally {
    loading.value = false;
  }
}
</script>
