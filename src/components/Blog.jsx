import React from "react";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const toggleView = () => {
    setView(!view);
  };
  return (
    <>
      <div>
        {view ? (
          <>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes} likes</p>
            <button>like</button>
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
