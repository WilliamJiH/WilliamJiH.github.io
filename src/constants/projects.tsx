import React from 'react';
import { ProjectCard } from '@/types';

export const PROJECT_CARDS: ProjectCard[] = [
  {
    src: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Project Alpha",
    category: "Web Development",
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          A full-stack web application built with React and Node.js. Features include user authentication, 
          real-time data updates, and responsive design.
        </p>
      </div>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Project Beta",
    category: "Mobile App",
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          A cross-platform mobile application developed with React Native. Includes features like offline support,
          push notifications, and seamless user experience.
        </p>
      </div>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Project Gamma",
    category: "Data Analytics",
    content: (
      <div>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          A comprehensive data analytics platform with machine learning capabilities. Built using Python,
          TensorFlow, and modern visualization libraries.
        </p>
      </div>
    ),
  },
];