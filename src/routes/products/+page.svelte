<script lang="ts">
   import { onMount } from 'svelte';
   import { fade, fly } from 'svelte/transition';
   import Header from '$lib/components/Header.svelte';
   import Footer from '$lib/components/Footer.svelte';
 
   let isVisible = false;
   let showFooter = false;
   let sentinel: HTMLDivElement;
   let activeFilter = 'all';
   let activeSort = 'latest';

   
 
// Updated projects data
const projects = [
  {
    id: 1,
    title: "Alma Mater",
    description: "Multi-platform mobile application for the Chinese market with a focus on online education. Built with Flutter, integrating BLoC state management and microservices architecture.",
    image: '/img/projects/anyyou.png',
    category: "mobile",
    year: 2024,
    tags: ["Flutter", "Go", "PostgreSQL", "Alibaba Cloud"],
    link: "https://project1.com",
    featured: true
  },
  {
    id: 2,
    title: "CRM System",
    description: "Comprehensive CRM platform with real-time communication features, profile management, and automated task handling.",
    image: '/img/projects/anyyou.png',
    category: "fullstack",
    year: 2024,
    tags: ["Flutter", "PHP", "WebSockets", "Redis"],
    link: "https://project2.com",
    featured: true
  },
  {
    id: 3,
    title: "Any You",
    description: "Comprehensive CRM platform with real-time communication features, profile management, and automated task handling.",
    image: '/img/projects/anyyou.png',
    category: "fullstack",
    year: 2024,
    tags: ["Flutter", "PHP", "WebSockets", "Redis"],
    link: "https://project2.com",
    featured: true
  },
  {
    id: 4,
    title: "E-Commerce App",
    description: "Mobile e-commerce application with real-time inventory management, integrated payment systems, and personalized recommendations.",
    image: '/img/projects/anyyou.png',
    category: "mobile",
    year: 2023,
    tags: ["Flutter", "Node.js", "MongoDB", "Firebase"],
    link: "https://project3.com",
    featured: true
  }
];

// Updated filters
const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'fullstack', label: 'Full Stack' }
];
 
 
   const sortOptions = [
     { id: 'latest', label: 'Latest' },
     { id: 'oldest', label: 'Oldest' }
   ];
 
   $: filteredProjects = projects
     .filter(project => activeFilter === 'all' || project.category === activeFilter)
     .sort((a, b) => {
       if (activeSort === 'latest') {
         return b.year - a.year;
       }
       return a.year - b.year;
     });
 
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

  <main class="flex-grow w-full py-32">
    {#if isVisible}
      <!-- Hero Section -->
      <section 
        class="text-center mb-12"
        in:fly={{ y: 50, duration: 1000 }}
      >
        <h1 class="text-5xl font-bold text-white mb-6">My Projects</h1>
        <p class="text-xl text-gray-200 max-w-2xl mx-auto">
          Showcasing my mobile and full-stack development projects.
        </p>
      </section>

      <!-- Filters -->
      <section 
        class="mb-12 px-4"
        in:fly={{ y: 50, duration: 1000, delay: 200 }}
      >
        <div class="max-w-7xl mx-auto flex justify-center">
          <!-- Category Filters -->
          <div class="flex flex-wrap gap-2">
            {#each filters as filter}
              <button
                class="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300
                       {activeFilter === filter.id ? 
                         'bg-white text-indigo-600' : 
                         'bg-white/10 text-white hover:bg-white/20'}"
                on:click={() => activeFilter = filter.id}
              >
                {filter.label}
              </button>
            {/each}
          </div>
        </div>
      </section>

      <!-- Projects Grid -->
      <section 
        class="w-full px-4"
        in:fly={{ y: 50, duration: 1000, delay: 400 }}
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {#each filteredProjects as project (project.id)}
            <div 
              class="group bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 
                     transition-all duration-300 {project.featured ? 'lg:col-span-2' : ''}"
            >
              <div class="flex flex-col md:flex-row h-full">
                <!-- Image Container -->
                <div class="md:w-2/5 relative h-48 md:h-auto">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div class="absolute top-2 right-2 flex flex-wrap gap-1 max-w-[calc(100%-1rem)]">
                    {#each project.tags as tag}
                      <span class="bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs">
                        {tag}
                      </span>
                    {/each}
                  </div>
                </div>
                
                <!-- Content Container -->
                <div class="md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <h3 class="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p class="text-gray-300 text-sm line-clamp-3">{project.description}</p>
                  </div>
                  
                  <div class="flex justify-between items-center mt-4">
                    <span class="text-sm text-gray-400">{project.year}</span>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 
                             transition-colors duration-300 text-sm"
                    >
                      View Project
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <div bind:this={sentinel} class="h-1" />
  </main>

  {#if showFooter}
    <Footer />
  {/if}
</div>

