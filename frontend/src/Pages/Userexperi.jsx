import { useState } from "react";
import CreatePost from "../components/Createpost";
import ExperienceCard from "../components/Experiencecard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import postsData from "../Userdata";

const Userexperi = () => {
  const [posts, setPosts] = useState(postsData || []);
  const [selectedPost, setSelectedPost] = useState(null);

  const addPost = (newPost) => {
    if (!newPost || typeof newPost !== "object") return;
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const closeDetail = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <Navbar />

      {/* HEADER */}
      <div
        className="w-full h-[300px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/bg-img.png')" }}
      >
        <div className="bg-black/40 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">User Experiences</h1>
          <p className="mt-3 text-lg text-gray-200">
            Real stories from travelers ✨
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">

          <CreatePost onAddPost={addPost} />

          <h2 className="text-2xl font-bold mb-8">Latest Stories</h2>

          <div className="flex gap-6">

            {/* LEFT SIDE - SELECTED POST */}
            {selectedPost && (
              <div className="w-1/2 space-y-4">
                <ExperienceCard
                  post={selectedPost}
                  isActive={true}
                  onReadMore={closeDetail}
                />

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-lg">Full Story</h3>
                  <p className="text-gray-600 mt-2">
                    {selectedPost.text}
                  </p>
                </div>
              </div>
            )}

            {/* RIGHT SIDE - ALL POSTS */}
            <div className={selectedPost ? "w-1/2 space-y-6" : "w-full columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"}>
              {posts
                .map((post, index) => (
                  <div key={index} className="break-inside-avoid">
                    <ExperienceCard
                      post={post}
                      onReadMore={() => handleReadMore(post)}
                      isActive={selectedPost === post}
                    />
                  </div>
                ))}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Userexperi;
