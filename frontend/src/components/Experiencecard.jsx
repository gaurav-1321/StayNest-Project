import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const ExperienceCard = ({ post }) => {
  const [index, setIndex] = useState(0);

  const images = Array.isArray(post?.images) ? post.images : [];

  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800";

  useEffect(() => {
    if (index >= images.length && images.length > 0) {
      setIndex(0);
    }
  }, [images, index]);

  if (!post) return null;

  const nextImg = () => {
    if (images.length === 0) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = () => {
    if (images.length === 0) return;
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const currentImage =
    images.length > 0
      ? images[index % images.length]
      : fallback;

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100">

      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        <img
          src={currentImage}
          alt="experience"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* ARROWS */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* COUNTER */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
            {index + 1}/{images.length}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">

        {/* USER + TIME */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base text-gray-900">
            {post?.name || "User"}
          </h3>
          <span className="text-xs text-gray-400">
            {post?.time || ""}
          </span>
        </div>

        {/* TEXT */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {post?.text || ""}
        </p>

        {/* RATING */}
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < (post?.rating || 0)
                  ? "text-rose-500 fill-rose-500"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 mt-1">
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
