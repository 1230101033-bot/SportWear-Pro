<template>
  <header class="bg-black text-white sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2">
       <div class="h-10 w-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
  <img src="/logo.png" alt="LeahSport" class="h-8 w-8 object-contain" />
</div>
        <span class="font-heading font-bold text-lg tracking-tight">LeahSport</span>
      </router-link>

      <nav class="hidden md:flex items-center gap-6 text-sm">
        <router-link to="/" class="hover:text-gray-300 transition-colors">Home</router-link>
        <router-link to="/categories" class="hover:text-gray-300 transition-colors">Categories</router-link>
        <router-link to="/about" class="hover:text-gray-300 transition-colors">About</router-link>
        <router-link to="/contact" class="hover:text-gray-300 transition-colors">Contact</router-link>
        <router-link to="/track-order" class="hover:text-gray-300 transition-colors">Track Order</router-link>
      </nav>

      <div class="flex items-center gap-3 text-sm">
        <router-link v-if="!auth.isAuthenticated" to="/login" class="hover:text-gray-300 transition-colors">Login</router-link>
        <router-link v-if="auth.isAdmin" to="/admin" class="hover:text-gray-300 transition-colors">Admin</router-link>
        <button v-if="auth.isAuthenticated" @click="handleLogout" class="hover:text-gray-300 transition-colors">Logout</button>
        <button class="md:hidden" @click="menuOpen = !menuOpen" aria-label="Menu">☰</button>
      </div>
    </div>

    <div v-if="menuOpen" class="md:hidden bg-black border-t border-gray-800 px-4 py-3 flex flex-col gap-3 text-sm">
      <router-link to="/" @click="menuOpen = false">Home</router-link>
      <router-link to="/categories" @click="menuOpen = false">Categories</router-link>
      <router-link to="/about" @click="menuOpen = false">About</router-link>
      <router-link to="/contact" @click="menuOpen = false">Contact</router-link>
      <router-link to="/track-order" @click="menuOpen = false">Track Order</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const menuOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();

function handleLogout() {
  auth.logout();
  router.push("/");
}
</script>