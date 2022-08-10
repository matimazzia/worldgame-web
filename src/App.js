
import './App.css';
import { Login } from './view/Login';
import {Route } from "react-router-dom";
import { Register } from './view/Register';

function App() {
  return (
    <div>
      <Route exact path="/" ><Login/></Route>
      <Route path="/register"><Register/></Route>

    </div>
  );
}

export default App;
