import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const ExperienceCard = ({ post = {} }) => {
  const [index, setIndex] = useState(0);
  const images = post?.images || [];

  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800";

  const nextImg = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImg = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100">

      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">

        <img
          src={images[index] || fallback}
          alt="experience"
          className="w-full h-full object-cover"
        />

        {/* arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
            {index + 1}/{images.length}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">

        {/* name + time */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base text-gray-900">
            {post?.name || "User"}
          </h3>
          <span className="text-xs text-gray-500">
            {post?.time || ""}
          </span>
        </div>

        {/* text (bigger + darker + readable) */}
        <p className="text-sm text-gray-700 leading-relaxed">
          {post?.text || ""}
        </p>

        {/* stars */}
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < (post?.rating || 0)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* posted by */}
        <p className="text-xs text-gray-500 mt-1">
          Posted by{" "}
          <span className="text-gray-700 font-medium">
            {post?.name || "User"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default ExperienceCard;
