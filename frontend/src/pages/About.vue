<template>
  <div class="bg-brand-bg min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <router-link
        to="/"
        class="inline-flex items-center gap-1.5 bg-brand-surface border border-neutral-700 text-sm text-brand-text hover:border-brand-accent hover:text-brand-accent px-4 py-2 rounded-full mb-8 transition-colors"
      >
        ← Back to Home
      </router-link>

      <p class="text-xs font-medium tracking-[0.2em] uppercase text-brand-accent mb-4">Who We Are</p>
      <h1 class="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-text mb-8">About Us</h1>

      <div class="space-y-5 text-white leading-relaxed text-base sm:text-lg">
        <p>
          LeahSport is a premium custom sportswear supplier, dedicated to designing and manufacturing
          high-quality uniforms and athletic wear for teams, clubs, and organizations around the world.
        </p>
        <p>
          From football, basketball, and rugby to hockey and beyond, we specialize in creating custom
          apparel that reflects the identity, spirit, and professionalism of every team we work with.
        </p>
        <p>
          Our journey began with a simple goal: to make premium, fully customizable sportswear accessible
          to teams of every size, from local clubs to professional organizations.
        </p>
        <p>
          We use only the finest quality fabrics, combined with modern manufacturing techniques, to ensure
          our products offer maximum comfort, durability, and performance on and off the field.
        </p>
        <p>
          Every uniform is built to withstand the demands of competitive sport, while maintaining a sharp,
          professional look that represents your team with pride.
        </p>
        <p>
          Our design team works closely with clients to bring their vision to life from color schemes
          and logos to player names and numbers, every detail is fully customizable.
        </p>
        <p>
          We understand that no two teams are the same, which is why we offer flexible customization options
          and no minimum order quantity limits on our teamwear collections.
        </p>
        <p>
          With a streamlined production process, we are able to deliver fast turnaround times without ever
          compromising on quality or attention to detail.
        </p>
        <p>
          Our commitment to excellence has helped us build lasting relationships with teams, clubs, and
          sports organizations across the globe.
        </p>
        <p>
          At LeahSport, we believe great sportswear is more than just fabric and stitching it's a symbol
          of unity, identity, and pride for every team that wears it.
        </p>
        <p>
          Whether you are outfitting a youth league or a professional squad, our mission remains the same:
          to deliver custom sportswear that performs as hard as your team does.
        </p>
      </div>

      <!-- Our Story (headline block) -->
      <div class="mt-16">
        <span class="inline-block bg-brand-accent text-black text-xs font-bold px-3 py-1 rounded-full mb-4">● OUR STORY</span>
        <h2 class="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-text mb-6 leading-tight">
          BUILT ON <span class="text-brand-accent underline decoration-brand-accent">CRAFT</span>,<br />
          DRIVEN BY <span class="text-brand-accent underline decoration-brand-accent">PERFORMANCE</span>
        </h2>
        <p class="text-white leading-relaxed">
          <strong class="text-brand-text">LeahSport</strong> was founded in Sialkot, Pakistan the globally recognised
          capital of high-performance sportswear manufacturing. For over 8 years, the job has stayed the
          same: manufacture sportswear to each customer's exact design, specification and label, and
          deliver it on the date agreed. Whether your order is 20 pieces or 20,000, it runs through the
          same production and QC process.
        </p>
      </div>

      <!-- Our Facility -->
      <div class="mt-16">
        <span class="inline-block bg-brand-accent text-black text-xs font-bold px-3 py-1 rounded-full mb-4">● OUR FACILITY</span>
        <h2 class="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text mb-6">
          EVERYTHING UNDER <span class="text-brand-accent">ONE ROOF</span>
        </h2>
        <p class="text-white leading-relaxed mb-4">
          Our state of the art production facility in Sialkot covers every stage of garment manufacturing.
          From our in house design studio to our multi-head embroidery machines, heat press stations,
          flatbed screen printing lines and high definition sublimation presses — every stage of
          production happens under one roof.
        </p>
        <p class="text-white leading-relaxed">
          This vertical integration gives us <strong class="text-brand-text">complete control</strong> over
          quality, timelines and consistency. We can turn around samples in 5–7 days and full bulk
          orders in 15–25 business days without compromising on quality. Our production team operates
          6 days a week.
        </p>
      </div>

      <!-- Why Choose Us -->
      <div class="mt-16">
        <span class="inline-block bg-brand-accent text-black text-xs font-bold px-3 py-1 rounded-full mb-4">● WHY CHOOSE US</span>
        <h2 class="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-text mb-8">
          WHAT SETS US <span class="text-brand-accent">APART</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-brand-surface border border-neutral-800 rounded-2xl p-5">
            <div class="text-2xl mb-3">🎨</div>
            <h3 class="font-semibold text-brand-text mb-2">Free Design Mockup</h3>
            <p class="text-sm text-white leading-relaxed">
              We provide free digital mockups in 24 hours before any order is placed. No commitment required.
            </p>
          </div>

          <div class="bg-brand-surface border border-neutral-800 rounded-2xl p-5">
            <div class="text-2xl mb-3">🏭</div>
            <h3 class="font-semibold text-brand-text mb-2">In-House Manufacturing</h3>
            <p class="text-sm text-white leading-relaxed">
              Everything happens under one roof no outsourcing, no delays, full quality control at every step.
            </p>
          </div>

          <div class="bg-brand-surface border border-neutral-800 rounded-2xl p-5">
            <div class="text-2xl mb-3">📦</div>
            <h3 class="font-semibold text-brand-text mb-2">Custom Packaging</h3>
            <p class="text-sm text-white leading-relaxed">
              Branded polybags, boxes, hang tags, and woven labels your brand identity extends to the packaging.
            </p>
          </div>

          <div class="bg-brand-surface border border-neutral-800 rounded-2xl p-5">
            <div class="text-2xl mb-3">🌍</div>
            <h3 class="font-semibold text-brand-text mb-2">Global Shipping</h3>
            <p class="text-sm text-white leading-relaxed">
              DHL, FedEx, sea freight we handle all export documentation and deliver worldwide.
            </p>
          </div>

          <div class="bg-brand-surface border border-neutral-800 rounded-2xl p-5">
            <div class="text-2xl mb-3">💬</div>
            <h3 class="font-semibold text-brand-text mb-2">Dedicated Support</h3>
            <p class="text-sm text-white leading-relaxed">
              A dedicated point of contact guides your order from first mockup to final delivery.
            </p>
          </div>

          <div class="bg-brand-surface border border-neutral-800 rounded-2xl p-5">
            <div class="text-2xl mb-3">✅</div>
            <h3 class="font-semibold text-brand-text mb-2">Strict QC</h3>
            <p class="text-sm text-white leading-relaxed">
              Every batch passes multi point quality checks before it leaves our facility.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>