import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaLaptop,
  FaClipboardList,
  FaDesktop,
} from "react-icons/fa";

function Sidebar() {

    const navStyle = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all duration-300
    ${isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-slate-700 hover:text-blue-400"}`;

        
  return (
    <div className="w-64 min-h-screen bg-slate-800 text-white p-6">

      <h2 className="text-2xl font-bold mb-10">
        Menu
      </h2>

      <ul className="space-y-6">

        <li>
      <NavLink to="/" className={navStyle}>
    <FaTachometerAlt />
    Dashboard
</NavLink>
        </li>

        <li>
 <NavLink to="/assets" className={navStyle}>
    <FaLaptop />
    Assets
</NavLink>

        </li>

        <li>
        <NavLink to="/requests" className={navStyle}>
    <FaClipboardList />
    Requests
</NavLink>
        </li>

        <li>
         <NavLink to="/my-desk" className={navStyle}>
    <FaDesktop />
    My Desk
</NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;