import './App.css'
import HomePage from './Pages/HomePage'
import {Routes, Route, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Pricing from './Pages/Pricing';
import Product from './Pages/Product';
// import NavBar from './Components/NavBar';
import Cities from './Pages/Cities';
import AddForm from './Pages/AddForm';
import { useEffect } from 'react';

function App() {
  return (
    <div className='main-div'>
      {/* <NavBar/> */}

        <Routes>
          <Route path="" element={<HomePage/>}/>
          <Route path="pricing" element={<Pricing/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="cities" element={<Cities/>}/>
          <Route path="form" element={<AddForm/>}/>
        </Routes>
    </div>
  )
}

export default App;