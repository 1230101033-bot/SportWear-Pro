import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  { path: "/", name: "home", component: () => import("@/pages/Home.vue") },
  { path: "/categories", name: "categories", component: () => import("@/pages/Categories.vue") },
  { path: "/category/:categoryId", name: "category-products", component: () => import("@/pages/CategoryProducts.vue") },
  { path: "/product/:productId", name: "product-detail", component: () => import("@/pages/ProductDetail.vue") },
  { path: "/payment-details", name: "payment-details", component: () => import("@/pages/PaymentDetails.vue") },
  { path: "/links", name: "links", component: () => import("@/pages/Links.vue") },
  { path: "/about", name: "about", component: () => import("@/pages/About.vue") },
  { path: "/contact", name: "contact", component: () => import("@/pages/Contact.vue") },
  { path: "/track-order", name: "track-order", component: () => import("@/pages/TrackOrder.vue") },
  { path: "/login", name: "login", component: () => import("@/pages/Login.vue") },
  { path: "/register", name: "register", component: () => import("@/pages/Register.vue") },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/pages/Admin.vue"),
    meta: { requiresAdmin: true },
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("@/pages/PageNotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin) {
    const auth = useAuthStore();
    if (!auth.isAuthenticated) return next({ name: "login" });
    if (!auth.isAdmin) return next({ name: "home" });
  }
  next();
});

export default router;
