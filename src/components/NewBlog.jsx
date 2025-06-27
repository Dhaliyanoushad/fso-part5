import React from 'react';
import { useState } from 'react';
import blogService from '../services/blogs';

const NewBlog = ({
  fetchBlogs,
  setErrorMessage,
  setSuccessMessage,
  setBlogs,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      const createdBlog = await blogService.create(newBlog);
      fetchBlogs();
      setSuccessMessage(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.error('Error creating blog:', exception);
      setErrorMessage('Failed to create blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default NewBlog;
