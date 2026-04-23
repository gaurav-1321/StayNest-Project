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
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold text-gray-900">
          Share your experience
        </h2>
        <p className="text-sm font-semibold text-gray-600">
          Tell others about your stay...
        </p>
      </div>

      <div className="p-5 space-y-5">

        {/* TEXT AREA */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write about your experience..."
          className="w-full border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-rose-500 resize-none transition text-slate-500 font-semibold"
          rows={3}
        />

        {/* RATING */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-00">
            Rating
          </span>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((r) => (
              <Star
                key={r}
                size={20}
                onClick={() => setRating(r)}
                className={`cursor-pointer transition ${
                  r <= rating
                    ? "text-slate-400 fill-rose-500 scale-110 "
                    : "text-rose-500 "
                }`}
              />
            ))}
          </div>
        </div>

        {/* UPLOAD AREA */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-rose-400 transition">

          {images.length === 0 ? (
            <label className="flex flex-col items-center justify-center gap-2 cursor-pointer py-8 text-gray-500 hover:text-rose-500 transition">
              <ImagePlus size={32} />
              <span className="text-sm font-medium">
                Upload photos
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
                <div key={i} className="relative group">
                  <img
                    src={img}
                    alt="preview"
                    className="w-full h-20 object-cover rounded-lg"
                  />
                </div>
              ))}

              {/* ADD MORE */}
              <label className="w-full h-20 flex items-center justify-center border rounded-lg cursor-pointer text-gray-500
              font-semibold hover:text-rose-500 hover:border-rose-400 transition">
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
          className="w-full bg-rose-500 text-white py-3 rounded-xl font-medium hover:bg-rose-600 hover:scale-[1.02] active:scale-95 transition duration-200"
        >
          Post Experience
        </button>

      </div>
    </div>
  );
};

export default CreatePost;
