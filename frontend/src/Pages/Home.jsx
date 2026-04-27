import { useEffect, useState } from "react";
import Card1 from "../components/Card1";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Home = () => {
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(true);
  const [hostListings, setHostListings] = useState([]);

  // loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // FETCH FROM POSTGRES
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("https://localhost:5000/api/listings");
        const data = await res.json();

        setHostListings(data);
        console.log("DB DATA:", data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchListings();
     console.log(fetchListings());
  }, []);



  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Header setSearchData={setSearchData} />

      {/* TITLE */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-bold">
          Stays in {searchData || "India"}
        </h2>
      </div>
          {/* cards */}
      <Card1 searchData={searchData || "India"} />
      {/* HOSTED LISTINGS */}
      {hostListings.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <h2 className="text-xl font-bold mb-4">
            Your Hosted Properties
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {hostListings.map((item) => {
             

              return (
                <div
                  key={item.id}
                  className="border rounded-xl shadow hover:shadow-lg transition bg-white"
                >

                  <div className="p-3">
                    <h3 className="font-bold">{item.name}</h3>

                    <p className="text-gray-500 text-sm">
                      {item.location}
                    </p>

                    <div className="flex justify-between mt-2">
                      <p className="text-rose-500 font-semibold">
                        ₹{item.price}
                      </p>
                      <p className="text-sm">
                        {item.guests} guests
                      </p>
                    </div>

                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      )}

      

      <Footer />
    </>
  );
};

export default Home;
