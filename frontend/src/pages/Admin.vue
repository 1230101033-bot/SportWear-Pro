<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 class="font-heading text-2xl font-bold mb-6 text-brand-text">Admin Panel</h1>

      <div class="flex flex-wrap gap-2 mb-8 border-b border-neutral-800">
        <button
          v-for="t in tabs"
          :key="t"
          @click="activeTab = t"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === t ? 'border-brand-accent text-brand-accent' : 'border-transparent text-brand-muted hover:text-brand-text'"
        >
          {{ t }}
        </button>
      </div>

      <!-- CATEGORIES -->
      <section v-if="activeTab === 'Categories'">
        <form @submit.prevent="createCategory" class="grid sm:grid-cols-4 gap-2 mb-6">
          <input v-model="newCategory.name" placeholder="Name" required class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <input v-model="newCategory.description" placeholder="Description" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <div class="space-y-1">
            <label class="block w-full cursor-pointer">
              <span class="sr-only">Upload category image</span>
              <div class="w-full text-left border border-neutral-800 rounded px-3 py-2 text-sm bg-brand-surface text-brand-text hover:bg-neutral-800">
                {{ categoryFileName || "Select category image" }}
              </div>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload($event, 'category')"
                class="hidden"
              />
            </label>
            <input
              v-model="newCategory.imageUrl"
              placeholder="Image URL"
              readonly
              class="border border-neutral-800 rounded px-3 py-2 text-sm w-full bg-neutral-900 text-brand-muted"
            />
            <p class="text-xs text-brand-muted" v-if="uploadStatus.category">{{ uploadStatus.category }}</p>
          </div>
          <button class="bg-brand-accent text-black font-semibold rounded px-4 py-2 text-sm hover:bg-brand-accentDark transition-colors">Add Category</button>
        </form>
        <div class="space-y-2">
          <div v-for="c in categories" :key="c._id" class="flex items-center justify-between bg-brand-surface border border-neutral-800 rounded px-4 py-2 text-sm text-brand-text">
            <span>{{ c.name }}</span>
            <button @click="deleteCategory(c._id)" class="text-red-400 text-xs hover:text-red-300">Delete</button>
          </div>
        </div>
      </section>

      <!-- PRODUCTS (no price / stock fields) -->
      <section v-if="activeTab === 'Products'">
        <form @submit.prevent="createProduct" class="grid sm:grid-cols-2 gap-2 mb-6">
          <input v-model="newProduct.name" placeholder="Product name" required class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <select v-model="newProduct.category" class="bg-brand-surface border border-neutral-800 text-brand-text rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent">
            <option value="">No category</option>
            <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
          </select>
          <textarea v-model="newProduct.description" placeholder="Detail / description" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:border-brand-accent" rows="2"></textarea>
          <div class="space-y-1 sm:col-span-2">
            <label class="block w-full cursor-pointer">
              <span class="sr-only">Upload product image</span>
              <div class="w-full text-left border border-neutral-800 rounded px-3 py-2 text-sm bg-brand-surface text-brand-text hover:bg-neutral-800">
                {{ productFileName || "Select product image" }}
              </div>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload($event, 'product')"
                class="hidden"
              />
            </label>
            <input
              v-model="newProduct.imageUrl"
              placeholder="Image URL"
              readonly
              class="border border-neutral-800 rounded px-3 py-2 text-sm w-full bg-neutral-900 text-brand-muted"
            />
            <p class="text-xs text-brand-muted" v-if="uploadStatus.product">{{ uploadStatus.product }}</p>
          </div>
          <button class="bg-brand-accent text-black font-semibold rounded px-4 py-2 text-sm sm:col-span-2 hover:bg-brand-accentDark transition-colors">Add Product</button>
        </form>
        <div class="space-y-2">
          <div v-for="p in products" :key="p._id" class="flex items-center justify-between bg-brand-surface border border-neutral-800 rounded px-4 py-2 text-sm text-brand-text">
            <span>{{ p.name }}</span>
            <button @click="deleteProduct(p._id)" class="text-red-400 text-xs hover:text-red-300">Delete</button>
          </div>
        </div>
      </section>

      <!-- QUICK LINKS -->
      <section v-if="activeTab === 'Quick Links'">
        <form @submit.prevent="createLink" class="grid sm:grid-cols-3 gap-2 mb-6">
          <input v-model="newLink.title" placeholder="Title" required class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <input v-model="newLink.url" placeholder="URL" required class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <button class="bg-brand-accent text-black font-semibold rounded px-4 py-2 text-sm hover:bg-brand-accentDark transition-colors">Add Link</button>
        </form>
        <div class="space-y-2">
          <div v-for="l in links" :key="l._id" class="flex items-center justify-between bg-brand-surface border border-neutral-800 rounded px-4 py-2 text-sm text-brand-text">
            <span>{{ l.title }} — {{ l.url }}</span>
            <button @click="deleteLink(l._id)" class="text-red-400 text-xs hover:text-red-300">Delete</button>
          </div>
        </div>
      </section>

      <!-- BANK ACCOUNTS -->
      <section v-if="activeTab === 'Bank Accounts'">
        <form @submit.prevent="createAccount" class="grid sm:grid-cols-3 gap-2 mb-6">
          <input v-model="newAccount.bankName" placeholder="Bank name" required class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <input v-model="newAccount.accountTitle" placeholder="Account title" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <input v-model="newAccount.accountNumber" placeholder="Account number" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <input v-model="newAccount.iban" placeholder="IBAN" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <input v-model="newAccount.branch" placeholder="Branch" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-accent" />
          <button class="bg-brand-accent text-black font-semibold rounded px-4 py-2 text-sm hover:bg-brand-accentDark transition-colors">Add Account</button>
        </form>
        <div class="space-y-2">
          <div v-for="a in accounts" :key="a._id" class="flex items-center justify-between bg-brand-surface border border-neutral-800 rounded px-4 py-2 text-sm text-brand-text">
            <span>{{ a.bankName }} — {{ a.accountNumber }}</span>
            <button @click="deleteAccount(a._id)" class="text-red-400 text-xs hover:text-red-300">Delete</button>
          </div>
        </div>
      </section>

      <!-- SITE SETTINGS -->
      <section v-if="activeTab === 'Settings'" style="position: relative; z-index: 10000; pointer-events: auto;">
        <div class="grid sm:grid-cols-2 gap-2 max-w-lg" style="position: relative; z-index: 10000; pointer-events: auto;">
          <input v-model="settings.whatsappNumber" placeholder="WhatsApp number (e.g. +923411535353)" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:border-brand-accent" />
          <input v-model="settings.companyName" placeholder="Company name" class="bg-brand-surface border border-neutral-800 text-brand-text placeholder:text-neutral-500 rounded px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:border-brand-accent" />
          <button type="button" @click="saveSettings" @mousedown.capture="saveSettings" style="position: relative; z-index: 10001; pointer-events: auto;" class="bg-brand-accent text-black font-semibold rounded px-4 py-2 border-2 border-red-500 text-sm sm:col-span-2 hover:bg-brand-accentDark transition-colors">Save Settings</button>
        </div>
      </section>

      <!-- ORDERS -->
      <section v-if="activeTab === 'Orders'">
        <div class="space-y-2">
          <div v-for="o in orders" :key="o._id" class="flex items-center justify-between bg-brand-surface border border-neutral-800 rounded px-4 py-2 text-sm text-brand-text">
            <span class="font-mono">{{ o.trackingId }}</span>
            <select :value="o.status" @change="updateStatus(o.trackingId, $event.target.value)" class="bg-neutral-900 border border-neutral-800 text-brand-text rounded px-2 py-1 text-xs focus:outline-none focus:border-brand-accent">
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="customization">Customization</option>
              <option value="with_courier">With Courier</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "@/api/client";

