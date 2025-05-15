import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const EditorRoute = ({ children }) => {
  const { user } = useAuth()

  return (user.role.name==='editor' || user.role.name=== 'admin') ? children : <Navigate to="/login" replace />
}

export default EditorRoute