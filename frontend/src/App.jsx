import './App.css';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./home"
import MyInput from "./login";
import Menu from "./menu";
import logo from "./assets/images/logo.PNG"

function App() {

  // checks to see if frontend and backend are connected
  useEffect(() => {
    fetch('http://localhost:8080/connect') //call to backend
  .then(response => response.text())
  .then(data => {
    console.log('Backend says:', data);
  })
  .catch(error => {
    console.error('Error connecting to backend:', error);
  });
  }, []);

  return (
    <div className="phone-frame">
      <div className="phone-screen">
      <div><img src={logo} alt="logo"/> </div>
      <h1>sugarbeats</h1>
      <Router>      
        <Link to="/home">home</Link>
        <Link to="/login">login</Link>
        <Link to="/menu">menu</Link>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<MyInput />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;