<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let isVisible = false;
	let showFooter = false;
	let sentinel: HTMLDivElement;

	const skills = [
		{
			name: 'Frontend Development',
			icon: '/icons/main/web1.png',
			description: 'Modern web development'
		},
		{
			name: 'Backend Architecture',
			icon: '/icons/main/back.png',
			description: 'Scalable solutions'
		},
		{
			name: 'Mobile Development',
			icon: '/icons/main/mobile.svg',
			description: 'Cross-platform apps'
		},
		{
			name: 'Architecture Design',
			icon: '/icons/main/data.svg',
			description: 'System design'
		}
	];

	onMount(() => {
		isVisible = true;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) showFooter = true;
				});
			},
			{ rootMargin: '100px' }
		);

		if (sentinel) observer.observe(sentinel);
		return () => observer.disconnect();
	});
</script>

<div
	class="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800"
>
	<Header />

	<main class="flex-grow">
		{#if isVisible}
			<!-- Hero Section -->
			<section class="h-screen flex items-center justify-center relative overflow-hidden">
				<!-- Background circles with continuous random movement -->
				<div class="absolute inset-0">
					{#each Array(5) as _, i}
						<div
							class="absolute rounded-full mix-blend-overlay"
							style="
                width: {400 + i * 150}px; 
                height: {400 + i * 150}px;
                background: rgba(255,255,255,0.08);
                left: {10 + i * 20}%;
                top: {0 + i * 15}%;
                animation: float-${i + 1} {25 + i * 5}s ease-in-out infinite;
              "
						/>
					{/each}
				</div>

				<div
					class="container mx-auto px-4 text-center relative z-10"
					in:fly={{ y: 50, duration: 1000 }}
				>
					<!-- SVG for handwriting animation -->
					<div
						class="container mx-auto px-4 text-center relative z-10"
						in:fly={{ y: 50, duration: 1000 }}
					>
						<h1 class="text-6xl md:text-7xl font-bold text-white mb-6 typing-text">
							Hi, I'm Nikita
						</h1>

						<p class="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12 fade-in">
							Full-stack developer crafting digital experiences that make a difference
						</p>

						<!-- Buttons -->
						<div class="flex flex-wrap justify-center gap-4 fade-in">
							<a
								href="/projects"
								class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium
                   hover:bg-opacity-90 transition-all duration-300"
							>
								View My Work
							</a>
							<a
								href="/contact"
								class="px-8 py-3 bg-white/10 text-white rounded-lg font-medium
                   hover:bg-white/20 transition-all duration-300"
							>
								Get in Touch
							</a>
						</div>
					</div>
				</div>
			</section>

			<!-- Skills Section -->
			<section class="py-20 bg-black/10">
				<div class="container mx-auto px-4" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
					<h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-12">What I Do</h2>
					<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
						{#each skills as skill}
							<div
								class="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 group"
							>
								<div class="inline-block mb-4">
									<img
										src={skill.icon}
										alt={skill.name}
										class="w-16 h-16 object-contain filter invert opacity-70 group-hover:opacity-100
                     group-hover:scale-110 transition-all duration-300"
									/>
								</div>
								<h3 class="text-xl font-semibold text-white mb-2">{skill.name}</h3>
								<p class="text-gray-300 text-sm">{skill.description}</p>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- Rest of the sections remain the same -->
		{/if}
	</main>

	{#if showFooter}
		<Footer />
	{/if}
</div>

<style>
	/* Create different animation paths for each circle */
	@keyframes float-1 {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(100px, 50px) rotate(5deg);
		}
		50% {
			transform: translate(50px, 100px) rotate(-5deg);
		}
		75% {
			transform: translate(-50px, 50px) rotate(3deg);
		}
	}

	@keyframes float-2 {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(-80px, 80px) rotate(-3deg);
		}
		50% {
			transform: translate(-30px, -60px) rotate(5deg);
		}
		75% {
			transform: translate(80px, -40px) rotate(-2deg);
		}
	}

	@keyframes float-3 {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(60px, -60px) rotate(8deg);
		}
		66% {
			transform: translate(-60px, 30px) rotate(-8deg);
		}
	}

	@keyframes float-4 {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		30% {
			transform: translate(-40px, 80px) rotate(-5deg);
		}
		60% {
			transform: translate(80px, 40px) rotate(5deg);
		}
	}

	@keyframes float-5 {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(50px, -30px) rotate(3deg);
		}
		50% {
			transform: translate(-20px, 50px) rotate(-3deg);
		}
		75% {
			transform: translate(30px, 30px) rotate(2deg);
		}
	}
	.typing-text {
		overflow: hidden;
		white-space: nowrap;
		border-right: 3px solid;
		width: 0;
		animation:
			typing 2s steps(13) forwards,
			blink 0.75s step-end infinite;
	}

	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: white;
		}
	}

	.fade-in {
		opacity: 0;
		animation: fadeIn 1s forwards;
		animation-delay: 2s;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
