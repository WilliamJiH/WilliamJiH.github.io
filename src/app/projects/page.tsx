import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React and Node.js, featuring user authentication, payment integration, and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Completed",
      className: "md:col-span-2",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
          <div className="text-2xl">🛒</div>
        </div>
      ),
      icon: <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      status: "In Progress",
      className: "md:col-span-1",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
          <div className="text-2xl">📋</div>
        </div>
      ),
      icon: <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that displays current conditions, forecasts, and weather maps using various weather APIs.",
      technologies: ["React", "Weather API", "Chart.js", "Tailwind CSS"],
      status: "Completed",
      className: "md:col-span-1",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
          <div className="text-2xl">🌤️</div>
        </div>
      ),
      icon: <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my work and skills with smooth animations and interactive elements.",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "MDX"],
      status: "Completed",
      className: "md:col-span-2",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
          <div className="text-2xl">💼</div>
        </div>
      ),
      icon: <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0" />,
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 5,
      title: "AI Chat Bot",
      description: "An intelligent chatbot powered by machine learning, capable of natural language understanding and contextual responses.",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"],
      status: "Completed",
      className: "md:col-span-1",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center">
          <div className="text-2xl">🤖</div>
        </div>
      ),
      icon: <div className="w-4 h-4 rounded-full bg-pink-500 flex-shrink-0" />,
      demoLink: "#",
      codeLink: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique 
            challenge and learning opportunity in my development journey.
          </p>
        </div>

        <BentoGrid className="max-w-4xl mx-auto">
          {projects.map((project) => (
            <BentoGridItem
              key={project.id}
              title={project.title}
              description={project.description}
              header={project.header}
              icon={project.icon}
              technologies={project.technologies}
              status={project.status}
              demoLink={project.demoLink}
              codeLink={project.codeLink}
              className={project.className}
            />
          ))}
        </BentoGrid>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Want to collaborate?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            I'm always looking for new challenges and interesting projects to work on.
          </p>
          <a 
            href="#"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>
        
        <div className="mt-20 space-y-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Technologies I Work With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker'].map((tech) => (
                <div key={tech} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              My Development Process
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Plan</h3>
                <p className="text-gray-600 dark:text-gray-400">Understanding requirements and creating a roadmap</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Build</h3>
                <p className="text-gray-600 dark:text-gray-400">Developing with best practices and clean code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Deploy</h3>
                <p className="text-gray-600 dark:text-gray-400">Testing thoroughly and launching successfully</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 h-32"></div>
      </div>
    </div>
  );
}