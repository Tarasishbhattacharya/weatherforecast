import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Search from './component/Search';

function App() {
  const cityNames = [
		"Mumbai",
		"Kolkata",
		"Bangalore",
		"Delhi",
		"Pune",
		"Surat",
		"Ahmedabad",
		"Jaipur",
		"Hyderabad",
		"Lucknow"
		];
  return (
    <div className="App">
      <Search option={cityNames}/>
    </div>
  );
}

export default App;
