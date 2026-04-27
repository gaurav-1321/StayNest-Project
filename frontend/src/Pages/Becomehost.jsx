import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Becomehost = () => {
  const navigate = useNavigate();

  //  STATE
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    guests: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  //  AUTH CHECK (fixed)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  //  HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase().includes("name")
        ? "name"
        : e.target.placeholder.toLowerCase().includes("location")
        ? "location"
        : e.target.placeholder.toLowerCase().includes("price")
        ? "price"
        : e.target.placeholder.toLowerCase().includes("guest")
        ? "guests"
        : "description"]: e.target.value,
    });
  };

  //  IMAGE UPLOAD
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  //  CLEANUP 
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [images]);

  //  SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      images,
    };

    console.log("Submitted Data:", data);

    //  send to backend here

    alert("Listing submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">

        {/* HEADING */}
        <h1 className="text-3xl font-bold mb-2">
          Become a Host on StayNest
        </h1>
        <p className="text-gray-500 mb-6">
          Start earning by sharing your space with travelers
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* PROPERTY NAME */}
          <input
            type="text"
            placeholder="Property Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          {/* LOCATION */}
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price per night (₹)"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          {/* GUESTS */}
          <input
            type="number"
            placeholder="Max Guests"
            value={formData.guests}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          {/* IMAGE UPLOAD */}
          <div className="col-span-1 md:col-span-2">
            <p className="mb-2 font-semibold text-gray-700">Property Photos</p>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50 hover:border-rose-400 transition">

              {images.length === 0 ? (
                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer py-8 text-gray-500 hover:text-rose-500 transition">
                  <span className="text-2xl">📷</span>
                  <span className="text-sm font-medium">Upload property images</span>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative group aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <img
                        src={img}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />

                      {/* DELETE */}
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => prev.filter((_, index) => index !== i))
                        }
                        className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* ADD MORE */}
                  <label className="aspect-square flex items-center justify-center border rounded-lg cursor-pointer text-gray-500 font-semibold hover:text-rose-500 hover:border-rose-400 transition">
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
          </div>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Describe your property..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="border p-3 rounded-lg col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default Becomehost;
