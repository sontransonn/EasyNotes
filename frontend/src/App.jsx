import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/home/HomePage"
import AboutPage from './pages/about/AboutPage';
import SearchPage from './pages/search/SearchPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/sign-in' element={<LoginPage />} />
          <Route path='/sign-up' element={<RegisterPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App