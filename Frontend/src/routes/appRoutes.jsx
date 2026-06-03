import { Routes, Route } from "react-router-dom";

import PostList from "../pages/PostList";
import AddEditPost from "../pages/AddEditPost";
import ViewPost from "../pages/ViewPost";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Listing Page */}
      <Route path="/" element={<PostList />} />

      {/* Add Post */}
      <Route path="/posts/new" element={<AddEditPost />} />

      {/* Edit Post */}
      <Route path="/posts/edit/:id" element={<AddEditPost />} />

      {/* View Post */}
      <Route path="/posts/:id" element={<ViewPost />} />
    </Routes>
  );
};

export default AppRoutes;