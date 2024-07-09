import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';

const Header = ({ onLogout }) => {
  return (
    <nav className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <button className={styles.btn_logout} onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
