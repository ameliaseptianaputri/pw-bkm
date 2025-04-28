import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import "./../css/app.css";
import NewsDetail from "./components/NewsDetail"; // Import dari folder pages
import 'remixicon/fonts/remixicon.css';


// Komponen utama yang pakai useLocation
function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== "/signin" && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>

      {location.pathname !== "/signin" && <Footer />}
    </div>
  );
}


// Root render dengan Router
ReactDOM.createRoot(document.getElementById("app")).render(
  <Router>
    <AppContent />
  </Router>
);
