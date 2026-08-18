<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <router-link
        to="/categories"
        class="inline-flex items-center gap-1.5 bg-brand-surface border border-neutral-700 text-sm text-brand-text hover:border-brand-accent hover:text-brand-accent px-4 py-2 rounded-full mb-6 transition-colors"
      >
        ← Back to Categories
      </router-link>

      <div v-if="loading">
        <div class="h-6 w-40 bg-brand-surface rounded animate-pulse mb-8" />
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="i in 8" :key="i" class="aspect-square rounded-2xl bg-brand-surface animate-pulse" />
        </div>
      </div>

      <div v-else>
        <!-- Hero Banner -->
        <div class="relative rounded-3xl overflow-hidden mb-2 bg-neutral-900">
          <img
            :src="category?.imageUrl || fallbackImg"
            :alt="category?.name"
            class="w-full h-64 sm:h-80 object-cover object-center"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
          <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <span class="inline-flex w-fit items-center gap-1.5 bg-brand-accent text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              ● CATEGORY
            </span>
            <h1 class="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.05] mb-3">
              {{ category?.name || "Products" }}
            </h1>
            <p v-if="category?.description" class="text-gray-300 text-sm sm:text-base max-w-xl">
              {{ category.description }}
            </p>
          </div>
        </div>

        <!-- Green Info Strip -->
        <div class="bg-brand-accent rounded-2xl px-5 sm:px-8 py-4 mb-10 text-center">
          <p class="text-black font-semibold text-sm sm:text-base">
            Fully customizable with your team colors, logo, names & numbers — free digital mockup on request.
          </p>
        </div>

        <div v-if="products.length === 0" class="text-center py-20">
          <p class="text-white">No products in this category yet.</p>
        </div>
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <router-link
            v-for="product in products"
            :key="product._id"
            :to="`/product/${product._id}`"
            class="group bg-brand-surface rounded-2xl overflow-hidden border border-neutral-800 hover:border-brand-accent/50 hover:shadow-lg hover:shadow-brand-accent/10 transition-all duration-300"
          >
            <div class="aspect-square bg-neutral-900 overflow-hidden">
              <img
                :src="product.imageUrl || fallbackImg"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-3 sm:p-4">
              <h3 class="font-medium text-sm text-brand-text line-clamp-1">{{ product.name }}</h3>
            </div>
          </router-link>
        </div>
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