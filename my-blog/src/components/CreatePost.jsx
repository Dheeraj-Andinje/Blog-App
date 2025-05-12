import { useState, useContext } from "react";
import axios from "axios";
import { AuthCntx } from "../context/AuthCntx";

const CreatePost = () => {
  const { user } = useContext(AuthCntx);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        title,
        content,
        author:user.user.id,
        image,
        categories: categories.split(",").map(cat => cat.trim()),
        tags: tags.split(",").map(tag => tag.trim()),
      });
      
      await axios.post(
        "http://localhost:5000/api/posts/create",
        {
          title,
          content,
          author:user.user.id,
          image,
          categories: categories.split(",").map(cat => cat.trim()),
          tags: tags.split(",").map(tag => tag.trim()),
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
            user_id:user.user.id
          },
        }
      );
      alert("Post created successfully!");
      setTitle("");
      setContent("");
      setCategories("");
      setTags("");
      setImage("")
    } catch (err) {
      console.error(err);
      alert("Failed to create post!");
    }
  };

  return (
    <div className="container-center">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Categories (comma separated)"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Image (link)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button className="btn-primary" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;





  // const posts = [
 
  //   {
  //     title: "Why You Should Learn Node.js as a JavaScript Developer",
  //     content: "Node.js opens a whole new world for frontend developers. Instead of just building client-side apps, you can now create full-stack applications using JavaScript end-to-end. Node’s non-blocking I/O model makes it perfect for handling multiple requests at scale.\n\nStart by understanding the event loop and asynchronous programming. Promises, async/await, and error handling are crucial to writing clean Node code. Then explore Express.js, the most popular web framework for Node. With it, you can define routes, handle requests, and serve dynamic or static content.\n\nLearn how to structure your server, separate concerns into routers, controllers, and services. Use tools like Postman to test your endpoints, and don’t forget to secure your API with middleware like JWT, rate limiting, and validation.\n\nNode pairs well with MongoDB and Mongoose. Together, they make up the ‘M’ in the MERN stack. Practice creating RESTful APIs, managing schemas, and building CRUD operations. Once you're comfortable, dive into file uploads, cloud storage, and third-party APIs.\n\nMastering Node gives you independence—it’s the key to building complete apps on your own.",
  //     author: '6655e6bcbcabc21d7c4d113a',
  //     image: "https://images.unsplash.com/photo-1581093588401-2fe1b6c60f83",
  //     categories: ["Backend", "Node.js"],
  //     tags: ["node", "express", "api", "backend", "javascript"]
  //   },
  //   {
  //     title: "10 Productivity Tips for Developers Working Remotely",
  //     content: "Remote work offers flexibility and comfort, but staying productive takes discipline. Here are 10 tips to help developers thrive remotely:\n\n1. Set a routine – Start and end your workday at consistent times.\n2. Design a proper workspace – Invest in a good chair, monitor, and desk.\n3. Use time blocking – Allocate chunks of time for focused work.\n4. Avoid multitasking – Focus on one task at a time for better quality.\n5. Use task managers – Tools like Notion, Trello, or Todoist can keep you organized.\n6. Take breaks – Use the Pomodoro technique or simply step away every hour.\n7. Communicate clearly – Overcommunicate in remote environments to avoid confusion.\n8. Automate routine tasks – Use scripts, aliases, and shortcuts to save time.\n9. Keep learning – Allocate time weekly to read docs, take courses, or watch tech talks.\n10. Reflect weekly – Look back at what worked and what didn’t, and adjust.\n\nBeing a productive remote developer isn’t about working more hours—it’s about working smarter. Set boundaries, respect your time, and maintain a balance that works for you.",
  //     author: '6655e6bcbcabc21d7c4d113a',
  //     image: "https://images.unsplash.com/photo-1580894908361-967195033215",
  //     categories: ["Productivity", "Lifestyle"],
  //     tags: ["remote", "productivity", "developer life", "focus"]
  //   }
  // ];

