import { useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
const Home = () => {
  const [searchData,setSearchData]=useState("");
  return (
    <>
        <Navbar />
      <Header setSearchData={setSearchData}/>
       <Card searchData={searchData}/>
    </>
  )
}

export default Home;
