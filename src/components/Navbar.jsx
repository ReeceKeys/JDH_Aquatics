import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500 whitespace-nowrap">
          <Link to="/">JDH Aquatics</Link>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6">
          <li><Link className="hover:text-yellow-400" to="/about">About</Link></li>
          <li><Link className="hover:text-yellow-400" to="/shop">Shop</Link></li>
          <li><Link className="hover:text-yellow-400" to="/guides">Guides</Link></li>
          <li><Link className="hover:text-yellow-400" to="/socials">Socials</Link></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1 w-8 h-8 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-black/95 transition-max-h duration-300 overflow-hidden ${menuOpen ? "max-h-60" : "max-h-0"}`}>
        <ul className="flex flex-col gap-4 p-4">
          <li><Link className="hover:text-yellow-400" to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link className="hover:text-yellow-400" to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
          <li><Link className="hover:text-yellow-400" to="/guides" onClick={() => setMenuOpen(false)}>Guides</Link></li>
          <li><Link className="hover:text-yellow-400" to="/socials" onClick={() => setMenuOpen(false)}>Socials</Link></li>
        </ul>
      </div>
    </nav>
  );
}
