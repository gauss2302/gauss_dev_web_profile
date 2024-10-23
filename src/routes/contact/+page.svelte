<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  interface ContactMethod {
    icon: string;
    title: string;
    value: string;
    link: string;
  }

  interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  let isVisible = false;
  let showFooter = false;
  let sentinel: HTMLDivElement;
  let formState: FormState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  let focusedField: string | null = null;
  let isSubmitting = false;
  let submitted = false;

  const contactMethods: ContactMethod[] = [
  // First row
  {
    icon: '/icons/contacts/github.svg',
    title: 'GitHub',
    value: '@gauss2302',
    link: 'https://github.com/gauss2302'
  },
  {
    icon: '/icons/contacts/tg.svg',
    title: 'Telegram',
    value: '@nick230296',
    link: 'https://t.me/nick230296'
  },
  {
    icon: '/icons/contacts/gmail.svg',
    title: 'Email',
    value: 'shilov6865@gmail.com',
    link: 'mailto:shilov6865@gmail.com'
  },
  // Second row
  {
    icon: '/icons/contacts/whatapp.svg',
    title: 'WhatsApp',
    value: '+86 132 6820 8154',
    link: 'https://wa.me/8613268208154'
  },
  {
    icon: '/icons/contacts/phone.svg',
    title: 'Phone',
    value: '+998 500073405',
    link: 'tel:+998 500073405'
  },
  {
    icon: '/icons/contacts/leet.svg',
    title: 'LeetCode',
    value: '@shilov6865',
    link: 'https://leetcode.com/u/shilov6865/'
  }
];

  async function handleSubmit() {
    try {
      isSubmitting = true;
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      submitted = true;
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      isSubmitting = false;
    }
  }

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
      <section 
        class="text-center mb-16"
        in:fly={{ y: 50, duration: 1000 }}
      >
        <h1 class="text-5xl font-bold text-white mb-6">Get in Touch</h1>
        <p class="text-xl text-gray-200 max-w-2xl mx-auto">
          Let's work together to bring your ideas to life. Feel free to reach out!
        </p>
      </section>

<!-- Contact Methods -->

<section
  class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
  in:fly={{ y: 50, duration: 1000, delay: 200 }}
>
  {#each contactMethods as method}
    <a
      href={method.link}
      class="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 group"
      target="_blank"
      rel="noopener noreferrer"
>
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
        <img 
          src={method.icon} 
          alt={method.title}
          class="w-11 h-11 object-contain filter invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <h3 class="text-lg font-semibold text-white mb-2">{method.title}</h3>
      <p class="text-gray-300">{method.value}</p>
    </a>
  {/each}
</section>

      <!-- Contact Form -->
      <section 
        class="max-w-2xl mx-auto"
        in:fly={{ y: 50, duration: 1000, delay: 400 }}
      >
        {#if !submitted}
          <form 
            on:submit|preventDefault={handleSubmit}
            class="bg-white/10 backdrop-blur-sm rounded-lg p-8"
          >
            <div class="space-y-6">
              <!-- Name Field -->
              <div class="relative">
                <label 
                  class="block text-sm font-medium text-gray-200 mb-2"
                  class:text-indigo-300={focusedField === 'name'}
                >
                  Name
                </label>
                <input
                  type="text"
                  required
                  bind:value={formState.name}
                  on:focus={() => focusedField = 'name'}
                  on:blur={() => focusedField = null}
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Email Field -->
              <div class="relative">
                <label 
                  class="block text-sm font-medium text-gray-200 mb-2"
                  class:text-indigo-300={focusedField === 'email'}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  bind:value={formState.email}
                  on:focus={() => focusedField = 'email'}
                  on:blur={() => focusedField = null}
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Subject Field -->
              <div class="relative">
                <label 
                  class="block text-sm font-medium text-gray-200 mb-2"
                  class:text-indigo-300={focusedField === 'subject'}
                >
                  Subject
                </label>
                <input
                  type="text"
                  required
                  bind:value={formState.subject}
                  on:focus={() => focusedField = 'subject'}
                  on:blur={() => focusedField = null}
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>

              <!-- Message Field -->
              <div class="relative">
                <label 
                  class="block text-sm font-medium text-gray-200 mb-2"
                  class:text-indigo-300={focusedField === 'message'}
                >
                  Message
                </label>
                <textarea
                  required
                  rows="5"
                  bind:value={formState.message}
                  on:focus={() => focusedField = 'message'}
                  on:blur={() => focusedField = null}
                  class="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-600 text-white 
                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                disabled={isSubmitting}
                class="w-full bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium
                       hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-500/20 
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {#if isSubmitting}
                  <span class="inline-flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Sending...
                  </span>
                {:else}
                  Send Message
                {/if}
              </button>
            </div>
          </form>
        {:else}
          <div 
            class="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center"
            in:scale={{ duration: 500, start: 0.95 }}
          >
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-300 mb-6">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Message Sent!</h3>
            <p class="text-gray-300 mb-6">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              on:click={() => submitted = false}
              class="text-indigo-300 hover:text-indigo-200 transition-colors duration-300"
            >
              Send another message
            </button>
          </div>
        {/if}
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

  input::placeholder, textarea::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
</style>