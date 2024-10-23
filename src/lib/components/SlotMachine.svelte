
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fly } from 'svelte/transition';

  const salaryRanges = ['120K+', '150K+', '180K+'];
  const symbols = ['💰', '💎', '🎯', '⭐️', '🎲'];
  let isSpinning = false;
  let hasWon = false;
  
  // Create stores for positions
  const positions = writable([0, 0, 0]);
  
  // Create slot data
  const slots = Array(3).fill(null).map(() => ({
    symbols: [...symbols],
    currentIndex: 0
  }));

  function shuffleArray(array: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  async function spin() {
    if (isSpinning) return;
    
    isSpinning = true;
    hasWon = false;

    // Shuffle symbols for each slot
    slots.forEach(slot => {
      slot.symbols = shuffleArray([...symbols]);
    });

    // Animate spins
    const spinDurations = [2000, 2500, 3000]; // Different duration for each reel
    const finalPositions = slots.map((_, index) => {
      const spins = 2 + index; // Each reel spins longer than the previous
      return spins * symbols.length;
    });

    // Start spinning animation
    const startTime = Date.now();
    
    function animate() {
      const currentTime = Date.now();
      const deltas = spinDurations.map((duration, index) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeProgress = easeOutCubic(progress);
        return Math.floor(finalPositions[index] * easeProgress);
      });
      
      positions.set(deltas);

      if (deltas.some((_, index) => currentTime - startTime < spinDurations[index])) {
        requestAnimationFrame(animate);
      } else {
        isSpinning = false;
        hasWon = true;
      }
    }

    requestAnimationFrame(animate);
  }

  function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }
</script>



<div class="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8">
  <div class="flex items-center gap-12 max-w-7xl mx-auto">
    <!-- GIF Section -->
    <div class="w-1.3/3">
      <img 
        src="/gif/tenor.gif" 
        alt="Slot Machine Animation" 
        class="w-full rounded-xl object-cover shadow-lg"
        style="filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3));"
      />
    </div>

    <!-- Slot Machine Section -->
    <div class="w-2/3 bg-gradient-to-b from-gray-700 to-gray-900 p-6 rounded-xl shadow-2xl">
      <!-- Display Window -->
      <div class="bg-black p-4 rounded-lg mb-6 relative overflow-hidden">
        <!-- Light Effects -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none"></div>
        
        <!-- Slots Container -->
        <div class="flex gap-2 justify-center">
          {#each slots as slot, i}
            {@const position = $positions[i]}
            <div 
              class="w-20 h-24 bg-white/5 rounded-lg overflow-hidden relative"
            >
              <!-- Symbols Strip -->
              <div 
                class="absolute left-0 right-0 transition-all duration-100"
                style="transform: translateY({-(position % symbols.length) * 100}px);"
              >
                {#each [...slot.symbols, slot.symbols[0]] as symbol}
                  <div 
                    class="h-24 flex items-center justify-center text-4xl"
                    style="text-shadow: 0 0 10px rgba(255,255,255,0.5);"
                  >
                    {symbol}
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>

        <!-- Central Line -->
        <div class="absolute left-0 right-0 top-1/2 h-1 bg-red-500/50 transform -translate-y-1/2"></div>
      </div>

      <!-- Controls -->
      <div class="text-center">
        <button
          class="relative px-8 py-4 bg-gradient-to-b from-red-500 to-red-700 text-white rounded-full 
                 font-bold text-lg transform hover:scale-105 transition-transform disabled:opacity-50
                 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/30"
          disabled={isSpinning}
          on:click={spin}
        >
          {isSpinning ? 'Spinning...' : 'SPIN!'}
          <div class="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-full"></div>
        </button>
      </div>

      <!-- Result Display -->
      {#if hasWon && !isSpinning}
        <div 
          class="mt-6 text-center bg-white/10 rounded-lg p-4"
          in:fly={{ y: 20, duration: 300 }}
        >
          <p class="text-2xl font-bold text-white mb-2">🎉 Congratulations!</p>
          <p class="text-xl text-green-300">Your salary range: {salaryRanges[Math.floor(Math.random() * salaryRanges.length)]}</p>
        </div>
      {/if}
    </div>
  </div>
</div>


<style>
  /* Glowing effect for active elements */
  @keyframes glow {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
  }

  /* Add shine effect */
  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }

  button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shine 2s infinite;
  }
</style>
