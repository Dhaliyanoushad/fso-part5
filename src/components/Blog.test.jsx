import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'React Testing',
    author: 'Dools',
    url: 'https://react-testing.dev',
    likes: 10,
    user: { name: 'Test User' },
    id: '123',
  };

  const fetchBlogs = vi.fn();

  render(<Blog blog={blog} fetchBlogs={fetchBlogs} />);

  // title and author should be visible
  expect(screen.getByText('React Testing')).toBeDefined();
  expect(screen.getByText('Dools')).toBeDefined();

  // url and likes should NOT be in the DOM by default
  expect(screen.queryByText('https://react-testing.dev')).toBeNull();
  expect(screen.queryByText('10 likes')).toBeNull();
});

test('displays blog URL and number of likes when the view button is clicked', async () => {
  const blog = {
    title: 'React Testing',
    author: 'Dools',
    url: 'https://react-testing.dev',
    likes: 10,
    user: { name: 'Test User' },
    id: '123',
  };

  const fetchBlogs = vi.fn();

  render(<Blog blog={blog} fetchBlogs={fetchBlogs} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const urlElement = screen.getByText('https://react-testing.dev');
  const likesElement = screen.getByText('10 likes');

  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
});
