import React from 'react';
import { motion } from 'framer-motion';

const TechCarousel = () => {
  const technologies = [
    { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-blue-600' },
    { name: 'Kafka', icon: '📊', color: 'from-gray-700 to-gray-900' },
    { name: 'Spark', icon: '⚡', color: 'from-orange-400 to-orange-600' },
    { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-blue-600' },
    { name: 'AWS', icon: '☁️', color: 'from-orange-500 to-orange-700' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500 to-blue-700' },
    { name: 'Airflow', icon: '🌊', color: 'from-teal-400 to-cyan-600' },
    { name: 'GCP', icon: '🌐', color: 'from-blue-500 to-red-500' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700' },
  ];

  // Double the array for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="relative overflow-hidden py-12">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10" />
      
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -50 * technologies.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedTech.map((tech, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative group cursor-pointer">
              {/* Background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
              
              {/* Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 group-hover:border-gray-700 transition-colors duration-300">
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {tech.name}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechCarousel;