import React from 'react'
import Header from '../components/Header';

import { Outlet} from 'react-router-dom';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const RootPage = () => {
    // const navigate = useNavigate();
  return (
      <div className="bg-gray-950 min-h-screen">
        <Outlet />
      </div>
    )
}

export default RootPage;
