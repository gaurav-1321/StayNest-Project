const Servicecard = ({ data, search }) => {

  // 🔥 Highlight matching text
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
    <div className="w-[250px] bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer">

      {/* 🔹 Image */}
      <div className="relative mb-3">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-[140px] object-cover rounded-xl"
          loading="lazy"
        />

        {/* ⭐ Rating */}
        <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-medium shadow">
          ⭐ {data.rating}
        </span>
      </div>

      {/* 🔹 Category Badge */}
      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
        {data.category}
      </span>

      {/* 🔹 Title */}
      <h3 className="font-semibold text-base mt-2 leading-snug">
        {highlightText(data.name)}
      </h3>

      {/* 🔹 Provider */}
      <p className="text-gray-500 text-sm truncate mt-1">
        {highlightText(data.provider)} • {data.location}
      </p>

      {/* 🔹 Price */}
      <p className="mt-2 font-semibold text-gray-900">
        ₹{data.price}{" "}
        <span className="text-gray-500 text-sm">/ service</span>
      </p>

    </div>
  );
};

export default Servicecard;
