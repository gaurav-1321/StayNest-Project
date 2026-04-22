import { ImagePlus, Star } from "lucide-react";
import { useState } from "react";

const CreatePost = ({ onAddPost }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleSubmit = () => {
    if (!text) return;

    onAddPost({
      name: "You",
      text,
      rating,
      time: "just now",
      images,
    });

    setText("");
    setImages([]);
    setRating(5);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Share your experience
        </h2>
        <p className="text-xs text-gray-500">
          Tell others about your stay, trip or hotel experience
        </p>
      </div>

      <div className="p-5 space-y-4">

        {/* TEXT AREA */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something about your experience..."
          className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-black resize-none"
          rows={3}
        />

        {/* RATING */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Rating</span>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((r) => (
              <Star
                key={r}
                size={18}
                onClick={() => setRating(r)}
                className={`cursor-pointer transition ${
                  r <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* UPLOAD AREA */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">

          {images.length === 0 ? (
            <label className="flex flex-col items-center justify-center gap-2 cursor-pointer py-6 text-gray-500 hover:text-black transition">
              <ImagePlus size={30} />
              <span className="text-sm font-medium">
                Click to upload photos
              </span>
              <span className="text-xs text-gray-400">
                PNG, JPG, JPEG (multiple allowed)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-full h-20 object-cover rounded-lg"
                />
              ))}

              {/* ADD MORE */}
              <label className="w-full h-20 flex items-center justify-center border rounded-lg cursor-pointer text-gray-400 hover:text-black">
                +
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2.5 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Post Experience
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
