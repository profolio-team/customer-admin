import React from 'react';
import Home from './views/Home/home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} ></Route>
    </Routes>
  );
}

export default App;
