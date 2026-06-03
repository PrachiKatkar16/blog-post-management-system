import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPost, getPostById, updatePost } from "../api/postApi";

import "../styles/AddEditPost.css";

const AddEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    authorEmail: "",
    category: "",
    tags: "",
    status: "",
    thumbnailUrl: "",
    shortDescription: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch post data for editing
  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const response = await getPostById(id);
          const post = response.data.data;
          setFormData({
            title: post.title,
            authorName: post.authorName,
            authorEmail: post.authorEmail,
            category: post.category,
            tags: post.tags?.join(", ") || "",
            status: post.status,
            thumbnailUrl: post.thumbnailUrl,
            shortDescription: post.shortDescription,
            content: post.content,
          });
        } catch (error) {
          console.error("Error fetching post:", error);
          alert("Failed to load post");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim()),
      };

      if (isEditMode) {
        // Update existing post
        await updatePost(id, postData);
        alert("Post updated successfully");
      } else {
        // Create new post
        await createPost(postData);
        alert("Post created successfully");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error saving post");
    }
  };

  return (
    <div className="form-page">

      <form
        className="post-form"
        onSubmit={handleSubmit}
      >
        <h2>{isEditMode ? "Edit Post" : "Create New Post"}</h2>

        {loading && <p>Loading post...</p>}

        <h3>Basic Information</h3>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="authorName"
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleChange}
        />

        <input
          name="authorEmail"
          placeholder="Email"
          value={formData.authorEmail}
          onChange={handleChange}
        />

        <h3>Classification</h3>

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="tags"
          placeholder="React, Hooks"
          value={formData.tags}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">
            Select Status
          </option>

          <option value="Published">
            Published
          </option>

          <option value="Draft">
            Draft
          </option>

          <option value="Archived">
            Archived
          </option>
        </select>

        <h3>Media</h3>

        <input
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={formData.thumbnailUrl}
          onChange={handleChange}
        />

        <h3>Content</h3>

        <textarea
          name="shortDescription"
          placeholder="Short Description"
          rows="4"
          value={formData.shortDescription}
          onChange={handleChange}
        />

        <textarea
          name="content"
          placeholder="Post Content"
          rows="10"
          value={formData.content}
          onChange={handleChange}
        />

        <button type="submit">
          {isEditMode ? "Update Post" : "Publish Post"}
        </button>
      </form>

    </div>
  );
};

export default AddEditPost;