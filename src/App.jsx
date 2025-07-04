import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';
import NewBlog from './components/NewBlog';
import PropTypes from 'prop-types';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    const sorted = blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(sorted);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setErrorMessage('Username and password must not be empty');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      fetchBlogs();
      setUser(user);

      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage(exception.message || 'Login failed');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  useEffect(() => {
    console.log('Enthaada Code Veno Ninekk?');
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      fetchBlogs();
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              placeholder="Username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              placeholder="Password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Here are the blogs:</p>
      <h2>Blogs</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button onClick={handleLogout} name="Logout">
        Logout
      </button>
      <Togglable buttonLabel="New Blog">
        <NewBlog
          fetchBlogs={fetchBlogs}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setBlogs={setBlogs}
        />
      </Togglable>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <ol>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog key={blog.id} blog={blog} fetchBlogs={fetchBlogs} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;
