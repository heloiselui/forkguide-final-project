import React, { useState } from 'react';
import styles from './Sidebar.module.css';

import hamburgerMenu from "../../assets/hamburger-menu.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <img className={styles.hamburgerMenu} src={hamburgerMenu} alt="Menu Hamburger" />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>Planner</li>
          <li>Shopping List</li>
          <li>Recipes</li>
          <li>Library</li>
          <li>Account Settings</li>
        </ul>
      </nav>
    </aside>

  );
};

export default Sidebar;
