import './App.css'
import HomePage from './Pages/HomePage'
import {Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Pricing from './Pages/Pricing';
import Cities from './Pages/Cities';
import AddForm from './Pages/AddForm';
import CityDetailPage from './Pages/CityBudget';

function App() {
  return (
    <div className='main-div'>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="budgeting" element={<Pricing/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="cities" element={<Cities/>}/>
          <Route path="form" element={<AddForm/>}/>
          <Route path="budgeting/:id" element={<CityDetailPage/>}/>
        </Routes>
    </div>
  )
}

export default App;