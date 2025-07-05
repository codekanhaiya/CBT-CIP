// Import React core dependencies
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

// Import page components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Password from "./pages/Password";
import Home from "./pages/Home";
import Post from "./pages/Post";
import UserPost from "./pages/UserPost";

// Import utility to handle refresh-based authentication
import RefreshHandler from "./utils/RefreshHandler";

// Import Bootstrap CSS and JS (included globally, only once)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // More complete Bootstrap JS

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * PrivateRoute ensures that only authenticated users can access certain routes.
   * If not authenticated, redirects to login page.
   */
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/appsignin" replace />;
  };

  return (
    <div className="App">
      {/* Handles re-authentication or token refresh on page reload */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      {/* Route definitions */}
      <Routes>
        {/* Redirect any unknown route to login */}
        <Route path="/*" element={<Navigate to="/appsignin" replace />} />

        {/* Public routes */}
        <Route path="/appsignup" element={<Signup />} />
        <Route path="/appsignin" element={<Login />} />
        <Route path="/apppass" element={<Password />} />

        {/* Accessible without auth but related to user content */}
        <Route path="/allpost/:userName/:userId" element={<UserPost />} />

        {/* Protected routes (Require login) */}
        <Route path="/apphome" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/post/:postId"
          element={<PrivateRoute element={<Post />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
