import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Home = () => {
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Loader (better UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 🔄 Show loader first
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🌄 Hero Section */}
      <Header setSearchData={setSearchData} />

      {/* 🤍 MAIN CONTENT (Clean like Airbnb) */}
      <div className="bg-white">

        {searchData ? (
          /* 🔍 SEARCH RESULT */
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-6">
              Stays in {searchData}
            </h2>

            <Card searchData={searchData} />
          </div>
        ) : (
          /* 🏠 DEFAULT SECTIONS */
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

            <Card title="Popular Destinations" searchData="Goa" />

            <Card title="Trending Stays" searchData="Delhi" />

            <Card title="Luxury Stays" searchData="Udaipur" />

            <Card title="Budget Friendly" searchData="Varanasi" />

          </div>
        )}

      </div>

      {/* 🔻 Footer */}
      <Footer />
    </>
  );
};

export default Home;
