import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    // Color palette
    const colors = {
        primary: "#006A71",
        secondary: "#48A6A7",
        accent: "#9ACBD0",
        background: "#F2EFE7",
        textDark: "#1e1e1e",
        textLight: "#ffffff"
    };

    // Calculate progress percentage (using API field progress_percentage if available)
    const progress = project.progress_percentage !== undefined
        ? project.progress_percentage
        : project.total_donations && project.total_target
            ? Math.min(100, (project.total_donations / project.total_target) * 100)
            : 0;

    // Format currency (using total_donations instead of current_amount)
    const formattedAmount = project.total_donations
        ? `$${parseFloat(project.total_donations).toLocaleString()} raised`
        : "$0 raised";

    const getFirstImageUrl = (images) => {
        if (images && images.length > 0) {
            return `http://localhost:8000${images[0].url}`;
        }
        return null;
    };

    const handleDonateNow = (projectId) => {
        navigate(`/projects/${projectId}/donate`);
    };

    // Add error handling for missing project data
    if (!project) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <p className="text-gray-500">Project data not available</p>
            </div>
        );
    }

    return (
        <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-100 border border-gray-100"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
        >
            {/* Project Image */}
            <div className="relative h-48 w-full overflow-hidden">
                {getFirstImageUrl(project.images) ? (
                    <motion.img
                        src={getFirstImageUrl(project.images)}
                        alt={project.title || "Project image"}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image Available
                    </div>
                )}
            </div>

            {/* Project Content */}
            <div className="p-4">
                {/* Category */}
                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ backgroundColor: colors.accent, color: colors.textDark }}>
                        {project.category?.name || "Uncategorized"}
                    </span>
                    {project.is_active ? (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                            Active
                        </span>
                    ) : (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-800">
                            Ended
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    <Link
                        to={`/projects/${project.id}`}
                        className="hover:text-primary transition-colors"
                        style={{ color: colors.textDark }}
                    >
                        {project.title || "Untitled Project"}
                    </Link>
                </h3>

                {/* Owner */}
                <p className="text-sm text-gray-600 mb-3">
                    By {project.owner || "Anonymous"}
                </p>

                {/* Progress Bar */}
                <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: colors.primary }}>
                            {progress.toFixed(0)}% funded
                        </span>
                        <span>
                            ${parseFloat(project.total_target || 0).toLocaleString()} goal
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-2 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1 }}
                        ></motion.div>
                    </div>
                </div>

                {/* Days remaining */}
                {project.end_time && (
                    <p className="text-xs text-gray-500 mb-3">
                        {Math.ceil((new Date(project.end_time) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                    </p>
                )}

                {/* Donate Button */}
                <motion.button
                    onClick={() => handleDonateNow(project.id)}
                    className="w-full py-2 rounded-md text-white font-medium"
                    style={{ backgroundColor: colors.primary }}
                    whileHover={{
                        backgroundColor: colors.secondary,
                        scale: 1.02
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    Donate Now
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProjectCard;