import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import PostsTable from "../components/PostsTable";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import { getPosts, deletePost, searchPosts, exportCSV } from "../api/postApi";
import "../styles/PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const PAGE_SIZE = 5;

  // Check if any filter is active
  const hasFilters = searchTerm.trim() !== "" || category !== "" || status !== "";

  // Fetch posts based on current filters and page
  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (hasFilters) {
        response = await searchPosts(searchTerm, category, status);
        const fetchedPosts = response.data.posts || [];
        setPosts(fetchedPosts);
        setTotalPosts(fetchedPosts.length);
        setTotalPages(1);          
        setCurrentPage(1);
      } else {
        response = await getPosts(page, PAGE_SIZE);
        const data = response.data;
        setPosts(data.data || []);
        setTotalPages(data.pagination.totalPages);
        setTotalPosts(data.pagination.totalPosts || 0);
        setCurrentPage(page);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchPosts(1);
  }, [searchTerm, category, status]);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        fetchPosts(currentPage); // Refresh after deletion
      } catch (err) {
        alert("Failed to delete post");
      }
    }
  };

  // Handle pagination 
  const handlePageChange = (newPage) => {
    if (!hasFilters) {
      fetchPosts(newPage);
    }
  };

  // Handle CSV export with current filters
  const handleExportCSV = () => {
    exportCSV(searchTerm, category, status);
  };

  return (
    <div className="post-list-page">
      <div className="header-card">
        <div>
          <h1>Blog Post Manager</h1>
          <p>Manage and organize your blog posts</p>
        </div>

        <div className="header-buttons">
          <button className="export-btn" onClick={handleExportCSV}>
            <FiDownload className="button-icon" />
            Export CSV
          </button>

          <a className="add-btn" href="/posts/new">
            + Add Post
          </a>
        </div>
      </div>

      <SearchFilter
        search={searchTerm}
        setSearch={setSearchTerm}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
      />
      
      {error && <div className="error-message">{error}</div>}
      
      <PostsTable
        posts={posts}
        loading={loading}
        onDelete={handleDelete}
      />
      
      <div className="table-footer">
        <div className="records-info">
          {hasFilters ? (
            `Showing ${posts.length} of ${totalPosts} filtered records`
          ) : (
            `Showing ${posts.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0} to ${Math.min(currentPage * PAGE_SIZE, totalPosts)} of ${totalPosts} records`
          )}
        </div>

        {!hasFilters && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default PostList;