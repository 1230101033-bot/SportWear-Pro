<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <router-link
        :to="product?.category ? `/category/${product.category}` : '/categories'"
        class="inline-flex items-center gap-1.5 bg-brand-surface border border-neutral-700 text-sm text-brand-text hover:border-brand-accent hover:text-brand-accent px-4 py-2 rounded-full mb-8 transition-colors"
      >
        ← Back
      </router-link>

      <div v-if="loading" class="grid md:grid-cols-2 gap-8">
        <div class="aspect-square rounded-2xl bg-brand-surface animate-pulse" />
        <div class="space-y-4">
          <div class="h-8 w-48 bg-brand-surface rounded animate-pulse" />
          <div class="h-20 bg-brand-surface rounded animate-pulse" />
        </div>
      </div>

      <div v-else-if="!product" class="py-20 text-center">
        <p class="text-brand-muted">Product not found.</p>
      </div>

      <div v-else class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <!-- Images -->
        <div>
          <div class="relative aspect-square rounded-2xl overflow-hidden bg-brand-surface">
            <img :src="allImages[currentImg]" :alt="product.name" class="w-full h-full object-cover" />
            <template v-if="allImages.length > 1">
              <button
                @click="prevImage"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-brand-text hover:bg-black transition"
              >‹</button>
              <button
                @click="nextImage"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/70 backdrop-blur rounded-full flex items-center justify-center text-brand-text hover:bg-black transition"
              >›</button>
            </template>
          </div>
          <div v-if="allImages.length > 1" class="flex gap-2 mt-3 overflow-x-auto pb-2">
            <button
              v-for="(img, i) in allImages"
              :key="i"
              @click="currentImg = i"
              class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition"
              :class="i === currentImg ? 'border-brand-accent' : 'border-transparent'"
            >
              <img :src="img" alt="" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Details: only name + a single description detail. No price, no stock. -->
        <div>
          <h1 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-brand-text">{{ product.name }}</h1>

          <p v-if="product.description" class="text-white mt-4 leading-relaxed">
            {{ product.description }}
          </p>

          <!-- Quick facts pills -->
          <div class="flex flex-wrap gap-2 mt-6">
            <span class="bg-brand-surface border border-neutral-800 text-brand-text text-xs px-3 py-1.5 rounded-full">MOQ 20–25 pcs per design</span>
            <span class="bg-brand-surface border border-neutral-800 text-brand-text text-xs px-3 py-1.5 rounded-full">Free 24h digital mockup</span>
            <span class="bg-brand-surface border border-neutral-800 text-brand-text text-xs px-3 py-1.5 rounded-full">Production 15–25 business days</span>
            <span class="bg-brand-surface border border-neutral-800 text-brand-text text-xs px-3 py-1.5 rounded-full">Ships worldwide from Sialkot</span>
            <span class="bg-brand-surface border border-neutral-800 text-brand-text text-xs px-3 py-1.5 rounded-full">Private-label ready</span>
          </div>

          <!-- Button 1: WhatsApp - "deal ho gayi" -->
          <a v-if="whatsappUrl" :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="mt-8 block">
            <button class="w-full bg-green-600 hover:bg-green-700 text-white rounded-full h-12 text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              💬 Order via WhatsApp
            </button>
          </a>

          <!-- Button 2: View payment / transfer methods -->
          <router-link to="/payment-details" class="mt-4 block">
            <div class="p-5 bg-brand-surface border border-neutral-800 rounded-2xl hover:border-brand-accent/50 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center flex-shrink-0 text-black text-sm">💳</div>
                <div>
                  <h3 class="font-semibold text-sm text-brand-text">View Payment Method</h3>
                  <p class="text-xs text-brand-muted mt-0.5">See available bank transfer methods</p>
                </div>
              </div>
            </div>
          </router-link>

          <!-- Specifications & Options -->
          <div class="mt-10">
            <h2 class="font-heading text-xl font-bold tracking-tight text-brand-text mb-1">
              Specifications & <span class="text-brand-accent">Options</span>
            </h2>
            <div class="mt-4 rounded-2xl border border-neutral-800 overflow-hidden">
              <div class="grid grid-cols-3 bg-brand-surface/60">
                <div class="col-span-1 p-4 text-sm font-semibold text-brand-text border-b border-r border-neutral-800">Fabric options</div>
                <div class="col-span-2 p-4 text-sm text-white border-b border-neutral-800">140–180 GSM 100% polyester dot mesh, moisture-wicking</div>
              </div>
              <div class="grid grid-cols-3 bg-brand-surface/60">
                <div class="col-span-1 p-4 text-sm font-semibold text-brand-text border-b border-r border-neutral-800">Decoration</div>
                <div class="col-span-2 p-4 text-sm text-white border-b border-neutral-800">Full dye-sublimation, numbers and lettering included</div>
              </div>
              <div class="grid grid-cols-3 bg-brand-surface/60">
                <div class="col-span-1 p-4 text-sm font-semibold text-brand-text border-b border-r border-neutral-800">Fit</div>
                <div class="col-span-2 p-4 text-sm text-white border-b border-neutral-800">Cut to fit over base layers, youth patterns available</div>
              </div>
              <div class="grid grid-cols-3 bg-brand-surface/60">
                <div class="col-span-1 p-4 text-sm font-semibold text-brand-text border-b border-r border-neutral-800">Sampling</div>
                <div class="col-span-2 p-4 text-sm text-white border-b border-neutral-800">Free digital mockup; physical sample in 7 days at cost, credited to bulk order</div>
              </div>
              <div class="grid grid-cols-3 bg-brand-surface/60">
                <div class="col-span-1 p-4 text-sm font-semibold text-brand-text border-b border-r border-neutral-800">Production time</div>
                <div class="col-span-2 p-4 text-sm text-white border-b border-neutral-800">15–25 business days; rush 7–12 days</div>
              </div>
              <div class="grid grid-cols-3 bg-brand-surface/60">
                <div class="col-span-1 p-4 text-sm font-semibold text-brand-text border-b border-r border-neutral-800">Shipping</div>
                <div class="col-span-2 p-4 text-sm text-white border-b border-neutral-800">Worldwide via DHL/FedEx, freight for bulk orders</div>
              </div>
              <div class="grid grid-cols-3 bg-brand-surface/60">
                <div class="col-span-1 p-4 text-sm font-semibold text-brand-text border-r border-neutral-800">Private label</div>
                <div class="col-span-2 p-4 text-sm text-white">Woven neck labels, branded polybags</div>
              </div>
            </div>
          </div>

          <!-- Customisation Options -->
          <div class="mt-10">
            <h2 class="font-heading text-xl font-bold tracking-tight text-brand-text mb-4">
              Customisation <span class="text-brand-accent">Options</span>
            </h2>
            <ul class="space-y-3">
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Any colourway, matched to Pantone references
              </li>
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Player names and numbers, sublimated or in tackle twill
              </li>
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Sponsor logos in any position
              </li>
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Club crests embroidered or printed
              </li>
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Reinforced side panels and stretch mesh inserts
              </li>
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Elastic or standard hem and cuff options
              </li>
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Youth and women's cuts alongside adult sizing
              </li>
              <li class="flex items-start gap-2 text-sm text-white">
                <span class="text-brand-accent mt-0.5">✔</span>
                Own-label neck tape, size tags and hang tags
              </li>
            </ul>
          </div>
        </div>
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