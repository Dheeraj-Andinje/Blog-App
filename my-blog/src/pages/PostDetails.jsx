import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthCntx } from "../context/AuthCntx";
import image from "/public/vite.svg";
import { FaCopy, FaFacebookF, FaLinkedinIn, FaShare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X (Twitter) icon


const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthCntx);
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      alert("Post deleted successfully");
      navigate("/posts");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id, user.token]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };
  

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-[1400px] m-auto h-[94vh] overflow-y-auto hide-scrollbar flex justify-center ">
      <div className="max-w-5xl w-full bg-white rounded shadow">
        {post.image ? (
          <img
            src={post.image || image}
            alt="cover"
            className="w-full h-64 object-cover rounded-t"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t">
            No Image
          </div>
        )}

        <div className="px-6 py-4">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-gray-500">
            By {post.author?.username} —{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="text-gray-800 leading-relaxed my-6 whitespace-pre-line md:text-xl">
            {post.content}
          </p>

          {post.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

{/* Social Share Buttons */}
<div className="flex flex-wrap gap-4 mt-6 items-center">
  <span className="font-semibold"><FaShare/></span>

  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-white bg-black px-3 py-2 rounded hover:bg-gray-900"
  >
    <FaXTwitter />
    
  </a>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-white bg-blue-700 px-3 py-2 rounded hover:bg-blue-800"
  >
    <FaFacebookF />
    
  </a>

  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700"
  >
    <FaLinkedinIn />
    
  </a>

  <button
  onClick={handleCopyLink}
  className="flex items-center gap-2 text-white bg-gray-700 px-3 py-2 rounded hover:bg-gray-800"
>
  <FaCopy />
  
</button>
{copied ? "Copied!" : ""}



</div>




          {user?.user?.isAdmin && (
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => navigate(`/edit/${id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
