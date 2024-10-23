<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  export let title = "Nikita Shilov";
  export let navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/products" },
    { label: "Contact", href: "/contact" }
  ];

  let scrollY = 0;
  let isMobileMenuOpen = false;

  // Calculate opacity based on scroll position
  $: headerOpacity = Math.min(scrollY / 100, 0.9); // Max opacity of 0.9
  $: textColor = scrollY > 20 ? `rgba(17, 24, 39, ${headerOpacity * 1.5})` : 'white';
  
  onMount(() => {
    // Update scroll position
    window.addEventListener('scroll', () => {
      scrollY = window.pageYOffset;
    });
  });
</script>

<header 
  class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
  style="background-color: rgba(255, 255, 255, {headerOpacity}); backdrop-filter: blur({headerOpacity * 5}px);"
>
  <div class="container mx-auto px-4 lg:px-6">
    <div class="flex justify-between items-center h-20">
      <!-- Brand -->
      <a 
        href="/" 
        class="text-lg font-light tracking-widest uppercase transition-colors duration-200"
        style="color: {textColor}"
      >
        {title}
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-12">
        {#each navItems as item}
          <a
            href={item.href}
            class="nav-item text-sm tracking-wider uppercase transition-colors duration-200 relative hover:text-indigo-500"
            style="color: {textColor}"
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- Mobile menu button -->
      <button
        class="md:hidden p-2 rounded-md transition-colors duration-200"
        style="color: {textColor}"
        on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
      >
        <svg
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>
  </div>

  {#if isMobileMenuOpen}
    <div
      class="md:hidden"
      transition:slide={{ duration: 200 }}
    >
      <div class="container mx-auto px-4 py-2">
        <div class="bg-white/90 backdrop-blur-sm rounded-lg">
          {#each navItems as item}
            <a
              href={item.href}
              class="block py-3 px-4 text-sm font-light tracking-wider uppercase text-gray-800 hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</header>

<!-- Spacer -->
<div class="h-20"></div>

<style>
  nav :global(.nav-item)::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -4px;
    left: 0;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  nav :global(.nav-item:hover)::after {
    transform: scaleX(1);
    transform-origin: left;
  }
</style>