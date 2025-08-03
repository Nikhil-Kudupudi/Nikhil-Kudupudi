import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink, Database, Brain, BarChart3, Cloud, Code2, ChevronDown, Menu, X, Filter, Sparkles, Moon, Sun } from 'lucide-react';
import DataGlobe from './DataGlobe';
import ParticleNetwork from './ParticleNetwork';
import SkillsChart from './SkillsChart';
import TechCarousel from './TechCarousel';

// LoadingSpinner component - defined OUTSIDE the main component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-950 rounded-full" />
        {/* Floating Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-8 right-8 p-4 rounded-full transition-all duration-300 transform hover:scale-110 z-50 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 shadow-lg shadow-yellow-400/50'
            : 'bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-300 hover:to-blue-300 shadow-lg shadow-purple-400/50'
        }`}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <div className="relative">
          {theme === 'dark' ? (
            <Sun size={24} className="text-gray-900 animate-pulse" />
          ) : (
            <Moon size={24} className="text-white animate-pulse" />
          )}
        </div>
      </button>
    </div>
    </div>
  </div>
);

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const projects = [
  {
    "title": "Modular RAG Application",
    "description": "Scalable, Dockerized NLP chatbot using configurable content sources. GCP-native with orchestrated pipelines and real-time retrieval.",
    "tags": ["Data Science", "MLOps"],
    "tech": ["RAG", "MLflow", "Prefect", "Airflow", "Streamlit", "GCP", "Docker"],
    "highlights": ["Real-time retrieval", "Scalable architecture", "Cloud-native deployment"],
    "github": "https://github.com/Nikhil-Kudupudi/NUBot",
    "live": "#"
  },
  {
    "title": "Reddit Data Engineering Pipeline",
    "description": "PRAW-powered ETL with AWS infrastructure, cataloging with Glue, analytics-ready tables, and BI dashboards.",
    "tags": ["Data Engineering", "Data Analytics"],
    "tech": ["Airflow", "Celery", "PostgreSQL", "AWS S3", "Glue", "Redshift", "Athena"],
    "highlights": ["1000s daily records", "Automated ETL", "BI Integration"],
    "github": "https://github.com/Nikhil-Kudupudi/Reddit_DataEngineering",
    "live": "#"
  },
  {
    "title": "Real-Time News Analytics",
    "description": "End-to-end real-time pipeline with dynamic topic ingestion, sentiment/NLP analysis, and multi-platform visualizations.",
    "tags": ["Data Engineering", "Data Science"],
    "tech": ["Kafka", "Spark Streaming", "NLP", "dbt", "Delta Lake", "Sentiment Analysis"],
    "highlights": ["Real-time processing", "Visual insights", "Dynamic dashboards"],
    "github": "https://github.com/Nikhil-Kudupudi/News-Analytics-pipeline",
    "live": "#"
  },
  {
    "title": "Employment System Dashboard",
    "description": "Backend for applicant onboarding with auto email alerts and risk modeling for investment recommendations.",
    "tags": ["Data Analytics", "Backend"],
    "tech": ["API Engineering", "Streamlit", "Performance Tuning", "Email Automation"],
    "highlights": ["15% faster onboarding", "Automated alerts", "Risk modeling"],
    "github": "#",
    "live": "#"
  },
  {
    "title": "Bank Churn Analysis",
    "description": "Built ML models and interactive dashboards to identify high-risk banking customers and enable proactive retention strategies.",
    "tags": ["Data Science", "Data Analytics"],
    "tech": ["Pandas", "Logistic Regression", "Tableau", "Matplotlib"],
    "highlights": ["Feature engineering", "Customer segmentation", "Actionable insights"],
    "github": "#",
    "live": "#"
  },
  {
    "title": "Crash Reporting Analytics",
    "description": "Performed geo-temporal analysis of crash reports and visualized trends using advanced statistical and heatmap techniques.",
    "tags": ["Data Analytics"],
    "tech": ["Pandas", "Seaborn", "Matplotlib", "KDE", "Geo Analysis"],
    "highlights": ["Crash pattern discovery", "Visual storytelling", "Safety planning"],
    "github": "#",
    "live": "#"
  },
  {
    "title": "Crime Data Visualization",
    "description": "Analyzed public crime data to uncover trends and built real-time dashboards using Power BI and Python.",
    "tags": ["Data Analytics"],
    "tech": ["Power BI", "Pandas", "NumPy", "Matplotlib"],
    "highlights": ["Interactive dashboards", "Anomaly detection", "Trend analysis"],
    "github": "#",
    "live": "#"
  },
  {
    "title": "Heart Disease Prediction with ML",
    "description": "Applied multiple ML models on structured health data to predict heart disease, highlighting logistic regression’s edge in binary classification.",
    "tags": ["Data Science", "ML"],
    "tech": ["Scikit-learn", "XGBoost", "Pandas", "Matplotlib"],
    "highlights": ["Model comparison", "Healthcare ML", "Metric-driven evaluation"],
    "github": "https://github.com/Nikhil-Kudupudi/HeartDisease-prediction",
    "live": "#"
  },
  {
    "title": "Autonomous Car Steering Simulation",
    "description": "Trained a CNN on Udacity simulator data to predict steering angles based on frame-by-frame image input.",
    "tags": ["Deep Learning", "Computer Vision"],
    "tech": ["CNN", "Keras", "Udacity Simulator", "Python"],
    "highlights": ["Simulation data", "CNN architecture", "Driving behavior modeling"],
    "github": "#",
    "live": "#"
  }
];

  const techStack = {
    'Data Engineering': ['Kafka', 'Spark Streaming', 'Airflow', 'Prefect', 'dbt', 'Delta Lake', 'Apache Hadoop', 'Glue', 'Athena', 'Redshift'],
    'Data Analytics': ['SQL', 'Tableau', 'Power BI', 'Snowflake', 'Streamlit', 'A/B Testing'],
    'Data Science & ML': ['Python', 'MLflow', 'NER', 'Sentiment Analysis', 'scikit-learn', 'Pandas', 'NumPy'],
    'Cloud & DevOps': ['AWS (S3, Glue, Redshift)', 'GCP (Cloud Run, Artifact Registry)', 'Docker', 'GitHub Actions']
  };

  const filteredProjects = projectFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(projectFilter));

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-slate-100 text-gray-900'
    }`}>
      {/* Add Particle Network */}
      <ParticleNetwork theme={theme} />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-950/20 via-gray-950 to-purple-950/20' 
            : 'bg-gradient-to-br from-blue-200/20 via-slate-100 to-purple-200/20'
        }`} />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${
              theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'
            } 0%, transparent 50%)`
          }}
        />
        {/* Simple grid pattern using CSS */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${
              theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'
            } 1px, transparent 1px), linear-gradient(90deg, ${
              theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'
            } 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? theme === 'dark'
            ? 'bg-gray-950/90 backdrop-blur-xl py-4 border-b border-gray-800' 
            : 'bg-white/90 backdrop-blur-xl py-4 border-b border-gray-200 shadow-sm'
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold group cursor-pointer">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-400 group-hover:to-purple-400">
              NK
            </span>
          </h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all duration-300 relative group ${
                  activeSection === section 
                    ? 'text-cyan-400' 
                    : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <span className="relative z-10">{section}</span>
                <span className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md blur-md ${
                  activeSection === section ? 'opacity-50' : ''
                }`} />
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 text-yellow-400 hover:text-white hover:shadow-lg hover:shadow-yellow-400/25'
                  : 'bg-gray-200 hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 text-gray-700 hover:text-white hover:shadow-lg hover:shadow-purple-400/25'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 text-white"
              onClick={() => window.open('https://docs.google.com/document/d/1gz0Ox3_rSy_5jd6ys_9YmfT-UMf_luCs/edit?usp=sharing&ouid=115419692824155437603&rtpof=true&sd=true', '_blank')}
            >
              <Download size={16} />
              Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 w-full backdrop-blur-xl border-b ${
            theme === 'dark'
              ? 'bg-gray-950/95 border-gray-800'
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="flex flex-col p-6 space-y-4">
              {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="capitalize text-left text-lg hover:text-cyan-400 transition-colors"
                >
                  {section}
                </button>
              ))}
              
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-yellow-400'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-center text-white">
                Download Resume
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center z-10">
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64">
                <DataGlobe />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Nikhil Kudupudi
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Data Analytics Engineer
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Building scalable data platforms, real-time streaming pipelines, and ML-driven insights
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 text-white"
              >
                View Projects
              </button>
              <button className={`px-8 py-3 border border-cyan-500 rounded-lg font-semibold transition-all duration-300 ${
                theme === 'dark' 
                  ? 'hover:bg-cyan-500/10 text-white' 
                  : 'hover:bg-cyan-500/10 text-gray-700'
              }`}>
                Download Resume
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-3 border rounded-lg font-semibold transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-gray-700 hover:border-cyan-500 text-white'
                    : 'border-gray-300 hover:border-cyan-500 text-gray-700'
                }`}
              >
                Contact
              </button>
            </div>
            
            <div className="flex justify-center space-x-6 pt-8">
              <a 
                href="https://github.com/Nikhil-Kudupudi" 
                className="relative group transform hover:scale-110 transition-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                <Github className={`relative w-8 h-8 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-white'
                }`} />
              </a>
              <a 
                href="https://linkedin.com/in/nikhilkudupudi" 
                className="relative group transform hover:scale-110 transition-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                <Linkedin className={`relative w-8 h-8 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-white'
                }`} />
              </a>
              <a 
                href="mailto:nikhil.kudupudi@example.com" 
                className="relative group transform hover:scale-110 transition-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                <Mail className={`relative w-8 h-8 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-white'
                }`} />
              </a>
            </div>
            
            <div className="pt-12">
              <button
                onClick={() => scrollToSection('about')}
                className="animate-bounce"
              >
                <ChevronDown className="w-8 h-8 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Carousel */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-6 z-10">
          <h3 className={`text-2xl font-semibold text-center mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Technologies I Work With
          </h3>
          <TechCarousel theme={theme} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20">
        <div className="container mx-auto px-6 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className={`backdrop-blur-lg rounded-2xl p-8 md:p-12 border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900/50 border-gray-800'
                : 'bg-white/80 border-gray-300 shadow-xl'
            }`} 
                 style={{
                   boxShadow: theme === 'dark' 
                     ? 'inset 0 0 0 1px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.2)'
                     : '0 10px 40px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(59, 130, 246, 0.2)'
                 }}>
              <p className={`text-lg leading-relaxed mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I'm a Data Analytics Engineer passionate about building <span className="text-cyan-500 font-semibold">scalable data platforms</span>, <span className="text-cyan-500 font-semibold">real-time streaming pipelines</span>, and integrating <span className="text-cyan-500 font-semibold">ML-driven insights</span> into end-to-end workflows. With a solid foundation in Python, SQL, Spark, Kafka, and cloud platforms (AWS, GCP), I bridge the gap between raw data and actionable intelligence.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center group">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                    theme === 'light' && 'border border-blue-200 shadow-lg'
                  }`}>
                    <Database className="w-10 h-10 text-cyan-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Data Engineering</h3>
                  <p className={`text-sm mt-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Scalable pipelines & ETL</p>
                </div>
                <div className="text-center group">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                    theme === 'light' && 'border border-purple-200 shadow-lg'
                  }`}>
                    <Brain className="w-10 h-10 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Data Science</h3>
                  <p className={`text-sm mt-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>ML & NLP solutions</p>
                </div>
                <div className="text-center group">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                    theme === 'light' && 'border border-green-200 shadow-lg'
                  }`}>
                    <BarChart3 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Data Analytics</h3>
                  <p className={`text-sm mt-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Insights & visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20">
        <div className="container mx-auto px-6 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['All', 'Data Engineering', 'Data Science', 'Data Analytics'].map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  projectFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'
                }`}
              >
                <Filter size={16} className="inline mr-2" />
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className={`group relative backdrop-blur-lg rounded-2xl overflow-hidden border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-900/50 border-gray-800 hover:border-cyan-500/50'
                    : 'bg-white/90 border-gray-300 hover:border-cyan-500 shadow-xl hover:shadow-2xl'
                }`}
              >
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300'
                            : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-700 border border-cyan-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-cyan-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className={`mb-6 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{project.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>Key Highlights</h4>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className={`text-sm flex items-start ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <span className="text-cyan-500 mr-2">▸</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 rounded text-xs transition-all duration-300 ${
                              theme === 'dark'
                                ? 'bg-gray-800 text-gray-300'
                                : 'bg-gray-700 text-gray-100'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex space-x-4 mt-6 pt-6 border-t ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <a
                      href={project.github}
                      className={`flex items-center space-x-2 hover:text-cyan-500 transition-colors ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20">
        <div className="container mx-auto px-6 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <div className="max-w-5xl mx-auto space-y-8">
            {Object.entries(techStack).map(([category, skills]) => (
              <div key={category} className={`backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-900/50 border-gray-800'
                  : 'bg-white/90 border-gray-300 shadow-xl'
              }`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  {category === 'Data Engineering' && <Database className="w-6 h-6 mr-3 text-cyan-500" />}
                  {category === 'Data Analytics' && <BarChart3 className="w-6 h-6 mr-3 text-green-500" />}
                  {category === 'Data Science & ML' && <Brain className="w-6 h-6 mr-3 text-purple-500" />}
                  {category === 'Cloud & DevOps' && <Cloud className="w-6 h-6 mr-3 text-blue-500" />}
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 border relative overflow-hidden group cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-gray-800/50 text-gray-300 hover:text-white border-gray-700 hover:border-transparent'
                          : 'bg-white text-gray-700 hover:text-white border-gray-400 hover:border-transparent shadow-md'
                      }`}
                    >
                      <span className="relative z-10">{skill}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Skills Chart - INSIDE the skills section */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-center mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Skills Overview
              </span>
            </h3>
            <div className={`max-w-3xl mx-auto backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900/50 border-gray-800'
                : 'bg-white/90 border-gray-300 shadow-xl'
            }`}>
              <SkillsChart theme={theme} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20">
        <div className="container mx-auto px-6 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b ${
                theme === 'dark'
                  ? 'from-cyan-500/50 to-purple-500/50'
                  : 'from-cyan-400/50 to-purple-400/50'
              }`} />
              
              {/* Experience items */}
              <div className="space-y-12">
                <div className="relative flex items-center md:justify-between">
                  <div className={`backdrop-blur-lg rounded-2xl p-6 md:p-8 border w-full md:w-5/12 ml-8 md:ml-0 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-900/50 border-gray-800'
                      : 'bg-white/90 border-gray-300 shadow-xl'
                  }`}>
                    <h3 className="text-xl font-semibold mb-2">Backend/API Engineering</h3>
                    <p className="text-cyan-500 mb-3">KFintech (WebileApps)</p>
                    <ul className={`space-y-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">▸</span>
                        15% faster onboarding pipelines
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">▸</span>
                        Automated email & alert systems
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">▸</span>
                        Client-agnostic scalable backend with data-driven risk model integration
                      </li>
                    </ul>
                  </div>
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 ${
                    theme === 'dark' ? 'border-gray-950' : 'border-gray-50'
                  }`} />
                </div>
              </div>
            </div>
            
            {/* Achievements */}
            <div className={`mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border transition-all duration-300 ${
              theme === 'dark' ? 'border-cyan-500/20' : 'border-cyan-400/40 shadow-xl bg-white/60'
            }`}>
              <h3 className="text-2xl font-semibold mb-6 text-center">Key Achievements</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-500 mb-2">RAG</div>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Led RAG-based chatbot with Prefect-AI orchestration
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-500 mb-2">1000s</div>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Daily records ingested via dynamic ETL pipelines
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500 mb-2">Real-time</div>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Dashboards influencing business decisions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        <div className="container mx-auto px-6 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className={`text-xl mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I'm always open to discussing data engineering challenges, ML innovations, or collaboration opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:nikhil.kudupudi@example.com"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 text-white"
              >
                <Mail size={20} />
                <span>Say Hello</span>
              </a>
              <a
                href="https://linkedin.com/in/nikhilkudupudi"
                className={`inline-flex items-center space-x-2 border border-cyan-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  theme === 'dark'
                    ? 'hover:bg-cyan-500/10 text-white'
                    : 'hover:bg-cyan-500/10 text-gray-700'
                }`}
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Nikhil-Kudupudi"
                className={`inline-flex items-center space-x-2 border px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-gray-700 hover:border-cyan-500 text-white'
                    : 'border-gray-300 hover:border-cyan-500 text-gray-700'
                }`}
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
            
            <div className={`mt-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p>nikhilkudupudi.live</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
