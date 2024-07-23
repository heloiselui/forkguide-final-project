import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';

const Header = ({ onLogout }) => {
  return (
    <nav className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <button className={styles.btn_logout} onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;