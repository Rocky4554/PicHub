//   // App.jsx
//   import React from "react";
//   import { BrowserRouter,Routes, Route } from "react-router-dom";
//   import Home from "../src/Pages/Homepage.jsx";
//   import RootPage from "./Pages/RootPage.jsx";
//   import SignInPage from "../src/Pages/SignInPage.jsx";
//   import SignUpPage from "../src/Pages/SignUpPage.jsx";
//   import Dashboard from "../src/Pages/sample.jsx";
//   import SavedImagesPage from "../src/Pages/SavedImagePage.jsx";
//   import SSOCallback from "./Pages/sso-signIn"
//   import ShowSignupMessage from "./Pages/showSignUpmessage.jsx";
//   import { ClerkProvider} from "@clerk/clerk-react";
  
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

//   function App() {
//     return (
//       <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route element={<RootPage />}>
//               <Route path="/sign-in" element={<SignInPage />} />
//               <Route path="/sign-up/*" element={<SignUpPage />} />
//               <Route path="/sample" element={<Dashboard />} />
//               <Route path="/saved" element={<SavedImagesPage />} />
//               <Route path="/sign-in/sso-callback" element={<SSOCallback />} />
//               <Route path="/show-signup-message" element={<ShowSignupMessage />} />
//               {/* <Route path="*" element={<NotFound />} /> */}
//             </Route>
//           </Routes>
        
//       </ClerkProvider>
//     );
//   }

//   export default App;

//////////////////////////////////////////////////////////

import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../src/Pages/Homepage.jsx";
import RootPage from "./Pages/RootPage.jsx";
import SignInPage from "../src/Pages/SignInPage.jsx";
import SignUpPage from "../src/Pages/SignUpPage.jsx";
import Dashboard from "../src/Pages/sample.jsx";
import SavedImagesPage from "../src/Pages/SavedImagePage.jsx";
import SSOCallback from "./Pages/sso-signIn";
import ShowSignupMessage from "./Pages/showSignUpmessage.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AppRoutes() {
  const navigate = useNavigate();
  
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={navigate} afterSignOutUrl="/">
      <Routes>
        {/* Public route - accessible to everyone */}
        <Route path="/" element={<Home />} />
        
        {/* Auth routes - public */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/sign-in/sso-callback" element={<SSOCallback />} />
        <Route path="/show-signup-message" element={<ShowSignupMessage />} />
        
        {/* Protected routes wrapped in RootPage */}
        <Route element={<RootPage />}>
          <Route path="/sample" element={<Dashboard />} />
          <Route path="/saved" element={<SavedImagesPage />} />
        </Route>
        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;