import { Link } from 'react-router-dom';
import logo from '../../assets/img/baloncesto.png';

export const NavbarHome = () => {
  return (
    <nav className="navbar-home">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src={logo} alt="Logo de AlmacénX" className="navbar-logo" />
          <h1 className="navbar-title">Publicaciones Baloncest</h1>
        </div>
        <ul className="navbar-links">
        </ul>
      </div>
    </nav>
  );
};
