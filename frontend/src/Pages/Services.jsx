import { Search } from "lucide-react";
import { useState } from "react";
import servicesData from "../ServicesData";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Servicecard from "../components/Servicecard";

const Services = () => {
  const [search, setSearch] = useState("");

  // ✅ Filter
  const filteredData = servicesData.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase()) ||
    service.category.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Group
  const groupedServices = filteredData.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      {/* 🌄 BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-img.png')" }}
      ></div>

      {/* 🌫️ OVERLAY*/}
      <div className="fixed inset-0 -z-10 bg-white/40 backdrop-blur-md"></div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Explore Services
          </h1>
          <p className="text-gray-700 font-sem mt-2 text-lg">
            Find yoga trainers, chefs, spa & more
          </p>
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center bg-white/90 backdrop-blur-md shadow-md rounded-full px-4 py-5 w-full max-w-md border hover:shadow-lg transition">

            <Search className="text-gray-400" size={35} />

            <input
              type="text"
              placeholder="Search yoga, chef, spa..."
              className="ml-4 w-full outline-none text-sm bg-transparent text-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* EMPTY STATE */}
        {filteredData.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-xl font-semibold">
              No services found
            </p>
            <p className="text-gray-500 mt-2">
              Try searching for yoga, chef, spa, etc.
            </p>
          </div>
        ) : (
          <div className="space-y-12">

            {/* SECTION LIST */}
            {Object.keys(groupedServices).map((category) => (
              <div key={category}>

                {/* CATEGORY TITLE */}
                <div className="flex justify-between items-center mb-4 px-1">
                  <h2 className="text-2xl font-bold capitalize">
                    {category}
                  </h2>

                  <button className="text-sm text-rose-500 hover:underline">
                    View all
                  </button>
                </div>

                {/* HORIZONTAL SCROLL */}
                <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">

                  {groupedServices[category].map((service) => (
                    <Servicecard
                      key={service.id}
                      data={service}
                      search={search}
                    />
                  ))}

                </div>

              </div>
            ))}

          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Services;
