import React,{useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/pages/login/Login'
import Dashboard from '../components/pages/dashboard/Dashboard'
import OneAlbum from '../components/pages/oneAlbum/oneAlbum'
import ProtectedRoute from '../utils/protectedRoutes'

import { DASHBOARD_ROUTE, LOGIN_ROUTE,ALBUM_ROUTE } from '../utils/consts'
  
  
const AppRouter = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      } />

      <Route path={DASHBOARD_ROUTE} element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path={ALBUM_ROUTE} element={
        <ProtectedRoute>
          <OneAlbum />
        </ProtectedRoute>
      } />  
      
      <Route path="*" element={<Dashboard /> } />
    </Routes>
  )
}

export default AppRouter
