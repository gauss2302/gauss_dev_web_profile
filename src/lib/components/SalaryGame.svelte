<script lang="ts">
  import { fly } from 'svelte/transition';

  let cups = [
    { id: 0, hasBall: false, isRevealed: false, amount: "120K+" },
    { id: 1, hasBall: false, isRevealed: false, amount: "150K+" },
    { id: 2, hasBall: false, isRevealed: false, amount: "180K+" }
  ];
  
  let isShuffling = false;
  let gameStarted = false;
  let gameEnded = false;
  let correctCup: number;
  
  function startGame() {
    gameStarted = true;
    isShuffling = true;
    correctCup = Math.floor(Math.random() * 3);
    cups = cups.map((cup, index) => ({
      ...cup,
      hasBall: index === correctCup,
      isRevealed: false
    }));
    
    setTimeout(() => {
      isShuffling = false;
    }, 2000);
  }
  
  function revealCup(index: number) {
    if (!gameStarted || isShuffling || gameEnded) return;
    
    cups = cups.map((cup, i) => ({
      ...cup,
      isRevealed: i === index ? true : cup.isRevealed
    }));
    
    if (index === correctCup) {
      gameEnded = true;
    }
  }
  
  function resetGame() {
    gameStarted = false;
    gameEnded = false;
    isShuffling = false;
    cups = cups.map(cup => ({
      ...cup,
      hasBall: false,
      isRevealed: false
    }));
  }
</script>

<div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
   <!-- Game instructions -->
   <div class="text-center mb-6">
     <p class="text-gray-200 text-lg">
       Can you guess the right cup? 🎲
     </p>
     {#if !gameStarted}
       <button
         class="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 
                transition-all duration-300 transform hover:scale-105"
         on:click={startGame}
       >
         Start Game
       </button>
     {/if}
   </div>
 
   <!-- Cups container -->
   <div class="flex justify-center items-end gap-6 h-48 my-6">
     {#each cups as cup, index}
       <div 
         class="relative cursor-pointer transform transition-all duration-300
                {isShuffling ? 'animate-shuffle' : ''}
                {cup.isRevealed ? 'translate-y-12' : 'hover:translate-y-2'}
                {gameEnded && cup.hasBall ? 'scale-110' : ''}"
         style="animation-delay: {index * 0.2}s"
         on:click={() => revealCup(index)}
       >
         <!-- Cup -->
         <div 
           class="w-20 h-28 md:w-24 md:h-32 bg-gradient-to-br from-indigo-400 to-purple-500 
                  rounded-t-full relative transform-gpu transition-transform duration-500
                  {cup.isRevealed ? 'rotate-x-180' : ''}"
         >
           <div class="absolute inset-0 rounded-t-full bg-black/20"></div>
         </div>
         
         <!-- Ball or Amount -->
         {#if cup.isRevealed}
           <div class="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-16
                     text-white font-bold text-lg whitespace-nowrap">
             {cup.hasBall ? 
               `🎉 ${cup.amount}` :
               '❌'
             }
           </div>
         {/if}
       </div>
     {/each}
   </div>
 
   <!-- Game end message -->
   {#if gameEnded}
     <div class="text-center mt-6">
       <p class="text-green-300 mb-4">Congratulations! You found the salary range! 🎉</p>
       <button
         class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 
                transition-all duration-300"
         on:click={resetGame}
       >
         Play Again
       </button>
     </div>
   {/if}
 </div>
 
 <style>
   @keyframes shuffle {
     0%, 100% { transform: translateX(0); }
     25% { transform: translateX(-50px) rotate(-10deg); }
     75% { transform: translateX(50px) rotate(10deg); }
   }
 
   .animate-shuffle {
     animation: shuffle 0.5s ease-in-out infinite;
   }
 
   .rotate-x-180 {
     transform: rotateX(180deg);
   }
 </style>
