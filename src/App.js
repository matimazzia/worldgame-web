import { Login } from './view/Login';
import {Route, Routes } from "react-router-dom";
import { Register } from './view/register';
import { Landing } from './view/Landing';
import { Home } from './view/Home';

function App() {
  return (
    <div className='h-full' >
      <Routes>
        <Route path="/" element = {<Landing/>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element = {<Home/>} />
      </Routes>
    </div>
  );
}
export default App;