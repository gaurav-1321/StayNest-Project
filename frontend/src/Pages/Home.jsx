import { useEffect, useState } from "react";
import Card1 from "../components/Card1";
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Header setSearchData={setSearchData} />

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">
            Stays in {searchData || "India"}
          </h2>
          
        </div>
      </div>
      <Card1 searchData={searchData}/>

      <Footer />
    </>
  );
};

export default Home;
