// components/BlogCard.jsx
const BlogCard = ({ title, description, image, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      {/* Blog Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      {/* Blog Content */}
      <div className="p-4">
        {/* Blog Title and Date */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        </div>
        {/* Blog Description */}
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
