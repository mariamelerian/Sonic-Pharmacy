import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GuestHomePage from "./pages/Guest/GuestHomePage";
//import Login from "./pages/Guest/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-light">
        <Routes>
          <Route path="/" element={<GuestHomePage />} />
          <Route path="GuestHomePage">
            <Route index element={<GuestHomePage />} />
          </Route>
        {/*   <Route path="login">
            <Route index element={<Login />} />
          </Route> */}
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;