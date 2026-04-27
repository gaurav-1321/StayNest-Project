import { Search } from "lucide-react";
import { useState } from "react";
import servicesData from "../ServicesData";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Servicecard from "../components/Servicecard";

const Services = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Categories
  const categories = ["All", ...new Set(servicesData.map(s => s.category))];

  // Filter
  const filteredData = servicesData.filter((service) => {
    const matchSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      activeCategory === "All" || service.category === activeCategory;

    return matchSearch && matchCategory;
  });

  return (
    <>
      <Navbar />

  
      <div
        className="h-[220px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/bg-img.png')" }}
      >
        <div className="bg-black/40 w-full h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">Explore Services</h1>
          <p className="mt-2 text-lg">Find chefs, spa, yoga & more</p>
        </div>
      </div>

    
      <div className="bg-gray-50 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6">

          {/* 🔍 SEARCH */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center bg-white shadow-md rounded-full px-5 py-3 w-full max-w-md border hover:shadow-lg transition">

              <Search className="text-gray-400" size={20} />

              <input
                type="text"
                placeholder="Search services..."
                className="ml-3 w-full outline-none bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap justify-center mb-10">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition
                  ${
                    activeCategory === cat
                      ? "bg-rose-500 text-white shadow"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

    
          {filteredData.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-xl font-semibold">No services found</p>
              <p className="text-gray-500 mt-2">Try different search</p>
            </div>
          ) : (
          
            <div className="bg-white rounded-2xl shadow-sm p-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filteredData.map((service) => (
                  <Servicecard
                    key={service.id}
                    data={service}
                    search={search}
                  />
                ))}

              </div>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Services;
