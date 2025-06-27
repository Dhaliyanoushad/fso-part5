import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleView = () => {
    setView(!view);
  };
  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: likes + 1 };
      // console.log("Blog liked successfully:", updatedBlog.id, blog.id);
      await blogService.update(updatedBlog);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };
  return (
    <>
      <div>
        {view ? (
          <>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{likes} likes</p>
            <button onClick={handleLike}>like</button>
            <p>added by {blog.user.name}</p>
          </>
        ) : (
          <>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
          </>
        )}
      </div>
      <button onClick={toggleView}>{view ? "hide" : "view"}</button>
    </>
  );
};

export default Blog;
