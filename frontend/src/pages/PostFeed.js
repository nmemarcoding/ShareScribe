import { useEffect, useState } from 'react';
import api from '../services/apiService';

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postForm, setPostForm] = useState({ title: '', content: '' });
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUsername(parsed.username);
      } catch {
        setUsername('');
      }
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch {
      setError('❌ Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setPostForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/posts', postForm);
      setSuccess('✅ Post created!');
      setPostForm({ title: '', content: '' });
      fetchPosts();
    } catch {
      setError('❌ Failed to create post.');
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch {
      alert('❌ Failed to delete post.');
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-4">
      <h1 className="text-2xl font-bold text-indigo-600 text-center mb-4">📚 ShareScribe Feed</h1>

      {/* Create Post Form */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Create a new post</h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}

        <form onSubmit={handlePostSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={postForm.title}
            onChange={handleChange}
            placeholder="Post title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <textarea
            name="content"
            value={postForm.content}
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            disabled={posting}
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {posting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>

      {/* Post List */}
      {loading && <div className="text-center text-gray-500 text-sm">Loading posts...</div>}
      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-400">No posts yet. Be the first!</div>
      )}

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg relative"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
              </div>

              {/* Show delete button if current user is the author */}
              {username === post.authorUsername && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  🗑️ Delete
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap mb-2">{post.content}</p>
            <div className="text-xs text-indigo-500 font-medium">— {post.authorUsername}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostFeed;
