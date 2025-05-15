import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const { user } = useAuth()  
  return user.role.name==='admin' ? children : <Navigate to="/login" replace />
}

export default AdminRoute