import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaFolder, FaSpinner } from 'react-icons/fa';
import MainProjectCard from '../../components/MainProjectCard';





const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectsAndCategories = async () => {
      try {
        const [projectsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/projects/projects/'),
          axios.get('http://localhost:8000/api/projects/categories/')
        ]);
        setProjects(projectsRes.data);
        setFilteredProjects(projectsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndCategories();
  }, []);

  useEffect(() => {
    let results = projects;

    if (searchTerm) {
      results = results.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter(project =>
        project.category?.id.toString() === selectedCategory
      );
    }

    setFilteredProjects(results);
  }, [searchTerm, selectedCategory, projects]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2EFE7]">
      <FaSpinner className="animate-spin text-[#006A71] text-4xl" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2EFE7]">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <div className="text-red-500 mb-4">
          <FaExclamationCircle className="text-4xl mx-auto" />
        </div>
        <h2 className="text-xl font-bold text-[#1e1e1e] mb-2">Error loading projects</h2>
        <p className="text-[#1e1e1e] mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#48A6A7] text-white px-4 py-2 rounded-lg hover:bg-[#006A71] transition duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2EFE7] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#006A71]">Explore Campains</h1>

          <button
            onClick={() => navigate('/create-project')}
            className="flex items-center gap-2 bg-[#006A71] hover:bg-[#04828c] text-white px-6 py-3 rounded-lg transition duration-200 shadow-md"
          >
            <FaPlus />
            Create Campain
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="relative col-span-1 md:col-span-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#9ACBD0]" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-[#9ACBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006A71] text-[#1e1e1e]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border border-[#9ACBD0] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#006A71] text-[#1e1e1e]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-[#9ACBD0] rounded-lg p-8 text-center">
            <div className="text-[#9ACBD0] mb-4">
              <FaSearch className="text-5xl mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-[#1e1e1e] mb-2">No projects found</h3>
            <p className="text-[#1e1e1e] mb-4">
              {searchTerm || selectedCategory
                ? "Try adjusting your search or filter criteria"
                : "There are currently no projects available"}
            </p>
            {searchTerm || selectedCategory ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="bg-[#48A6A7] text-white px-4 py-2 rounded-lg hover:bg-[#006A71] transition duration-200"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <MainProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;