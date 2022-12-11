import "./Styles.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="topnav">
      <a className="active">
        React e reader
      </a>
      <Link to={"/library"}>Library</Link>
    </div>
  );
};

export default Header;
