import './App.css';
import {Routes, Route} from "react-router-dom"
import { useContext, useState } from 'react';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { AuthContext } from './Components/Contex/AuthContext';


function App() {
  const {token}= useContext(AuthContext);
  return (
    <div className="App">
      {
      token ? (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<h1>Page Not found</h1>}/>
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={ <Login/> }/>
        </Routes>
      )}
    </div>
  );
}

export default App;
