import React from 'react';
import { Link, Outlet } from 'react-router-dom';


function App() {

  return (
    <div className="App p-3">

      <Link to="/login" className="btn btn-primary m-2">Login</Link>
      <Link to="/register" className="btn btn-primary m-2">Register</Link>
      <Link to="/lost-password" className="btn btn-primary m-2">Lost password</Link>
      
      <Outlet />
    </div>
  )
}

export default App;
