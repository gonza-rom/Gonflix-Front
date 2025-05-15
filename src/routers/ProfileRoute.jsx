import React from 'react'
import { useProfile } from '../contexts/ProfileContext'
import { Navigate } from 'react-router-dom'

const ProfileRoute = ({ children }) => {
  const { currentProfile } = useProfile()
  return currentProfile ? children : <Navigate to="/Profiles" replace />
}

export default ProfileRoute