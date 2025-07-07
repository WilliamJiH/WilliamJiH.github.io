"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  technologies,
  demoLink,
  codeLink,
  status,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  technologies?: string[];
  demoLink?: string;
  codeLink?: string;
  status?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header && (
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          {header}
        </div>
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
        
        {technologies && (
          <div className="flex flex-wrap gap-1 mt-2">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {status && (
          <div className="mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              status === 'Completed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {status}
            </span>
          </div>
        )}
        
        {(demoLink || codeLink) && (
          <div className="flex gap-2 mt-3">
            {demoLink && (
              <a
                href={demoLink}
                className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
              >
                Demo
              </a>
            )}
            {codeLink && (
              <a
                href={codeLink}
                className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded text-xs hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};