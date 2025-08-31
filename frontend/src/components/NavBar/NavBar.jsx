// import React, { useContext, useState } from "react";
// import "./NavBar.css";
// import { assets } from "../../assets/frontend_assets/assets";
// import { Link, useNavigate } from "react-router-dom";
// import { StoreContext } from "../../Context/StoreContext";
// const NavBar = ({ setShowLogin }) => {
//   const [menu, setmenu] = useState("home");
//   const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
//   const navigate=useNavigate();
//   const logout=()=>{
//     localStorage.removeItem("token");
//     setToken("");
//     navigate("/");

//   }
//   return (
//     <div className="navbar">
//       <Link to={"/"}>
//         <img src={assets.logo} alt="img" className="logo" />
//       </Link>
//       <ul className="navbar-menu">
//         <Link
//           to="/"
//           onClick={() => setmenu("home")}
//           className={menu === "home" ? "active" : ""}
//         >
//           home
//         </Link>
//         <a
//           href="#explore-menu"
//           onClick={() => setmenu("menu")}
//           className={menu === "menu" ? "active" : ""}
//         >
//           menu
//         </a>
//         <a
//           href="#app-download"
//           onClick={() => setmenu("mobile-app")}
//           className={menu === "mobile-app" ? "active" : ""}
//         >
//           mobile-app
//         </a>
//         <a
//           href="#footer"
//           onClick={() => setmenu("contact-us")}
//           className={menu === "contact-us" ? "active" : ""}
//         >
//           contact us
//         </a>
//       </ul>
//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="" />
//         <div className="navbar-serach-icon">
//           <Link to={"/cart"}>
//             <img src={assets.basket_icon} alt="" />
//           </Link>
//           <div className={getTotalCartAmount() ? "" : "dot"}></div>
//           {!token ? (
//             <button onClick={() => setShowLogin(true)}>sign in</button>
//           ) : (
//             <div className="navbar-profile">
//               <img src={assets.profile_icon} alt="" />
//               <ul className="nav-profile-dropdown">
//                 <li>
//                   <img onClick={()=>navigate('/myorders')} src={assets.bag_icon} alt="" />
//                   <p>Orders</p>
//                 </li>
//                 <hr />
//                 <li>
//                   <img onClick={logout} src={assets.logout_icon} alt="" />
//                   <p>Logout</p>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import React, { useContext, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Tomato Logo" className="logo" />
      </Link>
      
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact us
          </a>
        </li>
      </ul>
      
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="navbar-icon" />
        
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" className="navbar-icon" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" className="navbar-icon profile-icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;