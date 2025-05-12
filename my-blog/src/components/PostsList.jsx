import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthCntx } from "../context/AuthCntx";
import { Link } from "react-router-dom";

const PostsList = () => {
  const { user } = useContext(AuthCntx);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [user.token]);

  return (

    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md border p-4 transform transition duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <Link to={`/posts/${post._id}`}>
            {post.image && (
              <div className="overflow-hidden rounded-md mb-4">
                <img
                  src={post.image}
                  alt="Post cover"
                  className="w-full h-48 object-cover transition duration-300 hover:brightness-90"
                />
              </div>
            )}
            <h2 className="text-xl font-bold mb-2 transition-colors duration-300 hover:text-blue-600">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
            <p className="text-sm text-gray-500 mb-2">
              Author: {post.author?.username || "Unknown"}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            </Link>
          </div>
          
          
        ))}
      </div>
    </div>
  );
};

export default PostsList;
