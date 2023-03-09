import LoginPage from "./components/LoginPage";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <Router>
      <div className="app">
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegistrationPage/>}/>
    </Routes>
    </div>
    </Router>
    
  );
}

export default App;