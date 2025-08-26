import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Guides from "./pages/Guides";
import Socials from "./pages/Socials";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Main content grows to fill remaining space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/socials" element={<Socials />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
