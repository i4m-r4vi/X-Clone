import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/auth/signup/SignUpPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/login/LoginPage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'

const App = () => {
  const { data:authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}api/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json();
        if (!res.ok) {
          return false
        }
        return data
      } catch (error) {
        throw error
      }
    },
    retry:false,
  })
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoadingSpinner size='lg' />
      </div>
    )
  }
  return (
    <div className='flex max-w-6xl mx-auto'>
      {authUser&&<Sidebar />}
      <Routes>
        <Route path='/' element={authUser?<HomePage />:<Navigate to='/login'/>} />
        <Route path='/signup' element={!authUser?<SignUpPage />:<Navigate to='/' />} />
        <Route path='/login' element={!authUser?<LoginPage />:<Navigate to='/' />} />
        <Route path='/notifications' element={authUser?<NotificationPage />:<Navigate to='/login'/>} />
        <Route path='/profile/:username' element={authUser?<ProfilePage />:<Navigate to='/login'/>} />
      </Routes>
      {authUser&&<RightPanel />}
      <Toaster/>
    </div>
  )
}

export default App