import LoginPage from "./components/LoginPage";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import MainPage from "./components/MainPage";
import AllUrls from "./components/AllUrls";

function App() {
  return (
    <Router>
      <div className="app">
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegistrationPage/>}/>
      <Route path="/urls" element={<MainPage/>}/>
      <Route path="/myurls" element={<AllUrls/>}/>
    </Routes>
    </div>
    </Router>
    
  );
}

export default App;