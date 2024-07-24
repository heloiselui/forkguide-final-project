import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import * as Icon from "phosphor-react";
import { Link } from 'react-router-dom';

const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle();
  };

  return (
    <nav className={`${styles.sidebarNav} ${isCollapsed ? styles.collapsed : ''}`}>
      <ul className={isCollapsed ? styles.ulCollapsed : ''}>
        <li id={styles.menu} onClick={toggleSidebar}>
          {isCollapsed ? <Icon.ArrowCircleRight size={32} /> : <Icon.ArrowCircleLeft size={32} />}
          {!isCollapsed && "Menu"}
        </li>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            <Icon.Calendar size={30} />
            {!isCollapsed && <span>Planner</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/shopping-list" className={styles.navLink}>
            <Icon.ShoppingCart size={30} />
            {!isCollapsed && <span>Shopping List</span>}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/recipes-library" className={styles.navLink}>
            <Icon.MagnifyingGlass size={30} />
            {!isCollapsed && <span>Recipes Library</span>}
          </Link>
        </li>
        <li id={styles.account} className={styles.navItem}>
          <Link to="/account-settings" className={styles.navLink}>
            <Icon.GearSix size={30} className={isCollapsed ? styles.iconCollapsed : ''} />
            {!isCollapsed && <span>Account Settings</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;