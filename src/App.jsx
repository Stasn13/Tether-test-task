import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import Button from './components/Button';
import Dropdown from './components/Dropdown';

function App() {
  const options = ['angular', 'react', 'vue'];
  const [value, setValue] = useState('');

  return (
    <div data-testid="app" className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          data-testid="app-link"
          className={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Dropdown onChange={setValue} options={options} value={value} />
        <Button className={styles.TestButton}>Test</Button>
      </header>
    </div>
  );
}

export default App;
