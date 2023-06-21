import React from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import SendMessage from './pages/Auth/SendMessage'
import ResetPassword from './pages/Auth/ResetPassword'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Blog from './pages/Blog/Blog'
import NewPost from './pages/Blog/NewPost'


export default function App() {
  return (
      <Router>
            <Routes>
                  <Route path='/register' element={<Register />}></Route>
                  <Route exact path='/login' element={<Login />}></Route>
                  <Route exact path='/profile' element={<Profile />}></Route>
                  <Route exact path='/blog' element={<Blog />}></Route>
                  <Route exact path='/new-post' element={<NewPost />}></Route>
                  <Route exact path='/send-message' element={<SendMessage />}></Route>
                  <Route exact path='/reset-password/:token' element={<ResetPassword />}></Route>
                  <Route path='/' element={<Home />}></Route>
            </Routes>
      </Router>
  )
}
