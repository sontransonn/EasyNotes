import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import HomePage from "./pages/home/HomePage"
import AboutPage from './pages/about/AboutPage';
import SearchPage from './pages/search/SearchPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/dashboard/DashboardPage';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePostPage from './pages/create-post/CreatePostPage';
import UpdatePostPage from './pages/update-post/UpdatePostPage';

import PostDetailsPage from './pages/post-details/PostDetailsPage';

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

          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>

          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePostPage />} />
            <Route path='/update-post/:postId' element={<UpdatePostPage />} />
          </Route>

          <Route path='/post/:postSlug' element={<PostDetailsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App