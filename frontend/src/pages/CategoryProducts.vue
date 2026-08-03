<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10">
    <router-link to="/categories" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-6 transition-colors">
      ← Back to Categories
    </router-link>

    <div v-if="loading">
      <div class="h-6 w-40 bg-gray-100 rounded animate-pulse mb-8" />
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="i in 8" :key="i" class="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    </div>

    <div v-else>
      <div class="mb-10">
        <h1 class="font-heading text-3xl font-bold tracking-tight">{{ category?.name || "Products" }}</h1>
        <p v-if="category?.description" class="text-gray-500 mt-2">{{ category.description }}</p>
      </div>

      <div v-if="products.length === 0" class="text-center py-20">
        <p class="text-gray-400">No products in this category yet.</p>
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <router-link
          v-for="product in products"
          :key="product._id"
          :to="`/product/${product._id}`"
          class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        >
          <div class="aspect-square bg-gray-50 overflow-hidden">
            <img
              :src="product.imageUrl || fallbackImg"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-3 sm:p-4">
            <h3 class="font-medium text-sm line-clamp-1">{{ product.name }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import apiClient from "@/api/client";

const route = useRoute();
const category = ref(null);
const products = ref([]);
const loading = ref(true);
const fallbackImg = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop";

onMounted(async () => {
  const categoryId = route.params.categoryId;
  try {
    const [catRes, prodRes] = await Promise.all([
      apiClient.get(`/categories/${categoryId}`),
      apiClient.get(`/products`, { params: { category: categoryId } }),
    ]);
    category.value = catRes.data;
    products.value = prodRes.data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
