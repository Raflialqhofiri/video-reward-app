"use client";
import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPosts([
      { id: Date.now(), type: file.type, url },
      ...posts,
    ]);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="p-4 text-center text-xl font-bold border-b border-gray-800">
        RewardHub
      </div>

      {/* Upload Button */}
      <div className="p-4">
        <label className="bg-yellow-500 text-black px-4 py-2 rounded-lg cursor-pointer">
          ➕ Upload Post
          <input
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={handleUpload}
          />
        </label>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-6 p-4">
        {posts.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No posts yet. Be the first to upload 🚀
          </p>
        )}

        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 rounded-xl overflow-hidden">
            {post.type.startsWith("image") ? (
              <img src={post.url} className="w-full" />
            ) : (
              <video
                src={post.url}
                controls
                className="w-full"
              />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}