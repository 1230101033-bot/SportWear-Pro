<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
    <div class="mb-10">
      <p class="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">Browse</p>
      <h1 class="font-heading text-3xl font-bold tracking-tight">All Categories</h1>
    </div>

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <div v-for="i in 8" :key="i" class="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
    </div>
    <div v-else-if="categories.length === 0" class="text-center py-20">
      <p class="text-gray-400">No categories yet.</p>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <router-link
        v-for="cat in categories"
        :key="cat._id"
        :to="`/category/${cat._id}`"
        class="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100"
      >
        <img
          :src="cat.imageUrl || fallbackImg"
          :alt="cat.name"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 class="font-heading font-semibold text-white text-sm sm:text-base">{{ cat.name }}</h3>
          <p v-if="cat.description" class="text-white/60 text-xs mt-1 line-clamp-2">{{ cat.description }}</p>
          <p class="text-white/60 text-xs mt-1">View Products →</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/api/client";

const categories = ref([]);
const loading = ref(true);
const fallbackImg = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop";

onMounted(async () => {
  try {
    const { data } = await apiClient.get("/categories");
    categories.value = data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
