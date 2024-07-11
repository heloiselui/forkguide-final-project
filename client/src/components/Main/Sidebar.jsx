import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import * as Icon from "phosphor-react";

const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle();
  };

  return (
    <nav className={`${styles.sidebarNav} ${styles.isCollapsed ? styles.collapsed : ''}`}>
      <ul>
        <li id={styles.menu} onClick={toggleSidebar}>
          {isCollapsed ? <Icon.ArrowCircleRight size={32} /> : <Icon.ArrowCircleLeft size={32} />}
          {!isCollapsed && "Menu"}
        </li>
        <li>
          <Icon.Calendar size={30} />
          {!isCollapsed && <a href='#'>Planner</a>}
        </li>
        <li>
          <Icon.ShoppingCart size={30} />
          {!isCollapsed && <a href='#'>Shopping List</a>}
        </li>
        <li>
          <Icon.MagnifyingGlass size={30} />
          {!isCollapsed && <a href='#'>Recipes Library</a>}
        </li>
        <li id={styles.account}>
          <Icon.GearSix size={30} />
          {!isCollapsed && <a href='#'>Account Settings</a>}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;