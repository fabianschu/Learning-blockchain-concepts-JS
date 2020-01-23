import React, { useState, useEffect } from "react";
import History from './components/History';
import CreateKeys from "./components/CreateKeys";
import './App.css';
import ShowKeys from "./components/ShowKeys";
import Initiate from "./components/Initiate";
import Chain from "./components/Chain";
import Navbar from "./components/Navbar";


function App() {
  
  const [transactions, setTransactions] = useState([]);
  const [chain, setChain] = useState([]);
  const [keys, setKeys] = useState({});
  const [isInitiated, setIsInitiated] = useState(false);

  return (
    <>
      <Navbar 
      setIsInitiated={setIsInitiated}
      setChain={setChain}
      isInitiated={isInitiated}
      keys={keys}
      setKeys={setKeys}/>
      < History />
      {isInitiated === true && < Chain 
      chain={chain}
      />}
    </>
  );
}

export default App;