const tabs = ["Categories", "Products", "Quick Links", "Bank Accounts", "Settings", "Orders"];
const activeTab = ref("Categories");

const categories = ref([]);
const products = ref([]);
const links = ref([]);
const accounts = ref([]);
const orders = ref([]);
const settings = ref({ whatsappNumber: "", companyName: "" });

const newCategory = ref({ name: "", description: "", imageUrl: "" });
const newProduct = ref({ name: "", category: "", description: "", imageUrl: "" });
const uploadStatus = ref({ category: "", product: "" });
const categoryFileName = ref("");
const productFileName = ref("");
const newLink = ref({ title: "", url: "" });
const newAccount = ref({ bankName: "", accountTitle: "", accountNumber: "", iban: "", branch: "" });

async function loadAll() {
  const [c, p, l, a, s, o] = await Promise.all([
    apiClient.get("/categories"),
    apiClient.get("/products"),
    apiClient.get("/quicklinks"),
    apiClient.get("/bankaccounts"),
    apiClient.get("/settings"),
    apiClient.get("/orders"),
  ]);
  categories.value = c.data;
  products.value = p.data;
  links.value = l.data;
  accounts.value = a.data;
  settings.value = s.data?._id ? s.data : { whatsappNumber: "", companyName: "" };
  orders.value = o.data;
}

async function createCategory() {
  await apiClient.post("/categories", newCategory.value);
  newCategory.value = { name: "", description: "", imageUrl: "" };
  categoryFileName.value = "";
  await loadAll();
}
async function deleteCategory(id) {
  await apiClient.delete(`/categories/${id}`);
  await loadAll();
}

async function createProduct() {
  await apiClient.post("/products", newProduct.value);
  newProduct.value = { name: "", category: "", description: "", imageUrl: "" };
  productFileName.value = "";
  await loadAll();
}
async function deleteProduct(id) {
  await apiClient.delete(`/products/${id}`);
  await loadAll();
}

async function createLink() {
  await apiClient.post("/quicklinks", newLink.value);
  newLink.value = { title: "", url: "" };
  await loadAll();
}
async function deleteLink(id) {
  await apiClient.delete(`/quicklinks/${id}`);
  await loadAll();
}

async function createAccount() {
  await apiClient.post("/bankaccounts", newAccount.value);
  newAccount.value = { bankName: "", accountTitle: "", accountNumber: "", iban: "", branch: "" };
  await loadAll();
}
async function deleteAccount(id) {
  await apiClient.delete(`/bankaccounts/${id}`);
  await loadAll();
}

async function saveSettings() {
  console.log("saveSettings clicked", settings.value);
  await apiClient.put("/settings", settings.value);
  await loadAll();
}

async function handleImageUpload(event, type) {
  const file = event.target.files?.[0];
  if (!file) return;

  uploadStatus.value[type] = "Uploading image...";
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await apiClient.post("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (type === "category") {
      newCategory.value.imageUrl = response.data.url;
      categoryFileName.value = file.name;
    } else {
      newProduct.value.imageUrl = response.data.url;
      productFileName.value = file.name;
    }
    uploadStatus.value[type] = "Image uploaded successfully.";
  } catch (error) {
    console.error("Image upload failed", error);
    uploadStatus.value[type] = "Upload failed. Please try again.";
  }
}

async function updateStatus(trackingId, status) {
  await apiClient.put(`/orders/${trackingId}/status`, { status });
  await loadAll();
}

onMounted(loadAll);
</script>