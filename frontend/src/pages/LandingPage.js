import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-xl bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">Welcome to ShareScribe</h1>
        <p className="text-gray-600 text-base mb-6 leading-relaxed">
          ✍️ ShareScribe is a modern blogging platform where you can:
          <br />
          <span className="block mt-2">📖 Read what others are writing</span>
          <span>📝 Publish your own posts</span>
          <span>🤝 Connect with a community of writers</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
