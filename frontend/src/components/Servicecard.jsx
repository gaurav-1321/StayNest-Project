const Servicecard = ({ data, search }) => {

  // 🔥 Highlight matching text (soft modern style)
  const highlightText = (text) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span
          key={i}
          className="bg-rose-100 text-rose-600 px-1 rounded"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">
      
      {/* Image */}
      <div className="relative">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-[170px] object-cover"
          loading="lazy"
        />

        {/* Rating badge */}
        <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium shadow">
          ⭐ {data.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        
        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight">
          {highlightText(data.name)}
        </h3>

        {/* Provider */}
        <p className="text-gray-500 text-sm truncate mt-1">
          {highlightText(data.provider)} • {data.location}
        </p>

        {/* Price */}
        <p className="mt-3 font-semibold text-rose-500">
          ₹{data.price}
        </p>

      </div>
    </div>
  );
};

export default Servicecard;
