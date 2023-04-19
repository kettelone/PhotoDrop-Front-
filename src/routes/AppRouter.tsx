import React,{useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/pages/login/Login'
import Dashboard from '../components/pages/dashboard/Dashboard'
import OneAlbum from '../components/pages/oneAlbum/oneAlbum'
import { cookies } from '../service/loginService'

const AppRouter = () => {
  const isLoggedInUser = cookies.get('jwt_authorization')
  return (
    <Routes>
      <Route path="/login" element={isLoggedInUser ? <Dashboard /> :<Login />} />

      <Route path="/dashboard" element={isLoggedInUser ? <Dashboard /> :<Login />} />

      <Route path="/album/:id" element={isLoggedInUser ? <OneAlbum /> : <Login />} />  
      
      <Route path="*" element={isLoggedInUser ? <Dashboard /> : <Login />} />
    </Routes>
  )
}

export default AppRouter
