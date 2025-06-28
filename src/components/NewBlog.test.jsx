import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlog from './NewBlog';
import blogService from '../services/blogs';

// Mock the blogService module
vi.mock('../services/blogs');

test('calls blogService.create with correct data when form is submitted', async () => {
  const user = userEvent.setup();

  // Mock the response of blogService.create
  blogService.create.mockResolvedValue({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    id: '123',
  });

  // Provide dummy props
  const fetchBlogs = vi.fn();
  const setErrorMessage = vi.fn();
  const setSuccessMessage = vi.fn();
  const setBlogs = vi.fn();

  // Render the component
  render(
    <NewBlog
      fetchBlogs={fetchBlogs}
      setErrorMessage={setErrorMessage}
      setSuccessMessage={setSuccessMessage}
      setBlogs={setBlogs}
    />
  );

  // Fill in form
  await user.type(screen.getByPlaceholderText('title'), 'Test Title');
  await user.type(screen.getByPlaceholderText('author'), 'Test Author');
  await user.type(screen.getByPlaceholderText('url'), 'http://testurl.com');

  // Submit form
  await user.click(screen.getByRole('button', { name: /create blog/i }));

  // Assertions
  expect(blogService.create).toHaveBeenCalledTimes(1);
  expect(blogService.create.mock.calls[0][0]).toEqual({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
  });
});
