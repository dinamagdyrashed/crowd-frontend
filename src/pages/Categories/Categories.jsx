import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FaLaptop, FaHeartbeat, FaBook, FaPaintBrush, FaHandsHelping,
  FaArrowRight
} from 'react-icons/fa';

const COLORS = {
  primary: '#006A71',
  secondary: '#48A6A7',
  accent: '#9ACBD0',
  background: '#F2EFE7',
  textDark: '#1e1e1e',
  textLight: '#ffffff',
};

// Base URL for your backend
const BASE_URL = 'http://localhost:8000';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(3); // Lowered to 3 for testing
  const [showCategories, setShowCategories] = useState(false); // State for delaying category appearance

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories from API
        const categoriesResponse = await axios.get('http://localhost:8000/api/projects/categories/');
        console.log('Categories:', categoriesResponse.data);
        setCategories(categoriesResponse.data);

        // Fetch projects
        const projectsResponse = await axios.get('http://localhost:8000/api/projects/projects/');
        console.log('Projects:', projectsResponse.data);
        if (projectsResponse.data.length === 0) {
          // Mock data for testing
          setProjects([
            {
              id: 1,
              title: "Tech Project",
              category: { id: 1, name: "Technology" },
              images: [{ url: "/media/project_images/tech.jpg" }],
              owner: "John Doe",
              details: "A tech project description",
              total_donations: 500,
              total_target: 1000
            },
            {
              id: 2,
              title: "Health Project",
              category: { id: 2, name: "Health" },
              images: [{ url: "/media/project_images/health.jpg" }],
              owner: "Jane Doe",
              details: "A health project description",
              total_donations: 300,
              total_target: 1000
            }
          ]);
        } else {
          setProjects(projectsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Effect to trigger the fade-in animation for categories
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowCategories(true);
      }, 300); // Delay of 300ms
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Group projects by category
  const getProjectsByCategory = (categoryId) => {
    const filteredProjects = projects
      .filter((project) => project.category.id === categoryId)
      .slice(0, 3);
    console.log(`Projects for category ${categoryId}:`, filteredProjects);
    return filteredProjects;
  };

  // Show more categories
  const handleShowMoreCategories = () => {
    setVisibleCategoriesCount((prevCount) => {
      const newCount = prevCount + 3; // Increment by 3 for testing
      console.log('New visibleCategoriesCount:', newCount);
      return newCount;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <p style={{ color: COLORS.textDark }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <p style={{ color: COLORS.textDark }}>{error}</p>
      </div>
    );
  }

  // Slice categories to show only the visible ones
  const visibleCategories = categories.slice(0, visibleCategoriesCount);
  console.log('Visible Categories:', visibleCategories);
  console.log('Total Categories Length:', categories.length);
  console.log('Visible Categories Count:', visibleCategoriesCount);
  console.log('Should Show More Button Be Visible?', visibleCategoriesCount < categories.length);

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <main className="container mx-auto py-12 px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary }}>
            Browse fundraisers by category
          </h1>
          <p className="text-lg mb-6" style={{ color: COLORS.textDark }}>
            People around the world are raising money for what they are passionate about.
          </p>
          <button 
            className="px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: COLORS.primary, 
              color: COLORS.textLight 
            }}
          >
            Start a GoFundMe
          </button>
        </div>

        {/* Category Grid Section */}
        <div className="mb-12 mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center h-32 transition-opacity duration-500 ${
                  showCategories ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Image Container */}
                <div className="mb-2">
                  <img
                    src={`${BASE_URL}${category.image}`}
                    alt={category.name}
                    className="w-12 h-12 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48'; // Fallback image if loading fails
                    }}
                  />
                </div>
                
                {/* Category Name */}
                <p className="text-sm text-center" style={{ color: COLORS.textDark }}>
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <hr className="my-8 border-t-2" style={{ borderColor: COLORS.secondary }} />

        {/* Categories and Projects Section */}
        {visibleCategories.length === 0 ? (
          <p className="text-center" style={{ color: COLORS.textDark }}>
            No categories available.
          </p>
        ) : (
          visibleCategories.map((category, index) => {
            const categoryProjects = getProjectsByCategory(category.id);
            if (categoryProjects.length === 0) {
              console.log(`No projects found for category ${category.name}`);
              return null;
            }

            return (
              <div key={category.id}>
                <div className="mb-12">
                  {/* Category Title */}
                  <h2 className="text-2xl font-semibold mb-6" style={{ color: COLORS.textDark }}>
                    {category.name} Fundraisers
                  </h2>

                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categoryProjects.map((project) => (
                      <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {/* Project Image with Owner Overlay */}
                        <div className="relative">
                          <img
                            src={
                              project.images && project.images.length > 0
                                ? `${BASE_URL}${project.images[0].url}`
                                : 'https://via.placeholder.com/300x200'
                            }
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          {/* Owner Name Overlay */}
                          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                            {project.owner}
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="p-4">
                          {/* Title */}
                          <h3 className="text-lg font-medium mb-2" style={{ color: COLORS.textDark }}>
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-gray-600 mb-3">{project.details}</p>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (project.total_donations / parseFloat(project.total_target)) * 100,
                                  100
                                )}%`,
                                backgroundColor: COLORS.primary,
                              }}
                            ></div>
                          </div>

                          {/* Amount Raised */}
                          <p className="text-sm" style={{ color: COLORS.textDark }}>
                            ${project.total_donations.toLocaleString()} raised
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* See More Link */}
                  <div className="text-right mt-6">
                    <a 
                      href="#" 
                      className="text-sm font-semibold inline-flex items-center hover:underline"
                      style={{ color: COLORS.primary }}
                    >
                      See more 
                      <FaArrowRight className="ml-2 relative top-0.5" style={{ color: COLORS.primary }} />
                    </a>
                  </div>
                </div>

                {/* Separator Line Between Categories (except for the last one) */}
                {index < visibleCategories.length - 1 && (
                  <hr className="my-8 border-t-2" style={{ borderColor: COLORS.secondary }} />
                )}
              </div>
            );
          })
        )}

        {/* Show More Categories Button */}
        {visibleCategoriesCount < categories.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleShowMoreCategories}
              className="px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: COLORS.primary, 
                color: COLORS.textLight 
              }}
            >
              Show More Categories
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Categories;