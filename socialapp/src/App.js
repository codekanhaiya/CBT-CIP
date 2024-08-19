// import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Password from './pages/Password.js'
import Home from './pages/Home';
import Post from './pages/Post.js';
import UserPost from './pages/UserPost.js';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/appsignin"/>
  }

  return (
    <div className="App">
      {/* <h1>Hi my App</h1> */}

      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/appsignin"/>}/>
        <Route path='/appsignup' element={<Signup/>}/>
        <Route path='/appsignin' element={<Login/>}/>
        <Route path='/apppass' element={<Password/>}/>
        <Route path='/allpost/:userName/:userId' element={<UserPost/>}/>
        <Route path='/apphome' element={<PrivateRoute element={<Home/>} /> } />
        <Route path='/post/:postId' element={<PrivateRoute element={<Post/> } />} />
      </Routes>
    </div>
  );
}

export default App;
