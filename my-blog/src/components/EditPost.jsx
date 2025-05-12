import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthCntx } from "../context/AuthCntx";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthCntx);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    categories: [],
    tags: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        const { title, content, image, categories, tags } = res.data;
        setFormData({
          title,
          content,
          image: image || "",
          categories: categories || [],
          tags: tags || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id, user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categories" || name === "tags") {
      setFormData({ ...formData, [name]: value.split(",").map((v) => v.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { ...formData },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            rows="6"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Categories (comma-separated)</label>
          <input
            name="categories"
            value={formData.categories.join(", ")}
            onChange={handleChange}
            placeholder="e.g. Tech, News"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">Tags (comma-separated)</label>
          <input
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleChange}
            placeholder="e.g. react, mongodb"
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
