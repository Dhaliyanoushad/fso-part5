import React from 'react';
import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, fetchBlogs }) => {
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [error, setError] = useState(null);

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
      console.error('Error liking the blog:', error);
    }
  };
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        fetchBlogs(); // Refresh the blog list after deletion
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to delete blog');
        console.error('Error deleting the blog:', error);
      }
    }
  };
  return (
    <>
      <div className="blog">
        {error && <div className="error">{error}</div>}
        {view ? (
          <>
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-author">{blog.author}</p>
            <p className="blog-url">{blog.url}</p>
            <p className="blog-likes" data-testid="likes">
              {likes} likes
            </p>
            <button onClick={handleLike} name="like">
              like
            </button>
            <p>added by {blog.user.name}</p>
          </>
        ) : (
          <>
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-author">{blog.author}</p>
          </>
        )}
      </div>
      <button onClick={toggleView} name="view">
        {view ? 'hide' : 'view'}
      </button>
      <br />

      {JSON.parse(localStorage.getItem('loggedBlogappUser')).username ===
      blog.user.username ? (
        <button onClick={handleDelete} data-testid="delete-button">
          Remove
        </button>
      ) : (
        ''
      )}
      <hr />
      <br />
      <style jsx>{`
        div {
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px 0;
        }
        h2 {
          margin: 0;
        }
        p {
          margin: 5px 0;
        }
      `}</style>
      <style jsx>{`
        button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
      <style jsx>{`
        hr {
          border: 0;
          height: 1px;
          background-color: #ccc;
          margin: 20px 0;
        }
      `}</style>
      <style jsx>{`
        br {
          margin: 10px 0;
        }
      `}</style>
    </>
  );
};

export default Blog;
