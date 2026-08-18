<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center">
    <div class="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
  </div>

  <div v-else class="min-h-screen bg-white flex flex-col">
    <!-- Header Bar -->
    <div class="bg-black px-4 sm:px-6 py-3 flex items-center justify-between">
      <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-white">
        <span>💬</span>
        <span class="text-sm sm:text-base font-medium">{{ whatsappNumber }}</span>
      </a>
      <span class="font-heading font-bold text-lg sm:text-xl text-transparent bg-clip-text" style="background-image: linear-gradient(to right, #4d518a, #e27647); -webkit-background-clip: text; background-clip: text;">
        {{ brandName }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex-1 px-4 sm:px-8 py-8 sm:py-12 max-w-4xl mx-auto w-full">
      <router-link
        to="/"
        class="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-sm text-gray-700 hover:border-green-500 hover:text-green-600 px-4 py-2 rounded-full mb-8 transition-colors"
      >
        ← Back to Home
      </router-link>

      <div class="text-center mb-10">
        <h1 class="font-heading text-2xl sm:text-3xl font-bold tracking-wide text-black inline-block border-b-2 border-black pb-1 mb-3">
          PAYMENT METHOD
        </h1>
        <div class="mt-3">
          <p class="text-sm text-slate-700 mb-3">
            Select the payment method you used and click <strong>Confirm Payment</strong> after you complete the transfer via WhatsApp.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <select v-model="selectedMethod" class="border rounded px-3 py-2">
              <option v-for="m in PAYMENT_METHODS" :key="m.name" :value="m.name">{{ m.name }}</option>
            </select>
            <button
              @click="confirmPayment"
              :disabled="confirming"
              class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
            >
              {{ confirming ? "Confirming..." : "Confirm Payment" }}
            </button>
          </div>
          <div v-if="trackingId" class="mt-3 text-sm">
            Tracking ID: <strong class="font-mono">{{ trackingId }}</strong>
            <div class="text-xs text-slate-600">Save this ID and use it on the Track Order page.</div>
          </div>
          <div v-if="placeError" class="mt-2 text-red-600 text-sm">{{ placeError }}</div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="mb-10">
        <h3 class="font-heading text-lg sm:text-xl font-bold text-red-600 mb-3">PAYMENT METHOD:</h3>
        <p class="font-bold text-gray-800 text-sm sm:text-base mb-5">Payments Acceptable Through:</p>

        <div class="space-y-3">
          <div v-for="method in PAYMENT_METHODS" :key="method.name" class="flex items-center gap-3 py-3 border-b border-dashed border-gray-300">
            <span class="text-red-600">✔</span>
            <span class="font-medium text-gray-800 text-sm sm:text-base flex-1">{{ method.name }}</span>
            <div class="px-3 py-1.5 rounded text-xs font-bold" :class="method.badge">{{ method.short }}</div>
          </div>
        </div>
      </div>

      <!-- Bank Accounts -->
      <div v-if="accounts.length > 0" class="mb-10">
        <h3 class="font-heading text-lg sm:text-xl font-bold text-red-600 mb-4">BANK ACCOUNT DETAILS:</h3>
        <div class="space-y-4">
          <div v-for="acc in accounts" :key="acc._id" class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div class="bg-gradient-to-r from-black to-gray-700 px-5 py-3 flex items-center gap-3">
              <span class="text-white">🏦</span>
              <div>
                <h4 class="font-heading font-bold text-white text-sm">{{ acc.bankName }}</h4>
                <p v-if="acc.branch" class="text-white/60 text-xs">{{ acc.branch }}</p>
              </div>
            </div>
            <div class="divide-y divide-gray-50">
              <div class="flex items-center justify-between px-5 py-3">
                <div>
                  <p class="text-[11px] uppercase tracking-wider text-white font-medium">Account Title</p>
                  <p class="text-sm font-semibold mt-0.5">{{ acc.accountTitle }}</p>
                </div>
                <button @click="copyText(acc.accountTitle, acc._id + '-title')" class="text-gray-300 hover:text-gray-600 transition-colors">
                  {{ copied === acc._id + "-title" ? "✓" : "⧉" }}
                </button>
              </div>
              <div class="flex items-center justify-between px-5 py-3">
                <div>
                  <p class="text-[11px] uppercase tracking-wider text-white font-medium">Account Number</p>
                  <p class="text-sm font-semibold mt-0.5">{{ acc.accountNumber }}</p>
                </div>
                <button @click="copyText(acc.accountNumber, acc._id + '-num')" class="text-gray-300 hover:text-gray-600 transition-colors">
                  {{ copied === acc._id + "-num" ? "✓" : "⧉" }}
                </button>
              </div>
              <div v-if="acc.iban" class="flex items-center justify-between px-5 py-3">
                <div>
                  <p class="text-[11px] uppercase tracking-wider text-white font-medium">IBAN</p>
                  <p class="text-sm font-semibold mt-0.5 font-mono">{{ acc.iban }}</p>
                </div>
                <button @click="copyText(acc.iban, acc._id + '-iban')" class="text-gray-300 hover:text-gray-600 transition-colors">
                  {{ copied === acc._id + "-iban" ? "✓" : "⧉" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivery -->
      <div class="mb-8">
        <h3 class="font-heading text-lg sm:text-xl font-bold text-red-600 mb-3">DELIVERY SERVICES & METHOD:</h3>
        <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
          We send shipments worldwide via express, standard delivery, and reliable local couriers for domestic orders.
        </p>
        <div class="flex flex-wrap gap-4 mt-5">
          <div v-for="s in ['DHL Express', 'Standard Delivery', 'Local Courier']" :key="s" class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
            <span>🚚</span>
            <span class="font-medium text-sm text-gray-700">{{ s }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bar -->
    <div class="bg-black px-4 sm:px-6 py-3 flex items-center justify-between mt-auto">
      <span class="font-heading font-bold text-lg sm:text-xl text-transparent bg-clip-text" style="background-image: linear-gradient(to right, #4d518a, #e27647); -webkit-background-clip: text; background-clip: text;">{{ brandName }}</span>
      <a :href="whatsappLink" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-white">
        <span>💬</span>
        <span class="text-sm sm:text-base font-medium">{{ whatsappNumber }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import apiClient from "@/api/client";
import { useAuthStore } from "@/stores/auth";

const PAYMENT_METHODS = [
  { name: "Western Union", badge: "bg-yellow-400 text-black", short: "WU" },
  { name: "Money Gram", badge: "bg-red-600 text-white", short: "MG" },
  { name: "Bank Account Transfer", badge: "bg-gray-500 text-white", short: "🏦" },
];

const auth = useAuthStore();
const accounts = ref([]);
const settings = ref(null);
const loading = ref(true);
const copied = ref(null);
const selectedMethod = ref(PAYMENT_METHODS[0].name);
const confirming = ref(false);
const trackingId = ref(null);
const placeError = ref(null);

const whatsappNumber = computed(() => settings.value?.whatsappNumber || "+92 341 153 5353");
const brandName = computed(() => settings.value?.companyName || "LeahSport");
const whatsappLink = computed(() => `https://wa.me/${whatsappNumber.value.replace(/[^0-9]/g, "")}`);

function copyText(text, id) {
  navigator.clipboard.writeText(text);
  copied.value = id;
  setTimeout(() => (copied.value = null), 2000);
}

async function confirmPayment() {
  placeError.value = null;
  trackingId.value = null;
  confirming.value = true;
  try {
    const { data } = await apiClient.post("/orders", {
      userId: auth.user?.id || null,
      metadata: { paymentMethod: selectedMethod.value, source: "payment-details" },
    });
    trackingId.value = data.trackingId;
  } catch (e) {
    placeError.value = e.response?.data?.message || e.message;
  } finally {
    confirming.value = false;
  }
}

onMounted(async () => {
  try {
    const [accRes, settingsRes] = await Promise.all([
      apiClient.get("/bankaccounts"),
      apiClient.get("/settings"),
    ]);
    accounts.value = accRes.data || [];
    settings.value = settingsRes.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>