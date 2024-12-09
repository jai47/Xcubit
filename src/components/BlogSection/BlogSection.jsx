// components/BlogSection.jsx
import BlogCard from "../BlogCard/BlogCard";

const blogs = [
  { title: "Blog 1", description: "Description for Blog 1", image: "/blog1.jpg" },
  { title: "Blog 2", description: "Description for Blog 2", image: "/blog2.jpg" },
  { title: "Blog 2", description: "Description for Blog 2", image: "/blog2.jpg" },
  { title: "Blog 2", description: "Description for Blog 2", image: "/blog2.jpg" },
  { title: "Blog 2", description: "Description for Blog 2", image: "/blog2.jpg" },
  { title: "Blog 2", description: "Description for Blog 2", image: "/blog2.jpg" },

  
  // Add more blogs here
];

const BlogSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <section className="py-12 px-4 w-full max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Blog</h2>

          <p className="text-1xl  ">We've had the pleasure of working with industry-defining brands. </p>
          <p className="text-1xl  mb-8 ">These are just some of them.</p>
        
          
        </div>

        {/* Blog Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <button className="text-gray-800 border border-gray-500 py-2 px-8 mt-3 rounded-full hover:bg-gray-600 hover:border-gray-700">
            Load More
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
