import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GuestHomePage from './pages/Guest/GuestHomePage';
import GuestBox from './components/Guest/GuestBox';

function App() {
  return (
    <div className= "bg-light">
      {/* <h1>HI</h1>
      <Routes>
        <Route path="/" element={<GuestHomePage />} />
       </Routes>  */}
      <Routes>
        <Route path="/" element={<GuestHomePage />} />
    
        <Route path="GuestHomePage">
          <Route index element={<GuestHomePage />} />
        </Route>

        <Route path="*" element={<>Page not found</>} />
      </Routes> 
    </div>
  );
}

export default App;
