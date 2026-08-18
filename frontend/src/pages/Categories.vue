<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <router-link
        to="/"
        class="inline-flex items-center gap-1.5 bg-brand-surface border border-neutral-700 text-sm text-brand-text hover:border-brand-accent hover:text-brand-accent px-4 py-2 rounded-full mb-8 transition-colors"
      >
        ← Back to Home
      </router-link>

      <div class="mb-10">
        <p class="text-xs font-medium tracking-[0.2em] uppercase text-brand-accent mb-2">Browse</p>
        <h1 class="font-heading text-3xl font-bold tracking-tight text-brand-text">All Categories</h1>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        <div v-for="i in 8" :key="i" class="aspect-[3/4] rounded-2xl bg-brand-surface animate-pulse" />
      </div>
      <div v-else-if="categories.length === 0" class="text-center py-20">
        <p class="text-white">No categories yet.</p>
      </div>
      <div v-else ref="gridEl" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        <router-link
          v-for="cat in categories"
          :key="cat._id"
          :to="`/category/${cat._id}`"
          class="reveal-card group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white ring-1 ring-neutral-800 hover:ring-brand-accent/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/10 transition-all duration-300"
        >
          <img
            :src="cat.imageUrl || fallbackImg"
            :alt="cat.name"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <h3 class="font-heading font-semibold text-brand-text text-sm sm:text-base mb-2">{{ cat.name }}</h3>
            <p v-if="cat.description" class="text-white text-xs mt-1 mb-2 line-clamp-2">{{ cat.description }}</p>
            <span class="inline-flex items-center gap-1 bg-brand-accent text-black text-xs font-semibold px-3 py-1.5 rounded-full">
              View Products →
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import apiClient from "@/api/client";

const categories = ref([]);
const loading = ref(true);
const fallbackImg = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop";

const gridEl = ref(null);
let observer;

function setupScrollReveal() {
  const cards = gridEl.value?.querySelectorAll(".reveal-card");
  if (!cards || cards.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));
}

onMounted(async () => {
  try {
    const { data } = await apiClient.get("/categories");
    categories.value = data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    await nextTick();
    setupScrollReveal();
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.reveal-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal-card.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>