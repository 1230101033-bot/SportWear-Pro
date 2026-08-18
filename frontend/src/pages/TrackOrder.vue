<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-xl mx-auto px-4 py-16">
      <router-link
        to="/"
        class="inline-flex items-center gap-1.5 bg-brand-surface border border-neutral-700 text-sm text-brand-text hover:border-brand-accent hover:text-brand-accent px-4 py-2 rounded-full mb-8 transition-colors"
      >
        ← Back to Home
      </router-link>

      <h1 class="font-heading text-2xl font-bold mb-6 text-brand-text">Track Order</h1>

      <form @submit.prevent="handleSearch" class="flex gap-2 mb-4">
        <input
          v-model="trackingId"
          class="flex-1 bg-brand-surface border border-neutral-800 rounded-lg px-3 py-2 text-sm text-brand-text placeholder:text-neutral-500 focus:outline-none focus:border-brand-accent transition-colors"
          placeholder="Enter tracking ID"
        />
        <button class="bg-brand-accent text-black font-semibold rounded-lg px-5 py-2 text-sm hover:bg-brand-accentDark transition-colors disabled:opacity-60" type="submit" :disabled="loading">
          {{ loading ? "Searching..." : "Track" }}
        </button>
      </form>

      <div v-if="error" class="text-red-400 text-sm mb-4">{{ error }}</div>

      <div v-if="order?.trackingId" class="bg-brand-surface border border-neutral-800 rounded-2xl p-5">
        <div class="mb-2 text-sm text-white">Tracking ID: <strong class="text-brand-text font-mono">{{ order.trackingId }}</strong></div>
        <div class="mb-2 text-sm text-white">Status: <strong class="text-brand-accent">{{ statusLabels[order.status] || order.status }}</strong></div>
        <div class="mb-2 text-sm text-white">Last update: <strong class="text-brand-text">{{ order.updatedAt ? new Date(order.updatedAt).toLocaleString() : "" }}</strong></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import apiClient from "@/api/client";

const statusLabels = {
  pending: "Pending / Awaiting Processing",
  processing: "Under Process",
  customization: "Under Customization",
  with_courier: "With Courier",
  delivered: "Delivered",
};

const trackingId = ref("");
const loading = ref(false);
const order = ref({});
const error = ref("");

async function handleSearch() {
  error.value = "";
  order.value = {};
  if (!trackingId.value) {
    error.value = "Enter a tracking ID";
    return;
  }
  loading.value = true;
  try {
    const { data } = await apiClient.get(`/orders/track/${trackingId.value.trim()}`);
    order.value = data;
  } catch (e) {
    error.value = e.response?.data?.message || "No order found for this Tracking ID";
  } finally {
    loading.value = false;
  }
}
</script>