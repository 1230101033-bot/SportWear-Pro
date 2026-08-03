<template>
  <div class="max-w-xl mx-auto p-4 py-12">
    <h1 class="text-2xl font-semibold mb-4">Track Order</h1>

    <form @submit.prevent="handleSearch" class="flex gap-2 mb-4">
      <input
        v-model="trackingId"
        class="flex-1 border rounded px-3 py-2"
        placeholder="Enter tracking ID"
      />
      <button class="bg-slate-800 text-white rounded px-4 py-2" type="submit" :disabled="loading">
        {{ loading ? "Searching..." : "Track" }}
      </button>
    </form>

    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div v-if="order?.trackingId" class="border rounded p-4">
      <div class="mb-2">Tracking ID: <strong>{{ order.trackingId }}</strong></div>
      <div class="mb-2">Status: <strong>{{ statusLabels[order.status] || order.status }}</strong></div>
      <div class="mb-2">Last update: <strong>{{ order.updatedAt ? new Date(order.updatedAt).toLocaleString() : "" }}</strong></div>
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
