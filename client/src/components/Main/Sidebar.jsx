import React from 'react';
import styles from './Sidebar.module.css';
import * as Icon from "phosphor-react";

const Sidebar = () => {
  return (
    <nav className={styles.sidebarNav}>
      <ul>
        <li id={styles.menu}>
          <Icon.ArrowCircleLeft size={32} />
          Menu
        </li>
        <li>
          <Icon.Calendar size={21} />
          <a href='#'>Planner</a>
        </li>
        <li>
          <Icon.ShoppingCart size={21} />
          <a href='#'>Shopping List</a>
        </li>
        <li>
          <Icon.MagnifyingGlass size={21} />
          <a href='#'>Recipes Library</a>
        </li>
        <li id={styles.account}>
          <Icon.GearSix size={21} />
          <a href='#'>Account Settings</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
