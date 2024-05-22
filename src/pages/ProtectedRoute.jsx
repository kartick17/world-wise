import React, { useEffect } from 'react'
import AppLayout from './AppLayout'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/')
    },
    [isAuthenticated, navigate]
  )

  return isAuthenticated ? <AppLayout /> : null
}

export default ProtectedRoute
