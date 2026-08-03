<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10">
    <router-link
      :to="product?.category ? `/category/${product.category}` : '/categories'"
      class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-8 transition-colors"
    >
      ← Back
    </router-link>

    <div v-if="loading" class="grid md:grid-cols-2 gap-8">
      <div class="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
      <div class="space-y-4">
        <div class="h-8 w-48 bg-gray-100 rounded animate-pulse" />
        <div class="h-20 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>

    <div v-else-if="!product" class="py-20 text-center">
      <p class="text-gray-400">Product not found.</p>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-8 lg:gap-12">
      <!-- Images -->
      <div>
        <div class="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
          <img :src="allImages[currentImg]" :alt="product.name" class="w-full h-full object-cover" />
          <template v-if="allImages.length > 1">
            <button
              @click="prevImage"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition"
            >‹</button>
            <button
              @click="nextImage"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition"
            >›</button>
          </template>
        </div>
        <div v-if="allImages.length > 1" class="flex gap-2 mt-3 overflow-x-auto pb-2">
          <button
            v-for="(img, i) in allImages"
            :key="i"
            @click="currentImg = i"
            class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition"
            :class="i === currentImg ? 'border-black' : 'border-transparent'"
          >
            <img :src="img" alt="" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Details: only name + a single description detail. No price, no stock. -->
      <div>
        <h1 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{{ product.name }}</h1>

        <p v-if="product.description" class="text-gray-600 mt-4 leading-relaxed">
          {{ product.description }}
        </p>

        <!-- Button 1: WhatsApp - "deal ho gayi" -->
        <a v-if="whatsappUrl" :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="mt-8 block">
          <button class="w-full bg-green-600 hover:bg-green-700 text-white rounded-full h-12 text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
            💬 Order via WhatsApp
          </button>
        </a>

        <!-- Button 2: View payment / transfer methods -->
        <router-link to="/payment-details" class="mt-4 block">
          <div class="p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm">💳</div>
              <div>
                <h3 class="font-semibold text-sm">View Payment Method</h3>
                <p class="text-xs text-gray-400 mt-0.5">See available bank transfer methods</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import apiClient from "@/api/client";

const route = useRoute();
const product = ref(null);
const settings = ref(null);
const loading = ref(true);
const currentImg = ref(0);

const fallbackImg = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=600&fit=crop";

const allImages = computed(() => {
  if (!product.value) return [fallbackImg];
  const imgs = [product.value.imageUrl, ...(product.value.additionalImages || [])].filter(Boolean);
  return imgs.length ? imgs : [fallbackImg];
});

const whatsappUrl = computed(() => {
  if (!settings.value?.whatsappNumber || !product.value) return null;
  const msg = `Hi! I'm interested in ordering: ${product.value.name}`;
  const number = settings.value.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
});

function prevImage() {
  currentImg.value = currentImg.value === 0 ? allImages.value.length - 1 : currentImg.value - 1;
}
function nextImage() {
  currentImg.value = currentImg.value === allImages.value.length - 1 ? 0 : currentImg.value + 1;
}

onMounted(async () => {
  const productId = route.params.productId;
  try {
    const [prodRes, settingsRes] = await Promise.all([
      apiClient.get(`/products/${productId}`),
      apiClient.get(`/settings`),
    ]);
    product.value = prodRes.data;
    settings.value = settingsRes.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
