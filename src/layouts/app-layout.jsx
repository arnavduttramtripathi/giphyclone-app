import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "../compountens//header";


const AppLayout = () => {
  return (

    <div className='bg-gray-950 text-white min-h-screen'>
      <div className='container py-4 px-6 mx-auto'>

      </div>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout;