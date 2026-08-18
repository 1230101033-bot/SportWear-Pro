<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 py-16">
    <router-link
      to="/"
      class="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:border-gray-400 hover:text-black px-4 py-2 rounded-full mb-8 transition-colors"
    >
      ← Back to Home
    </router-link>

    <div class="text-center mb-10">
      <div class="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4 overflow-hidden">
        <img src="/logo.png" alt="LeahSport" class="h-12 w-12 object-contain" />
      </div>
      <h1 class="font-heading text-2xl font-bold tracking-tight">
        <span style="color: #4d518a">Leah</span><span style="color: #e27647">Sport</span>
      </h1>
      <p class="text-white text-sm mt-1">All our important links</p>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="h-14 rounded-2xl bg-gray-100 animate-pulse" />
    </div>
    <div v-else-if="links.length === 0" class="text-center py-10">
      <p class="text-white text-sm">No links added yet.</p>
    </div>
    <div v-else class="space-y-3">
      <a
        v-for="link in links"
        :key="link._id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-between w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:border-gray-200 transition-all duration-200"
      >
        <div class="flex items-center gap-3">
          <span v-if="link.icon" class="text-lg">{{ link.icon }}</span>
          <span class="font-medium text-sm">{{ link.title }}</span>
        </div>
        <span class="text-gray-300">↗</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/api/client";

const links = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await apiClient.get("/quicklinks");
    links.value = data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>