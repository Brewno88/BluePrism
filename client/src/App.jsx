import { useState } from 'react';
import './assets/styles/App.css';
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App p-4 sm:px-8">
      <Header />
    </div>
  );
}

export default App;
