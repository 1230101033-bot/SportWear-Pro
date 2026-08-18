<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import apiClient from "@/api/client";

const heroCanvas = ref(null);
let animationId;

function initHeroAnimation() {
  const canvas = heroCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const blobs = [
    { x: 0.7, y: 0.3, r: 0.5, hue: "80,70,150", t: 0 },
    { x: 0.2, y: 0.6, r: 0.4, hue: "180,220,60", t: 2 },
    { x: 0.5, y: 0.8, r: 0.35, hue: "60,90,140", t: 4 },
  ];

  const streaks = Array.from({ length: 22 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    len: 20 + Math.random() * 40,
    speed: 0.3 + Math.random() * 0.6,
    op: Math.random() * 0.3 + 0.1,
  }));

  let frame = 0;

  function draw() {
    frame++;
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    blobs.forEach((b) => {
      b.t += 0.003;
      const bx = (b.x + Math.sin(b.t) * 0.05) * canvas.width;
      const by = (b.y + Math.cos(b.t * 0.8) * 0.05) * canvas.height;
      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, canvas.width * b.r);
      grad.addColorStop(0, `rgba(${b.hue},0.22)`);
      grad.addColorStop(1, `rgba(${b.hue},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    const sweepX = (Math.sin(frame * 0.004) * 0.5 + 0.5) * canvas.width;
    const sweep = ctx.createLinearGradient(sweepX - 80, 0, sweepX + 80, 0);
    sweep.addColorStop(0, "rgba(255,255,255,0)");
    sweep.addColorStop(0.5, "rgba(255,255,255,0.04)");
    sweep.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    streaks.forEach((s) => {
      s.y -= s.speed;
      if (s.y < -s.len) {
        s.y = canvas.height + s.len;
        s.x = Math.random() * canvas.width;
      }
      const g = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
      g.addColorStop(0, "rgba(190,230,60,0)");
      g.addColorStop(0.5, `rgba(190,230,60,${s.op})`);
      g.addColorStop(1, "rgba(190,230,60,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x, s.y + s.len);
      ctx.stroke();
    });

    animationId = requestAnimationFrame(draw);
  }
  draw();
}

const categories = ref([]);
const loading = ref(true);
const fallbackImg = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop";

const gridEl = ref(null);
let observer;

function setupScrollReveal() {
  const cards = document.querySelectorAll(".reveal-card, .reveal-fade");
  if (!cards || cards.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => observer.observe(card));
}

onMounted(async () => {
  initHeroAnimation();
  setTimeout(setupScrollReveal, 100);
  try {
    const { data } = await apiClient.get("/categories");
    categories.value = data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    setTimeout(setupScrollReveal, 100);
  }
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
  if (observer) observer.disconnect();
});
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-black text-white overflow-hidden">
      <canvas ref="heroCanvas" class="absolute inset-0 w-full h-full"></canvas>
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-32">
        <div class="grid md:grid-cols-2 items-center gap-8 md:gap-10">

          <!-- Image: mobile pe upar, desktop pe right side -->
          <div class="relative flex justify-center order-1 md:order-2">
            <div class="absolute w-64 h-64 sm:w-80 sm:h-80 bg-lime-500/10 rounded-full blur-3xl"></div>

          <div class="hero-card relative rounded-3xl w-full max-w-[260px] sm:max-w-sm md:max-w-md aspect-[3/4] overflow-hidden shadow-2xl">
  <img
    src="/main.jpeg"
    alt="Custom Football Uniform"
    class="absolute inset-0 w-full h-full object-cover"
  />
  <div class="shimmer absolute inset-0"></div>
</div>
          </div>

          <!-- Text: mobile pe neeche, desktop pe left side -->
          <div class="fade-in-up max-w-2xl order-2 md:order-1 text-center md:text-left">
            <p class="text-xs font-medium tracking-[0.2em] uppercase text-lime-400 mb-4">Premium Sportswear Supplier</p>
            <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Custom Sports Uniforms
            </h1>
            <p class="text-white text-base sm:text-lg mb-8 leading-relaxed">
              High quality custom sportswear for teams and clubs. Football, basketball, rugby, hockey and more.
            </p>
            <router-link
              to="/categories"
              class="inline-flex items-center gap-2 bg-lime-400 text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-lime-300 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Browse Categories →
            </router-link>

            <div class="flex justify-center md:justify-start gap-6 sm:gap-8 mt-10 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-lime-400">✓</span>
                <span class="text-gray-300">Custom Designs</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lime-400">✓</span>
                <span class="text-gray-300">Quality Fabric</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lime-400">✓</span>
                <span class="text-gray-300">Fast Turnaround</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Stats Pills -->
    <section class="bg-black py-10">
      <div class="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-3">
        <div class="reveal-fade border border-neutral-700 rounded-full px-5 py-2 text-sm text-white">
          <span class="text-lime-400 font-bold">500+</span> Brands Served
        </div>
        <div class="reveal-fade border border-neutral-700 rounded-full px-5 py-2 text-sm text-white">
          <span class="text-lime-400 font-bold">40+</span> Countries
        </div>
        <div class="reveal-fade border border-neutral-700 rounded-full px-5 py-2 text-sm font-bold text-lime-400">
          NO MOQ <span class="font-normal text-white">In Teamwear</span>
        </div>
        <div class="reveal-fade border border-neutral-700 rounded-full px-5 py-2 text-sm text-white">
          <span class="text-lime-400 font-bold">FREE</span> Samples
        </div>
        <div class="reveal-fade border border-neutral-700 rounded-full px-5 py-2 text-sm text-white">
          <span class="text-lime-400 font-bold">8+</span> Years Craft
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="bg-neutral-950 py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 reveal-fade">
        <span class="inline-block bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">● OUR STORY</span>
        <h2 class="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          MANUFACTURING <span class="text-lime-400">EXCELLENCE</span>
        </h2>
        <p class="text-white leading-relaxed mb-4">
          LeahSport is a premium custom sportswear manufacturer based in Sialkot, Pakistan — the heart of global sportswear production. With over 8 years of craftsmanship, we design and manufacture high-performance, fully customizable teamwear for clubs, teams, and organizations.
        </p>
        <p class="text-white leading-relaxed mb-8">
          We use only premium quality fabric, combined with modern manufacturing techniques, ensuring every uniform delivers maximum comfort, durability, and a sharp, professional look — built to represent your team with pride.
        </p>

        <div class="grid grid-cols-3 gap-3 sm:gap-4">
          <div class="reveal-fade bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <p class="text-lime-400 font-extrabold text-xl sm:text-2xl">8+</p>
            <p class="text-white text-[10px] sm:text-xs uppercase tracking-wide mt-1">Years Experience</p>
          </div>
          <div class="reveal-fade bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <p class="text-lime-400 font-extrabold text-xl sm:text-2xl">20,000</p>
            <p class="text-white text-[10px] sm:text-xs uppercase tracking-wide mt-1">Monthly Capacity</p>
          </div>
          <div class="reveal-fade bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-center">
            <p class="text-lime-400 font-extrabold text-xl sm:text-2xl">40+</p>
            <p class="text-white text-[10px] sm:text-xs uppercase tracking-wide mt-1">Countries</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Range intro -->
    <section class="bg-neutral-950 pt-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center reveal-fade">
        <span class="inline-block bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">● OUR RANGE</span>
        <h2 class="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          <span class="text-white">WHAT WE </span><span class="text-lime-400">MANUFACTURE</span>
        </h2>
        <p class="text-white leading-relaxed">
          From jerseys and shorts to full team kits, jackets, and training wear — every category is fully customizable with your team colors, logo, player names, and numbers. Whether it's football, basketball, volleyball, or hockey, we tailor each order to match your team's identity.
        </p>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="bg-neutral-950 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div class="flex items-end justify-between mb-10">
          <div>
            <p class="text-xs font-medium tracking-[0.2em] uppercase text-lime-400 mb-2">Our Collection</p>
            <h2 class="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">Categories</h2>
          </div>
          <router-link to="/categories" class="text-sm font-medium text-white hover:text-lime-400 transition-colors">View all →</router-link>
        </div>

        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          <div v-for="i in 8" :key="i" class="aspect-square rounded-2xl bg-neutral-800 animate-pulse" />
        </div>
        <div v-else-if="categories.length === 0" class="text-center py-20">
          <p class="text-white text-sm">No categories yet. Admin can add categories from the admin panel.</p>
        </div>
        <div v-else ref="gridEl" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          <router-link
            v-for="cat in categories"
            :key="cat._id"
            :to="`/category/${cat._id}`"
            class="reveal-card group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-neutral-800 hover:ring-lime-400/50 transition-all"
          >
            <img
              :src="cat.imageUrl || fallbackImg"
              :alt="cat.name"
              class="absolute inset-0 w-full h-full object-contain scale-125 group-hover:scale-[1.35] transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <h3 class="font-heading font-semibold text-white text-sm sm:text-base mb-2">{{ cat.name }}</h3>
              <span class="inline-flex items-center gap-1 bg-lime-400 text-black text-xs font-semibold px-3 py-1.5 rounded-full">
                View Products →
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-card {
  animation: float 4s ease-in-out infinite, glow-pulse 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 30px 5px rgba(190, 230, 60, 0.15); }
  50% { box-shadow: 0 0 50px 15px rgba(190, 230, 60, 0.35); }
}

.shimmer {
  background: linear-gradient(
    100deg,
    transparent 30%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  animation: shimmer-sweep 3.5s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes shimmer-sweep {
  0% { transform: translateX(-100%); }
  20% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal-card.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-fade {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.reveal-fade.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>