import { Link } from "react-router-dom";
import './top-menu.css';

const TopMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="customNav">
        <Link className="navbar-brand" to="/productsPage">
          Supermarket
        </Link>
        <Link className="navbar-brand" to="/">
          About Us
        </Link>
        <Link className="navbar-brand" to="/contactUs">
          Contact Us
        </Link>
        
        
      </div>
    </nav>
  );
};

export default TopMenu;
