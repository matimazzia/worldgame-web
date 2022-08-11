import React from 'react'
import { Login } from './view/login';
import {Route, Routes } from "react-router-dom";
import { Register } from './view/register';
import { Landing } from './view/Landing';
import { Home } from './view/Home';
import { LandingGame } from './view/Landing-game.jsx';
import { Abaut } from './view/Abaut';

function App() {
  return (
    <div className='h-full' >
      <Routes>
        <Route path="/" element = {<Landing/>} />
        <Route path="/landing" element = {<LandingGame/> } />
        <Route path="/login" element = {<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element = {<Home/>} />
        <Route path="/about" element={<Abaut/>} />
      </Routes>

    </div>
  );
}
export default App;