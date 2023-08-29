import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';

import SignUp from './components/SignUp';

import PrivateRoute from './components/PrivateComponent';


import Login from './components/Login';

import AddProduct from './components/AddProduct';

import ProductList from './components/ProductsList';

import UpdateProduct from './components/UpdateProduct';

import AdminLogin from './components/Admin';

import Profile from './components/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route element={<PrivateRoute/>} >
        <Route path = "/" element = {<ProductList/>} />
        
        <Route path = "/update/:id" element = {<UpdateProduct/>} />
        <Route path = "/logout" element = {<h1>LogOut Component</h1>} />
        <Route path = "/profile" element = {<Profile/>} />
        <Route path='/admin' element = {<AdminLogin/>} />
        <Route path = "/add" element = {<AddProduct/>} />
        </Route>


        <Route path = "/SignUp" element = {<SignUp/>} />
        <Route path = "/Login" element = {<Login/>} />
      
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
