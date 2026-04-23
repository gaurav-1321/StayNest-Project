import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Home = () => {
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

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

          <Card title="Popular Destinations" searchData="Goa" />
          <Card title="Trending Stays" searchData="Delhi" />
          <Card title="Luxury Stays" searchData="Udaipur" />
          <Card title="Budget Stays" searchData="Varanasi" />

        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
