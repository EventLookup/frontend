// react stuff
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Create from "./pages/Create";


// components 
import Header from "./components/header/Header";
import Footer from './components/Footer';
import SideNav from './components/SideNav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <SideNav />
    <Routes>
      <Route path="/" element={<Calendar/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    <Footer />
  </BrowserRouter>
);
