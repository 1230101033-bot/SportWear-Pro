<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-sm mx-auto px-4 py-24">
      <h1 class="font-heading text-2xl font-bold mb-6 text-center text-brand-text">Create Account</h1>
      <form @submit.prevent="handleRegister" class="space-y-3">
        <input v-model="name" required placeholder="Full name" class="w-full bg-brand-surface border border-neutral-800 rounded-lg px-3 py-2 text-sm text-brand-text placeholder:text-neutral-500 focus:outline-none focus:border-brand-accent transition-colors" />
        <input v-model="email" type="email" required placeholder="Email" class="w-full bg-brand-surface border border-neutral-800 rounded-lg px-3 py-2 text-sm text-brand-text placeholder:text-neutral-500 focus:outline-none focus:border-brand-accent transition-colors" />
        <input v-model="password" type="password" required placeholder="Password" minlength="6" class="w-full bg-brand-surface border border-neutral-800 rounded-lg px-3 py-2 text-sm text-brand-text placeholder:text-neutral-500 focus:outline-none focus:border-brand-accent transition-colors" />
        <button type="submit" :disabled="loading" class="w-full rounded-full bg-brand-accent text-black py-2.5 text-sm font-semibold hover:bg-brand-accentDark transition-colors disabled:opacity-60">
          {{ loading ? "Creating account..." : "Register" }}
        </button>
        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
      </form>
      <p class="text-sm text-center text-brand-muted mt-4">
        Already have an account?
        <router-link to="/login" class="text-brand-accent font-medium">Login</router-link>
      </p>
    </div>
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