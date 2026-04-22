import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const ExperienceCard = ({ post }) => {
  const [index, setIndex] = useState(0);
  const images = post.images || [];

  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800";

  const nextImg = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-[240px] flex-shrink-0 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">

      {/* IMAGE */}
      <div className="relative w-full h-40">

        <img
          src={images[index] || fallback}
          alt="experience"
          className="w-full h-full object-cover"
        />

        {/* LEFT */}
        {images.length > 1 && (
          <button
            onClick={prevImg}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* RIGHT */}
        {images.length > 1 && (
          <button
            onClick={nextImg}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* COUNTER */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
            {index + 1}/{images.length}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3">

        <div className="flex justify-between">
          <h3 className="font-semibold text-sm">{post.name}</h3>
          <span className="text-xs text-gray-400">{post.time}</span>
        </div>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {post.text}
        </p>

        {/* STARS */}
        <div className="flex gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < post.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExperienceCard;
