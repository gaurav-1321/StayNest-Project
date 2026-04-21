import { useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Home = () => {
  const [searchData, setSearchData] = useState("");

  return (
    <>
      <Navbar />
      <Header setSearchData={setSearchData} />

      {searchData ? (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <Card
            title={`Hotels in ${searchData}`}
            searchData={searchData}
          />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">

          {/* Popular destinations */}
          <Card
            title="Popular Destinations"
            searchData="Goa"
          />

          {/* Trending stays */}
          <Card
            title="Trending Stays"
            searchData="Delhi"
          />

          {/* Luxury stays */}
          <Card
            title="Luxury Stays"
            searchData="Udaipur"
          />

          {/* Budget stays */}
          <Card
            title="Budget Stays"
            searchData="Varanasi"
          />

        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
