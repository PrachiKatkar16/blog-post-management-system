import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Blog Post Manager</h2>

      <div className="nav-links">
        <Link to="/">Posts</Link>
        <Link to="/posts/new">Add Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;