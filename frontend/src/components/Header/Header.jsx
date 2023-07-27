import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconListCheck } from "bootstrap-icons/icons/list-check.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconInfoCircleFill } from "bootstrap-icons/icons/info-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  return (
    <React.Fragment>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-1 text-center">
              <Link to="/">
                <img
                  alt="logo"
                  className="squeeze-logo"
                  src="https://img.freepik.com/free-vector/detailed-click-collect-sign_23-2148794142.jpg?w=826&t=st=1690466460~exp=1690467060~hmac=50c96dfbdeadeb418d52c77fc065908b790d912beefed62d498d13c0748afba2"
                />
              </Link>
            </div>
            <div className="col-md-7">
              <Search />
            </div>
            <div className="col-md-4">
              <div className="position-relative d-inline me-3">
                <Link to="/cart" className="btn btn-primary">
                  <IconCart3 className="i-va" />
                  <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                    2
                  </div>
                </Link>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle border me-3"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                  data-bs-toggle="dropdown"
                >
                  <FontAwesomeIcon icon={faUser} className="text-light" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item menuItemcss" to="/account/profile">
                      <IconPersonBadgeFill /> My Profile
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item menuItemcss" to="/star/zone">
                      <IconStarFill className="text-warning" /> Star Zone
                    </Link>
                  </li> */}
                  <li>
                    <Link className="dropdown-item menuItemcss" to="/account/orders">
                      <IconListCheck className="text-primary" /> Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item menuItemcss" to="/account/wishlist">
                      <IconHeartFill className="text-danger" /> Wishlist
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {/* <li>
                    <Link className="dropdown-item menuItemcss" to="/account/notification">
                      <IconBellFill className="text-primary" /> Notification
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link className="dropdown-item menuItemcss" to="/support">
                      <IconInfoCircleFill className="text-success" /> Support
                    </Link>
                  </li> */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item menuItemcss" to="/">
                      <IconDoorClosedFill className="text-danger" /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
             
              <Link to="/account/signin">Sign In</Link> |{" "}
              <Link to="/account/signup"> Sign Up</Link>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
export default Header;
