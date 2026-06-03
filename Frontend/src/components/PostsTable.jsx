import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import "../styles/PostsTable.css";

const PostsTable = ({ posts, loading, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handleDocClick = (e) => {
      if (!openMenu) return;
      const el = document.querySelector(`[data-menu-id="${openMenu}"]`);
      if (el && !el.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [openMenu]);

  if (loading) {
    return (
      <div className="loader">
        Loading Posts...
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts?.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>

              <td>{post.title}</td>

              <td>{post.authorName}</td>

              <td>{post.category}</td>

              <td>
                <span className={`status ${post.status.toLowerCase()}`}>
                  {post.status}
                </span>
              </td>

              <td>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>

              <td>
                <div className="action-menu-container" data-menu-id={post._id}>
                  <button
                    className="menu-btn"
                    onClick={() => setOpenMenu(openMenu === post._id ? null : post._id)}
                  >
                    <FiMoreVertical />
                  </button>

                  {openMenu === post._id && (
                    <div className="dropdown-menu">
                      <Link to={`/posts/${post._id}`}>View</Link>

                      <Link to={`/posts/edit/${post._id}`}>Edit</Link>

                      <button
                        onClick={() => {
                          onDelete(post._id);
                          setOpenMenu(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
