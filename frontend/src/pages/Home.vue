<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-black text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div class="max-w-2xl">
          <p class="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-4">Premium Sportswear Supplier</p>
          <h1 class="font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Custom Sports<br />Uniforms
          </h1>
          <p class="text-gray-400 text-lg mb-8 leading-relaxed">
            High quality custom sportswear for teams and clubs. Football, basketball, rugby, hockey and more.
          </p>
          <router-link to="/categories" class="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">
            Browse Categories →
          </router-link>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-2">Our Collection</p>
          <h2 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight">Categories</h2>
        </div>
        <router-link to="/categories" class="text-sm font-medium text-gray-500 hover:text-black transition-colors">View all →</router-link>
      </div>

      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="i in 8" :key="i" class="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
      </div>
      <div v-else-if="categories.length === 0" class="text-center py-20">
        <p class="text-gray-400 text-sm">No categories yet. Admin can add categories from the admin panel.</p>
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
            <p class="text-white/60 text-xs mt-1">View Products →</p>
          </div>
        </router-link>
      </div>
    </section>
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
