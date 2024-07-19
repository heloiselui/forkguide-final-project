import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import NutritionChatBot from '../../ChatBot';
import styles from './ShoppingList.module.css';
import * as Icon from "phosphor-react";
import jsPDF from 'jspdf';

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

const ShoppingList = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('shoppingList');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [currentItem, setCurrentItem] = useState({ name: '', quantity: '' });

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (currentItem.name && currentItem.quantity) {
      setItems([...items, currentItem]);
      setCurrentItem({ name: '', quantity: '' });
    }
  };

  const updateItem = (index, updatedItem) => {
    const newItems = items.map((item, i) => (i === index ? updatedItem : item));
    setItems(newItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Shopping List', 10, 10);
    items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - ${item.quantity}`, 10, 20 + (index * 10));
    });
    doc.save('shopping-list.pdf');
  };

  return (
    <div className={styles.container}>
      <Header onLogout={handleLogout} />
      <div className={styles.mainWrapper}>
        <Sidebar />
        <div className={styles.content}>
          <main className={styles.mainContent}>
            <h1>Shopping List</h1>
            <div className={styles.form}>
              <input
                type="text"
                placeholder="Item Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={currentItem.quantity}
                onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                className={styles.input}
              />
              <button onClick={addItem} className={styles.addButton}>
                <Icon.Plus size={20} className={styles.icon} />
                Add Item
              </button>
            </div>
            <ul className={styles.list}>
              {items.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, { ...item, name: e.target.value })}
                    className={styles.input}
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, { ...item, quantity: e.target.value })}
                    className={styles.input}
                  />
                  <button onClick={() => removeItem(index)} className={styles.removeButton}>
                    <Icon.Trash size={20} className={styles.icon} />
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={generatePDF} className={styles.generatePDFButton}>
              <Icon.FilePdf size={20} className={styles.icon} />
              Generate PDF
            </button>
          </main>
        </div>
      </div>
      <NutritionChatBot />
    </div>
  );
};

export default ShoppingList;
