import LoginPage from "./components/LoginPage";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import ShortenURLPage from "./components/ShortenURLPage";
import AllUrls from "./components/AllUrls";

function App() {
  return (
    <Router>
      <div className="app">
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegistrationPage/>}/>
      <Route path="/urls" element={<ShortenURLPage/>}/>
      <Route path="/myurls" element={<AllUrls/>}/>
    </Routes>
    </div>
    </Router>
    
  );
}

export default App;