<template>
  <footer class="bg-gray-50 border-t border-gray-100 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>&copy; {{ year }} SportWear Pro. All rights reserved.</p>
      <div class="flex items-center gap-4">
        <router-link to="/links" class="hover:text-black transition-colors">Quick Links</router-link>
        <router-link to="/payment-details" class="hover:text-black transition-colors">Payment Details</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
