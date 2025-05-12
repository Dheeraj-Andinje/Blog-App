import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthCntx } from "../context/AuthCntx";

const Navbar = () => {
  const { user, logout } = useContext(AuthCntx);
 

  return (
    <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left section: App name and nav links */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold">BlogApp</h1>
        <nav className="flex items-center gap-6">
          <Link to="/posts" className="hover:text-blue-500">Posts</Link>
          {user?.user?.isAdmin && (
            <Link to="/create" className="hover:text-blue-500">Create Post</Link>
          )}
        </nav>
      </div>

      {/* Right section: Auth buttons/info */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">
              Logged in as: {user?.user?.username || "Guest"}
            </span>
            <button onClick={logout} className="border text-red-400 px-3 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-success">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
