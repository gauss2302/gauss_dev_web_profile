<script lang="ts">
   import { onMount } from 'svelte';
   import { fade, fly } from 'svelte/transition';
   import Header from '$lib/components/Header.svelte';
   import Footer from '$lib/components/Footer.svelte';
   import CVSection from '$lib/components/CVSection.svelte';
	import SalaryGame from '$lib/components/SalaryGame.svelte';
	import SlotMachine from '$lib/components/SlotMachine.svelte';
 
   let isVisible = false;
   let showFooter = false;
   let sentinel: HTMLDivElement;
 
   const skills = [
  {
    name: 'Languages',
    items: [
      { name: 'TypeScript', color: '#3178C6', icon: '/icons/tech/languages/typescript.svg' },
      { name: 'Python', color: '#3776AB', icon: '/icons/tech/languages/python.svg' },
      { name: 'Golang', color: '#339933', icon: '/icons/tech/languages/go.svg' },
      { name: 'Dart', color: '#339933', icon: '/icons/tech/languages/dart.svg' }
    ]
  },
  {
    name: 'Frameworks & Libraries',
    items: [
      { name: 'Flutter', color: '#61DAFB', icon: '/icons/tech/frameworks/flutter.svg' },
      { name: 'React', color: '#61DAFB', icon: '/icons/tech/frameworks/react.svg' },
      { name: 'Vue', color: '#4FC08D', icon: '/icons/tech/frameworks/vue.svg' },
      { name: 'NextJS', color: '#FF3E00', icon: '/icons/tech/frameworks/nextjs.svg' }
    ]
  },
  {
    name: 'Databases',
    items: [
      { name: 'PostgreSQL', color: '#4169E1', icon: '/icons/tech/db/postgresql.svg' },
      { name: 'MySQL', color: '#4169E1', icon: '/icons/tech/db/mysql.svg' },
      { name: 'Redis', color: '#DC382D', icon: '/icons/tech/db/redis.svg' },
      { name: 'MongoDB', color: '#4169E1', icon: '/icons/tech/db/mongodb.svg' },
      { name: 'Firebase', color: '#4169E1', icon: '/icons/tech/db/firebase.svg' },

    ]
  },
  {
    name: 'DevOps & Tools',
    items: [
      { name: 'Docker', color: '#2496ED', icon: '/icons/tech/tools/docker.svg' },
      { name: 'K8', color: '#2496ED', icon: '/icons/tech/tools/k8.svg' },
      { name: 'AWS', color: '#FF9900', icon: '/icons/tech/tools/aws.svg' },
      { name: 'Git', color: '#F05032', icon: '/icons/tech/tools/git.svg' },
      { name: 'Bash', color: '#FCC624', icon: '/icons/tech/tools/bash.svg' },
      { name: 'Linux', color: '#FCC624', icon: '/icons/tech/tools/linux.svg' },
      { name: 'Grafana', color: '#FCC624', icon: '/icons/tech/tools/grafana.svg' },
      { name: 'Prometheus', color: '#FCC624', icon: '/icons/tech/tools/prometheus.svg' },
      { name: 'Kafka', color: '#FCC624', icon: '/icons/tech/tools/kafka.svg' },
      { name: 'RabbitMQ', color: '#FCC624', icon: '/icons/tech/tools/rabbitmq.svg' },
    ]
  }
];
 
   onMount(() => {
     isVisible = true;
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) showFooter = true;
         });
       },
       { rootMargin: '100px' }
     );
 
     if (sentinel) observer.observe(sentinel);
     return () => observer.disconnect();
   });
 </script>
 
 <div class="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
   <Header />
 
   <main class="flex-grow container mx-auto px-4 py-32">
     {#if isVisible}
       <!-- Hero Section -->
<!-- Hero Section -->
<section 
  class="relative mb-24 text-center"
  in:fly={{ y: 50, duration: 1000 }}
>
  <!-- Animated background elements -->
  <div class="absolute inset-0 -z-10 overflow-hidden">
    {#each Array(3) as _, i}
      <div 
        class="absolute rounded-full mix-blend-overlay animate-pulse"
        style="
          width: {200 + i * 100}px; 
          height: {200 + i * 100}px;
          background: rgba(255,255,255,0.03);
          left: {50 + (i - 1) * 30}%;
          top: {20 + i * 20}%;
          transform: translateX(-50%);
          animation-delay: {i * 0.5}s;
          animation-duration: {4 + i}s;
        "
      />
    {/each}
  </div>

  <!-- Content -->
  <div class="space-y-8 max-w-3xl mx-auto">
    <!-- Role label with animated lines -->
    <div 
      class="flex items-center justify-center gap-4 text-indigo-300"
      in:fly={{ y: 30, duration: 1000, delay: 200 }}
    >
      <div class="h-[1px] w-24 bg-indigo-300/50"></div>
      <span class="text-sm font-medium uppercase tracking-widest">Software Engineer</span>
      <div class="h-[1px] w-24 bg-indigo-300/50"></div>
    </div>

    <!-- Main title with letter animation -->
    <h1 
      class="text-5xl md:text-6xl font-bold text-white"
      in:fly={{ y: 30, duration: 1000, delay: 400 }}
    >
      About Me
    </h1>

    <!-- Description with gradient highlight -->
    <p 
      class="text-xl text-gray-200 relative overflow-hidden group mx-auto"
      in:fly={{ y: 30, duration: 1000, delay: 600 }}
    >
      Results-driven software engineer with a strong technical mindset and expertise in modern development practices.
      <span 
        class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transform scale-x-0 transition-transform duration-700 origin-center group-hover:scale-x-100"
      ></span>
    </p>

    <!-- Tech badges -->
    <div 
      class="flex flex-wrap gap-3 justify-center"
      in:fly={{ y: 30, duration: 1000, delay: 800 }}
    >
      {#each ['Mobile', 'Web', 'Backend'] as tech, i}
        <div 
          class="px-6 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-200 
                 hover:bg-white/10 transition-all duration-300 hover:scale-110"
          style="animation-delay: {i * 200}ms"
        >
          {tech}
        </div>
      {/each}
    </div>
  </div>
</section>
 
       <!-- Experience Section -->
       <section 
         class="mb-24"
         in:fly={{ y: 50, duration: 1000, delay: 200 }}
       >
         <CVSection />
       </section>
 
<!-- Skills Section -->
<section 
  class="mb-24"
  in:fly={{ y: 50, duration: 1000, delay: 400 }}
>
  <h2 class="text-3xl font-bold text-white mb-8">Tech Stack</h2>
  <div class="space-y-6">
    <!-- First row: 3 equal columns -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each skills.slice(0, 3) as category}
        <div 
          class="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
        >
          <h3 class="text-xl font-semibold text-white mb-6">{category.name}</h3>
          <ul class="space-y-4">
            {#each category.items as tech}
              <li 
                class="text-gray-200 flex items-center gap-3 hover:translate-x-2 transition-all duration-300"
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  class="w-6 h-6 object-contain"
                  style="filter: drop-shadow(0 0 2px rgba(255,255,255,0.3))"
                />
                <span class="font-medium">{tech.name}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <!-- Second row: DevOps & Tools centered with 3/4 width -->
    <div class="flex justify-center">
      <div class="w-3/4 bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
        <!-- Centered header -->
        <h3 class="text-xl font-semibold text-white mb-6 text-center">{skills[3].name}</h3>
        
        <!-- Centered two-column grid with specific width -->
        <div class="max-w-2xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {#each skills[3].items as tech}
              <div 
                class="text-gray-200 flex items-center gap-3 hover:translate-x-2 transition-all duration-300"
              >
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  class="w-6 h-6 object-contain"
                  style="filter: drop-shadow(0 0 2px rgba(255,255,255,0.3))"
                />
                <span class="font-medium">{tech.name}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
</section>
 
     <section 
     class="mb-24 w-full"
     in:fly={{ y: 50, duration: 1000, delay: 600 }}
   >
     <!-- Container with full width -->
     <div class="flex flex-col gap-8">
       <!-- Title -->
       <h2 class="text-3xl font-bold text-white">Salary Expectation</h2>
       
       <!-- Slot Machine with proper width -->
       <div class="w-full">
         <SlotMachine />
       </div>
     </div>
   </section>
 
       <!-- Contact Section -->
       <section 
       class="mb-16 relative"
       in:fly={{ y: 50, duration: 1000, delay: 800 }}
     >
       <h2 class="text-3xl font-bold text-white mb-8">Get in Touch</h2>
       <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 relative">
         <!-- Animated Arrows -->
         <div class="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden md:block">
           <svg 
             class="w-10 h-10 text-indigo-400/50 animate-bounce-right"
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="currentColor"
           >
             <path 
               stroke-linecap="round" 
               stroke-linejoin="round" 
               stroke-width="2" 
               d="M13 7l5 5m0 0l-5 5m5-5H6"
             />
           </svg>
         </div>
         <div class="absolute -right-12 top-1/2 transform -translate-y-1/2 hidden md:block">
           <svg 
             class="w-10 h-10 text-indigo-400/50 animate-bounce-left"
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="currentColor"
           >
             <path 
               stroke-linecap="round" 
               stroke-linejoin="round" 
               stroke-width="2" 
               d="M11 17l-5-5m0 0l5-5m-5 5h12"
             />
           </svg>
         </div>
     
         <p class="text-gray-200 mb-6">
           Interested in working together? I'm always open to discussing new projects
           and opportunities.
         </p>
         
         <div class="text-center">
           <a
             href="mailto:shilov6865@gmail.com"
             class="inline-flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg 
                    hover:bg-indigo-600 transition-all duration-300 hover:scale-105 
                    shadow-lg hover:shadow-indigo-500/25"
           >
             <span>Contact Me</span>
             <svg 
               class="w-4 h-4 animate-pulse-x" 
               viewBox="0 0 24 24" 
               fill="none" 
               stroke="currentColor"
             >
               <path 
                 stroke-linecap="round" 
                 stroke-linejoin="round" 
                 stroke-width="2" 
                 d="M14 5l7 7m0 0l-7 7m7-7H3"
               />
             </svg>
           </a>
         </div>
       </div>
     </section>
     {/if}
 
     <div bind:this={sentinel} class="h-1" />
   </main>
 
   {#if showFooter}
     <Footer />
   {/if}
 </div>
 
 <style>
   :global(html) {
     scroll-behavior: smooth;
   }
   @keyframes gradient-move {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-pulse {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.1); }
  }

  @keyframes bounce-right {
    0%, 100% { transform: translateX(0); opacity: 0.3; }
    50% { transform: translateX(10px); opacity: 0.7; }
  }

  @keyframes bounce-left {
    0%, 100% { transform: translateX(0); opacity: 0.3; }
    50% { transform: translateX(-10px); opacity: 0.7; }
  }

  @keyframes pulse-x {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(3px); }
  }

  .animate-bounce-right {
    animation: bounce-right 2s infinite;
  }

  .animate-bounce-left {
    animation: bounce-left 2s infinite;
  }

  .animate-pulse-x {
    animation: pulse-x 1s infinite;
  }

  /* Add staggered delays for arrows */
  .animate-bounce-right {
    animation-delay: 0.5s;
  }

  .animate-bounce-left {
    animation-delay: 0s;
  }
 </style>