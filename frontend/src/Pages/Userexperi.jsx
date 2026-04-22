import { useState } from "react";
import CreatePost from "../components/Createpost";
import ExperienceCard from "../components/Experiencecard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import postsData from "../Userdata";

const Userexperi = () => {
  const [posts, setPosts] = useState(postsData);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <>
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="bg-gray-50 min-h-screen">

        {/* MAIN CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              User Experiences
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Discover real travel stories from users
            </p>
          </div>

          {/* CREATE POST SECTION */}
          <div className="mb-8">
            <CreatePost onAddPost={addPost} />
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* FEED TITLE */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Latest Posts
            </h2>
            <span className="text-xs text-gray-400">
              {posts.length} posts
            </span>
          </div>

          {/* GRID FEED */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

            {posts.map((post, index) => (
              <ExperienceCard key={index} post={post} />
            ))}

          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Userexperi;
