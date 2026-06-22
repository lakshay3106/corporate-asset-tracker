import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <ul className="sidebar">
            <li>
                <Link to="/">
                    Dashboard
                </Link>
            </li>

            <li>
                <Link to="/assets">
                    Assets
                </Link>
            </li>

            <li>
                <Link to="/requests">
                    Requests
                </Link>
            </li>

            <li>
                <Link to="/my-desk">
                    My Desk
                </Link>
            </li>
        </ul>
    );
}

export default Sidebar;