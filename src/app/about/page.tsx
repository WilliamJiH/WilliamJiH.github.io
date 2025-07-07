export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Hello! I'm a passionate developer who loves creating innovative solutions 
              and bringing ideas to life through code. With a strong foundation in modern 
              web technologies, I enjoy tackling challenging problems and learning new 
              technologies.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              My journey in software development has been driven by curiosity and a 
              desire to build meaningful applications that make a difference. I'm 
              always eager to collaborate on exciting projects and contribute to 
              the developer community.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                React
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                Node.js
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                Next.js
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
                <p className="text-sm opacity-90">Your Photo Here</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Let's Connect
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborating on 
            interesting projects, or just having a chat about technology and development.
          </p>
        </div>
      </div>
    </div>
  );
}