import { useState } from "react";
import CreatePost from "../components/Createpost";
import ExperienceCard from "../components/Experiencecard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import postsData from "../Userdata";

const Userexperi = () => {
  const [posts, setPosts] = useState(postsData || []);

  const addPost = (newPost) => {
    if (!newPost || typeof newPost !== "object") return;
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <>
      <Navbar />

      {/* 🌄 BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-img.png')" }}
      ></div>

      {/* 🌫️ OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-white/40 backdrop-blur-md"></div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            User Experiences
          </h1>
          <p className="text-gray-600  font-semibold mt-2">
            Discover real travel stories from users
          </p>
        </div>

        {/* CREATE POST */}
        <div className="mb-10">
          <CreatePost onAddPost={addPost} />
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* TITLE */}
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-2xl font-bold">
            Latest Posts
          </h2>
        </div>

        {/* EMPTY STATE */}
        {posts.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-xl font-semibold">
              No posts yet...
            </p>
            <p className="text-gray-500 mt-2">
              Be the first to share your experience
            </p>
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {posts
              .filter((post) => post)
              .map((post, index) => (
                <ExperienceCard key={index} post={post} />
              ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
};

export default Userexperi;
