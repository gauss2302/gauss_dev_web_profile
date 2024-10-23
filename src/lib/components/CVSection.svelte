<script lang="ts">
   import { onMount } from 'svelte';
   import { fade, fly } from 'svelte/transition';
 
   let visibleSections = new Set();
 
   const workExperience = [
    {
       company: "Alma Mater",
       role: "Founder",
       period: "Feb 2023 – Present",
       location: "Remote",
       achievements: [
         "Delivered a multi-platform mobile application in Flutter for the Chinese market with BloC, Dio, GetIt.",
         "Created landing page in NextJS for promotion, implementing user acquisition and marketing strategies.",
         "Fully integrated front-end and mobile components with Go backend monolith architecture on Alibaba Cloud infrastructure.",
         "Maintained investor and stakeholder relationships, navigating pivots and product-market fit changes."
       ]
     },
     {
       company: "Quant",
       role: "Middle Flutter Engineer",
       period: "May 2024 – Sep 2024",
       location: "Remote",
       achievements: [
         "Developed new features for CRM system, profile section, and communication chats, integrating with PHP backend.",
         "Refactored legacy code, reducing technical debt by 5% and improving adherence to clean architecture principles.",
         "Led team discussions on new functionality and sprint planning/review, enhancing project efficiency.",
         "Implemented rigorous code review processes, resulting in a 10% decrease in post-release bugs."
       ]
     },
     {
       company: "Digital Creative Asia",
       role: "Junior Flutter Developer",
       period: "Aug 2022 – Oct 2023",
       location: "Shanghai, China",
       achievements: [
         "Delivered Flutter mobile applications, developing new features and optimizing performance.",
         "Integrated front-end with backend services in NodeJS and PHP, ensuring seamless data flow and user experience.",
         "Prepared and released applications on AppStore, Play Store, and Baidu Store.",
         "Conducted code reviews and optimized legacy code, improving overall code quality by 35%."
       ]
     },
     {
       company: "Alibaba Co.",
       role: "Front-End Engineer Intern",
       period: "Nov 2021 – May 2022",
       location: "Shanghai, China",
       achievements: [
         "Collaborated with designers to implement UI/UX designs, enhancing user engagement by 20% in e-commerce products.",
         "Gained hands-on experience in building cross-platform mobile applications using BloC and Riverpod."
       ]
     },
     {
       company: "Oxford Instruments",
       role: "Financial Analyst",
       period: "Jan 2020 – Sep 2021",
       location: "Shanghai, China",
       achievements: [
         "Pioneered data analysis automation using Python (NumPy, Pandas, Statsmodels), boosting reporting efficiency by 40%.",
         "Improved financial models for strategic decision-making, optimizing processes through custom Excel solutions.",
         "Delivered impactful reports and presentations, providing actionable insights that drove significant improvements in financial performance.",
         "Bridged gap between financial data and business strategy, facilitating data-driven decision making across departments."
       ]
     }
   ];
 
   const education = [
     {
       school: "Fudan University",
       degree: "MSc in Economics & Finance",
       period: "July 2023",
       location: "Shanghai, China",
       gpa: "3.34/4.0 GPA"
     },
     {
       school: "Shanghai University",
       degree: "MSc in Finance, Minor in Computer Science",
       period: "September 2021",
       location: "Shanghai, China",
       gpa: "89.28/100.0 GPA"
     }
   ];
 
   onMount(() => {
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             visibleSections.add(entry.target.id);
             visibleSections = visibleSections;
           }
         });
       },
       {
         threshold: 0.1,
         rootMargin: '50px'
       }
     );
 
     document.querySelectorAll('.cv-section').forEach(section => {
       observer.observe(section);
     });
 
     return () => observer.disconnect();
   });
 </script>
 
 <section class="py-20">
   <!-- Work Experience -->
   <div 
     id="experience"
     class="cv-section mb-16"
   >
     {#if visibleSections.has('experience')}
       <h2 
         class="text-3xl font-bold text-white mb-8"
         in:fly={{ y: 20, duration: 800 }}
       >
         Work Experience  <!-- Removed colored background -->
       </h2>
 
       <div class="space-y-12">
         {#each workExperience as job, index}
           <div 
             class="relative pl-8 pb-12 border-l-2 border-indigo-500/20"
             in:fly={{ x: -20, duration: 800, delay: 200 + index * 100 }}
           >
             <div class="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[9px] top-0"></div>
             <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
               <div class="flex flex-wrap justify-between items-start mb-4">
                 <div>
                   <h3 class="text-xl font-bold text-white">{job.company}</h3>
                   <p class="text-indigo-300">{job.role}</p>
                   <p class="text-gray-400 text-sm">{job.location}</p>
                 </div>
                 <span class="text-gray-400 text-sm">{job.period}</span>
               </div>
               <ul class="space-y-2 text-gray-300">
                 {#each job.achievements as achievement}
                   <li class="flex items-start">
                     <span class="text-indigo-400 mr-2">▪</span>
                     {achievement}
                   </li>
                 {/each}
               </ul>
             </div>
           </div>
         {/each}
       </div>
     {/if}
   </div>
 
   <!-- Education -->
   <div 
     id="education"
     class="cv-section"
   >
     {#if visibleSections.has('education')}
       <h2 
         class="text-3xl font-bold text-white mb-8"
         in:fly={{ y: 20, duration: 800 }}
       >
         Education  <!-- Removed colored background -->
       </h2>
 
       <div class="space-y-8">
         {#each education as edu, index}
           <div 
             class="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
             in:fly={{ x: -20, duration: 800, delay: 200 + index * 100 }}
           >
             <div class="flex flex-wrap justify-between items-start mb-4">
               <div>
                 <h3 class="text-xl font-bold text-white">{edu.school}</h3>
                 <p class="text-indigo-300">{edu.degree}</p>
               </div>
               <span class="text-gray-400 text-sm">{edu.period}</span>
             </div>
             <p class="text-gray-300">{edu.gpa} • {edu.location}</p>
           </div>
         {/each}
       </div>
     {/if}
   </div>
 </section>
 
 <style>
   .cv-section:last-child .relative:last-child {
     border-left: none;
   }
 
   @keyframes pulse {
     0%, 100% { transform: scale(1); }
     50% { transform: scale(1.1); }
   }
 
   .bg-indigo-500 {
     animation: pulse 2s infinite;
   }
 </style>