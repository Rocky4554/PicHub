import React from 'react'
import Header from '../components/Header';
import { ClerkProvider} from "@clerk/clerk-react";
import { Outlet } from 'react-router-dom';
import BackgroundBeams from '../components/BackgroundBeams'
import Footer from '../components/footer';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const RootPage = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      
       {/* <main className="pt-20 min-h-screen"> */}
       <main className='bg-gray-950'>
        <Outlet/>
         
       </main>
     
        
    </ClerkProvider>
  )
}

export default RootPage;