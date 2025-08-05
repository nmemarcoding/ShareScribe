import { useState } from 'react';
import api from '../services/apiService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/login', formData); 
      setSuccess('✅ Login successful! Redirecting...');
      setTimeout(() => navigate('/feed'), 1500);
    } catch (err) {
      setError(err.response?.data || '❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">ShareScribe</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back — Log in to continue 📓</p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-indigo-600 font-medium cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
