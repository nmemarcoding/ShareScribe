import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>test</div>
          }
        />
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
