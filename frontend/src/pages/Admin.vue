<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
    <h1 class="font-heading text-2xl font-bold mb-6">Admin Panel</h1>


    <div class="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
      <button
        v-for="t in tabs"
        :key="t"
        @click="activeTab = t"
        class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
        :class="activeTab === t ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'"
      >
        {{ t }}
      </button>
    </div>

    <!-- CATEGORIES -->
    <section v-if="activeTab === 'Categories'">
      <form @submit.prevent="createCategory" class="grid sm:grid-cols-4 gap-2 mb-6">
        <input v-model="newCategory.name" placeholder="Name" required class="border rounded px-3 py-2 text-sm" />
        <input v-model="newCategory.description" placeholder="Description" class="border rounded px-3 py-2 text-sm" />
        <div class="space-y-1">
          <label class="block w-full cursor-pointer">
            <span class="sr-only">Upload category image</span>
            <div class="w-full text-left border rounded px-3 py-2 text-sm bg-white hover:bg-gray-50">
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
            class="border rounded px-3 py-2 text-sm w-full bg-gray-50"
          />
          <p class="text-xs text-gray-500" v-if="uploadStatus.category">{{ uploadStatus.category }}</p>
        </div>
        <button class="bg-black text-white rounded px-4 py-2 text-sm">Add Category</button>
      </form>
      <div class="space-y-2">
        <div v-for="c in categories" :key="c._id" class="flex items-center justify-between border rounded px-4 py-2 text-sm">
          <span>{{ c.name }}</span>
          <button @click="deleteCategory(c._id)" class="text-red-600 text-xs">Delete</button>
        </div>
      </div>
    </section>

    <!-- PRODUCTS (no price / stock fields) -->
    <section v-if="activeTab === 'Products'">
      <form @submit.prevent="createProduct" class="grid sm:grid-cols-2 gap-2 mb-6">
        <input v-model="newProduct.name" placeholder="Product name" required class="border rounded px-3 py-2 text-sm" />
        <select v-model="newProduct.category" class="border rounded px-3 py-2 text-sm">
          <option value="">No category</option>
          <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
        </select>
        <textarea v-model="newProduct.description" placeholder="Detail / description" class="border rounded px-3 py-2 text-sm sm:col-span-2" rows="2"></textarea>
        <div class="space-y-1 sm:col-span-2">
          <label class="block w-full cursor-pointer">
            <span class="sr-only">Upload product image</span>
            <div class="w-full text-left border rounded px-3 py-2 text-sm bg-white hover:bg-gray-50">
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
            class="border rounded px-3 py-2 text-sm w-full bg-gray-50"
          />
          <p class="text-xs text-gray-500" v-if="uploadStatus.product">{{ uploadStatus.product }}</p>
        </div>
        <button class="bg-black text-white rounded px-4 py-2 text-sm sm:col-span-2">Add Product</button>
      </form>
      <div class="space-y-2">
        <div v-for="p in products" :key="p._id" class="flex items-center justify-between border rounded px-4 py-2 text-sm">
          <span>{{ p.name }}</span>
          <button @click="deleteProduct(p._id)" class="text-red-600 text-xs">Delete</button>
        </div>
      </div>
    </section>

    <!-- QUICK LINKS -->
    <section v-if="activeTab === 'Quick Links'">
      <form @submit.prevent="createLink" class="grid sm:grid-cols-3 gap-2 mb-6">
        <input v-model="newLink.title" placeholder="Title" required class="border rounded px-3 py-2 text-sm" />
        <input v-model="newLink.url" placeholder="URL" required class="border rounded px-3 py-2 text-sm" />
        <button class="bg-black text-white rounded px-4 py-2 text-sm">Add Link</button>
      </form>
      <div class="space-y-2">
        <div v-for="l in links" :key="l._id" class="flex items-center justify-between border rounded px-4 py-2 text-sm">
          <span>{{ l.title }} — {{ l.url }}</span>
          <button @click="deleteLink(l._id)" class="text-red-600 text-xs">Delete</button>
        </div>
      </div>
    </section>

    <!-- BANK ACCOUNTS -->
    <section v-if="activeTab === 'Bank Accounts'">
      <form @submit.prevent="createAccount" class="grid sm:grid-cols-3 gap-2 mb-6">
        <input v-model="newAccount.bankName" placeholder="Bank name" required class="border rounded px-3 py-2 text-sm" />
        <input v-model="newAccount.accountTitle" placeholder="Account title" class="border rounded px-3 py-2 text-sm" />
        <input v-model="newAccount.accountNumber" placeholder="Account number" class="border rounded px-3 py-2 text-sm" />
        <input v-model="newAccount.iban" placeholder="IBAN" class="border rounded px-3 py-2 text-sm" />
        <input v-model="newAccount.branch" placeholder="Branch" class="border rounded px-3 py-2 text-sm" />
        <button class="bg-black text-white rounded px-4 py-2 text-sm">Add Account</button>
      </form>
      <div class="space-y-2">
        <div v-for="a in accounts" :key="a._id" class="flex items-center justify-between border rounded px-4 py-2 text-sm">
          <span>{{ a.bankName }} — {{ a.accountNumber }}</span>
          <button @click="deleteAccount(a._id)" class="text-red-600 text-xs">Delete</button>
        </div>
      </div>
    </section>

    <!-- SITE SETTINGS -->
    <section v-if="activeTab === 'Settings'" style="position: relative; z-index: 10000; pointer-events: auto;">
      <div class="grid sm:grid-cols-2 gap-2 max-w-lg" style="position: relative; z-index: 10000; pointer-events: auto;">
        <input v-model="settings.whatsappNumber" placeholder="WhatsApp number (e.g. +923411535353)" class="border rounded px-3 py-2 text-sm sm:col-span-2" />
        <input v-model="settings.companyName" placeholder="Company name" class="border rounded px-3 py-2 text-sm sm:col-span-2" />
        <button type="button" @click="saveSettings" @mousedown.capture="saveSettings" style="position: relative; z-index: 10001; pointer-events: auto;" class="bg-black text-white rounded px-4 py-2 border-2 border-red-500 text-sm sm:col-span-2">Save Settings</button>
      </div>
    </section>

    <!-- ORDERS -->
    <section v-if="activeTab === 'Orders'">
      <div class="space-y-2">
        <div v-for="o in orders" :key="o._id" class="flex items-center justify-between border rounded px-4 py-2 text-sm">
          <span class="font-mono">{{ o.trackingId }}</span>
          <select :value="o.status" @change="updateStatus(o.trackingId, $event.target.value)" class="border rounded px-2 py-1 text-xs">
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
