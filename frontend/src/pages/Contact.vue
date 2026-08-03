<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <h1 class="font-heading text-3xl sm:text-4xl font-bold tracking-tight mb-6">Contact Us</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Contact Methods -->
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">✉️</div>
          <div>
            <p class="font-medium text-sm">Email</p>
            <a href="mailto:info@sportwearpro.com" class="text-sm text-gray-500 hover:text-black transition-colors">info@sportwearpro.com</a>
          </div>
        </div>

        <div v-if="settings?.whatsappNumber" class="flex items-start gap-3">
          <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">💬</div>
          <div>
            <p class="font-medium text-sm">WhatsApp</p>
            <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-500 hover:text-black transition-colors">{{ settings.whatsappNumber }}</a>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">📍</div>
          <div>
            <p class="font-medium text-sm">Location</p>
            <p class="text-sm text-gray-500">We ship nationwide</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">Name</label>
          <input v-model="form.name" required placeholder="Your name" class="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
          <input v-model="form.email" type="email" required placeholder="you@example.com" class="w-full border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="text-xs font-medium text-gray-500 mb-1.5 block">Message</label>
          <textarea v-model="form.message" required rows="4" placeholder="How can we help?" class="w-full border rounded-lg px-3 py-2 text-sm"></textarea>
        </div>
        <button type="submit" :disabled="sending" class="w-full rounded-full bg-black text-white py-2.5 text-sm font-semibold disabled:opacity-60">
          {{ sending ? "Sending..." : "Send Message" }}
        </button>
        <p v-if="sent" class="text-green-600 text-sm text-center">Message sent! We'll get back to you soon.</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import apiClient from "@/api/client";

const form = ref({ name: "", email: "", message: "" });
const sending = ref(false);
const sent = ref(false);
const settings = ref(null);

const whatsappUrl = computed(() =>
  settings.value?.whatsappNumber ? `https://wa.me/${settings.value.whatsappNumber.replace(/[^0-9]/g, "")}` : "#"
);

async function handleSubmit() {
  sending.value = true;
  sent.value = false;
  try {
    const mailto = `mailto:info@sportwearpro.com?subject=${encodeURIComponent(
      `Contact form: ${form.value.name}`
    )}&body=${encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`)}`;
    window.open(mailto, "_blank");
    sent.value = true;
    form.value = { name: "", email: "", message: "" };
  } finally {
    sending.value = false;
  }
}

onMounted(async () => {
  try {
    const { data } = await apiClient.get("/settings");
    settings.value = data;
  } catch (e) {
    console.error(e);
  }
});
</script>
