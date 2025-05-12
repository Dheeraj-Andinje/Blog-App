import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCntx } from "./context/AuthCntx";
import Navbar from "./components/Navbar"
import CreatePost from "./components/CreatePost"; // make sure it's capital C
import PostsList from "./components/PostsList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPost from "./components/EditPost";

const App = () => {
  const { user } = useContext(AuthCntx);
 
  
  return (
    <Router>
      <div className="flex-col justify-center">
        <Navbar/>
        <div className="flex-1 p-6 justify-center">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={user?.user ? <PostsList /> : <Navigate to="/login" />} />
            <Route path="/create" element={user?.user?.isAdmin ? <CreatePost /> : <Navigate to="/posts" />} />
            <Route path="/login" element={!user?.user ? <Login /> : <Navigate to="/posts" />} />
            <Route path="/register" element={!user?.user ? <Register /> : <Navigate to="/posts" />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/edit/:id" element={user?.user?.isAdmin ? <EditPost /> : <Navigate to="/posts" />} />
          </Routes>
        </div>
      </div>
  
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
};

export default App;
