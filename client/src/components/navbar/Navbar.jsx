import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"
import { Link } from "react-router-dom";

const Navbar = () => {

  const { user } = useContext(AuthContext);

  console.log('user', user)
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="logo" to={'/'} style={{color: 'white', textDecoration: 'none'}}>
          <span>Bookingers</span>
        </Link>
        {
          user?.[0] &&
          user?.[0].username
          ||
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar