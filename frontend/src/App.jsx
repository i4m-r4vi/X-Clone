import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/auth/signup/SignUpPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/login/LoginPage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const {data,isLoading} = useQuery({
    queryKey:["authUser"],
    queryFn:async()=>{
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND}api/auth/me`,{
          method:"GET",
          credentials:"include",
          headers:{
            "Content-Type": "application/json"
          }
        })
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.error)
        }
        console.log("User Data:", data);
        return data
      } catch (error) {
          throw error
      }
    }
  })
  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar />
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      <RightPanel />
      <Toaster
        position="bottom-left"
        reverseOrder={false} 
      />
    </div>
  )
}

export default App