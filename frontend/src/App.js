import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './pages/CreatePost';
import PostFeed from './pages/PostFeed';
import api from './services/apiService';

function App() {
  const [serverRunning, setServerRunning] = useState(null); // null = checking, true = running, false = down

  useEffect(() => {
    const checkServer = async () => {
      try {
        await api.get('/ping'); // Make sure your Spring Boot backend exposes /api/ping
        setServerRunning(true);
      } catch (error) {
        console.error('❌ Server check failed:', error.message);
        setServerRunning(false);
      }
    };

    checkServer();
  }, []);

  if (serverRunning === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-center px-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">🔄 Checking server status...</h2>
          <p className="text-sm">Please wait while we connect to ShareScribe backend.</p>
        </div>
      </div>
    );
  }

  if (!serverRunning) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-center px-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">🚫 Server Unavailable</h2>
          <p className="text-sm">Unable to reach the server. Please try refreshing or check your connection.</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div className="pt-20 px-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <PostFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
