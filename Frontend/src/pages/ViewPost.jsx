import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPostById } from "../api/postApi";

import "../styles/ViewPost.css";

const ViewPost = () => {
  const { id } = useParams();

  const [post, setPost] =
    useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res =
        await getPostById(id);

      setPost(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="view-page">

      <div className="view-card">

        <img
          src={post.thumbnailUrl}
          alt={post.title}
        />

        <h1>{post.title}</h1>

        <span className="status">
          {post.status}
        </span>

        <p>
          <strong>Author:</strong>{" "}
          {post.authorName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {post.authorEmail}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {post.category}
        </p>

        <p>
          <strong>Tags:</strong>{" "}
          {post.tags.join(", ")}
        </p>

        <h3>Short Description</h3>

        <p>{post.shortDescription}</p>

        <h3>Content</h3>

        <p>{post.content}</p>
      </div>

    </div>
  );
};

export default ViewPost;