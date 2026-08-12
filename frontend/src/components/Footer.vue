<template>
  <footer class="bg-gray-950 text-gray-400 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
      <div class="col-span-2 sm:col-span-1">
        <div class="flex items-center gap-2 mb-3">
          <div class="h-9 w-9 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
  <img src="/logo.png" alt="LeahSport" class="h-7 w-7 object-contain" />
</div>
          <span class="text-white font-heading font-bold text-base">LeahSport</span>
        </div>
        <p class="text-sm">Premium custom sportswear for teams and clubs.</p>
      </div>

      <div>
        <h4 class="text-white font-semibold text-sm mb-3">Quick Links</h4>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/" class="hover:text-white transition-colors">Home</router-link></li>
          <li><router-link to="/categories" class="hover:text-white transition-colors">Categories</router-link></li>
          <li><router-link to="/about" class="hover:text-white transition-colors">About</router-link></li>
          <li><router-link to="/contact" class="hover:text-white transition-colors">Contact</router-link></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold text-sm mb-3">Payment Details</h4>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/payment-details" class="hover:text-white transition-colors">Payment Details</router-link></li>
          <li><router-link to="/track-order" class="hover:text-white transition-colors">Track Order</router-link></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold text-sm mb-3">Contact</h4>
        <p class="text-sm">support@leahsport.com</p>
      </div>
    </div>

    <div class="border-t border-gray-800 py-5 text-center text-xs">
      &copy; {{ year }} LeahSport. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>