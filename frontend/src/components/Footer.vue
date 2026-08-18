<template>
  <footer class="bg-brand-bg text-white mt-16 border-t border-neutral-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
      <div class="col-span-2 sm:col-span-1">
        <div class="flex items-center gap-2 mb-3">
          <div class="h-9 w-9 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <img src="/logo.png" alt="LeahSport" class="h-7 w-7 object-contain" />
          </div>
          <span class="font-heading font-bold text-base">
            <span style="color: #4d518a">Leah</span><span style="color: #e27647">Sport</span>
          </span>
        </div>
        <p class="text-sm">Premium custom sportswear for teams and clubs.</p>
      </div>

      <div>
        <h4 class="text-brand-text font-semibold text-sm mb-3">Quick Links</h4>
        <ul v-if="quickLinks.length > 0" class="space-y-2 text-sm">
          <li v-for="link in quickLinks" :key="link._id">
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 hover:text-brand-accent transition-colors">
              <img v-if="link.title.toLowerCase().includes('whatsapp')" src="/icons/whatsapp.png" alt="WhatsApp" class="w-4 h-4" />
              <img v-else-if="link.title.toLowerCase().includes('instagram')" src="/icons/instagram.png" alt="Instagram" class="w-4 h-4" />
              <img v-else-if="link.title.toLowerCase().includes('facebook')" src="/icons/facebook.png" alt="Facebook" class="w-4 h-4" />
              {{ link.title }}
            </a>
          </li>
        </ul>
        <ul v-else class="space-y-2 text-sm">
          <li><router-link to="/" class="hover:text-brand-accent transition-colors">Home</router-link></li>
          <li><router-link to="/categories" class="hover:text-brand-accent transition-colors">Categories</router-link></li>
          <li><router-link to="/about" class="hover:text-brand-accent transition-colors">About</router-link></li>
          <li><router-link to="/contact" class="hover:text-brand-accent transition-colors">Contact</router-link></li>
        </ul>
     <router-link to="/links" class="inline-block mt-3 text-xs text-white hover:text-white transition-colors">
  View All Links →
</router-link>
      </div>

      <div>
        <h4 class="text-brand-text font-semibold text-sm mb-3">Payment Details</h4>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/payment-details" class="hover:text-brand-accent transition-colors">Payment Details</router-link></li>
          <li><router-link to="/track-order" class="hover:text-brand-accent transition-colors">Track Order</router-link></li>
        </ul>
      </div>

      <div>
        <h4 class="text-brand-text font-semibold text-sm mb-3">Contact</h4>
        <p class="text-sm">Leahsports0@gmail.com</p>
      </div>
    </div>

    <div class="border-t border-neutral-900 py-5 text-center text-xs">
      &copy; {{ year }} LeahSport. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/api/client";

const year = new Date().getFullYear();
const quickLinks = ref([]);

onMounted(async () => {
  try {
    const { data } = await apiClient.get("/quicklinks");
    quickLinks.value = data || [];
  } catch (e) {
    console.error(e);
    // agar API fail ho jaye, quickLinks khali rahega aur fallback (Home/Categories/About/Contact) show hoga
  }
});
</script>