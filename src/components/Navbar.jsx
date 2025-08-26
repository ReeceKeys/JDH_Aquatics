import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-orange-500">JDH Aquatics</h1>
        <ul className="flex gap-6">
          <li><Link className="hover:text-yellow-400" to="/">Home</Link></li>
          <li><Link className="hover:text-yellow-400" to="/about">About</Link></li>
          <li><Link className="hover:text-yellow-400" to="/shop">Shop</Link></li>
          <li><Link className="hover:text-yellow-400" to="/blog">Guides</Link></li>
          <li><Link className="hover:text-yellow-400" to="/contact">Socials</Link></li>
        </ul>
      </div>
    </nav>
  );
}
