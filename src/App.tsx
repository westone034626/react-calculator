import React from 'react';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.output}>
        <div className={styles.previousOperand}>1,234 *</div>
        <div className={styles.currentOperand}>1,234</div>
      </div>
      <button className={styles.spanTwo}>AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className={styles.spanTwo}>=</button>
    </div>
  );
}

export default App;
