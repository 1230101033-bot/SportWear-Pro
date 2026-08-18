<template>
  <header class="bg-gradient-to-b from-black to-neutral-900 text-white sticky top-0 z-50 shadow-lg shadow-black/40 border-b border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3">
        <div class="h-14 w-14 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 ring-2 ring-white/20">
          <img src="/logo.png" alt="LeahSport" class="h-11 w-11 object-contain" />
        </div>
        <span class="font-heading font-extrabold text-2xl tracking-tight">
          <span style="color: #4d518a">Leah</span><span style="color: #e27647">Sport</span>
        </span>
      </router-link>

      <nav class="hidden md:flex items-center gap-7 text-sm font-medium">
        <router-link to="/" class="hover:text-lime-400 transition-colors">Home</router-link>
        <router-link to="/categories" class="hover:text-lime-400 transition-colors">Categories</router-link>
        <router-link to="/about" class="hover:text-lime-400 transition-colors">About</router-link>
        <router-link to="/contact" class="hover:text-lime-400 transition-colors">Contact</router-link>
        <router-link to="/track-order" class="hover:text-lime-400 transition-colors">Track Order</router-link>
      </nav>

      <div class="flex items-center gap-4 text-sm">
        <router-link v-if="!auth.isAuthenticated" to="/login" class="hover:text-lime-400 transition-colors">Login</router-link>
        <router-link v-if="auth.isAdmin" to="/admin" class="hover:text-lime-400 transition-colors">Admin</router-link>
        <button v-if="auth.isAuthenticated" @click="handleLogout" class="hover:text-lime-400 transition-colors">Logout</button>
        <button class="md:hidden text-2xl" @click="menuOpen = !menuOpen" aria-label="Menu">☰</button>
      </div>
    </div>

    <div v-if="menuOpen" class="md:hidden bg-neutral-900 border-t border-neutral-800 px-4 py-4 flex flex-col gap-4 text-sm">
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