import { Heart } from "lucide-react";
import { useState } from "react";

const ExperienceCard = ({ post, onReadMore, isActive }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className={`bg-white rounded-3xl shadow-md overflow-hidden transition duration-300 
      ${isActive ? "ring-2 ring-rose-500 scale-[1.01]" : "hover:shadow-xl"}`}
    >
      {/* IMAGES */}
      <div className="relative">
        <img
          src={post.images?.[0] || "/hotel.jpg"}
          alt=""
          className="w-full object-cover max-h-[400px]"
        />

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          <Heart
            size={18}
            className={liked ? "text-red-500 fill-red-500" : "text-gray-600"}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        <div className="flex justify-between">
          <h3 className="font-semibold text-lg">
            {post.name}
          </h3>
          <span className="text-sm text-gray-400">{post.time}</span>
        </div>

        <p className="text-gray-500 text-sm">
          {post.text.length > 120
            ? post.text.slice(0, 120) + "..."
            : post.text}
        </p>

        {/* IMAGES PREVIEW */}
        <div className="flex gap-2 overflow-hidden">
          {post.images?.slice(0, 2).map((img, i) => (
            <img
              key={i}
              alt=""
              src={img}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={onReadMore}
          className="text-rose-500 text-sm font-semibold hover:underline"
        >
          {isActive ? "Close ←" : "Read More →"}
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
