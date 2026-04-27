import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Becomehost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    guests: "",
    description: "",
  });

  const [images, setImages] = useState([]);

  // AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // INPUT HANDLER
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE TO BASE64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64 = await Promise.all(files.map(toBase64));
    setImages(base64);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      images: JSON.stringify(images), 
    };
   console.log(payload);
    try {
      await axios.post(
        "http://localhost:5000/api/listings",
        payload
      );

      alert("Listing saved!");
      navigate("/");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Error saving listing");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-3xl">

          <h1 className="text-2xl font-bold mb-4">
            Become a Host
          </h1>

          <form onSubmit={handleSubmit} className="grid gap-4">

            <input
              name="name"
              placeholder="Property Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              name="price"
              type="number"
              placeholder="Price per night"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              name="guests"
              type="number"
              placeholder="Guests"
              value={formData.guests}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            {/* IMAGES */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="flex gap-2 flex-wrap">
              {images.map((img, i) => (
                <img
                  key={i}
                  alt=""
                  src={img}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
              rows="4"
            />

            <button className="bg-rose-500 text-white py-2 rounded">
              Submit Listing
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Becomehost;
