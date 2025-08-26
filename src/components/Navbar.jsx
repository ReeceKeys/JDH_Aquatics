import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1><Link className="text-2xl font-bold text-orange-500" to="/">JDH Aquatics</Link></h1>
        <ul className="flex gap-6">
          <li><Link className="hover:text-yellow-400" to="/about">About</Link></li>
          <li><Link className="hover:text-yellow-400" to="/shop">Shop</Link></li>
          <li><Link className="hover:text-yellow-400" to="/guides">Guides</Link></li>
          <li><Link className="hover:text-yellow-400" to="/socials">Socials</Link></li>
        </ul>
      </div>
    </nav>
  );
}
