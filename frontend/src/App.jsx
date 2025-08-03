// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/Pages/Homepage.jsx";
import RootPage from "../src/Pages/RootPage.jsx";
import SignInPage from "../src/Pages/SignInPage.jsx";
import SignUpPage from "../src/Pages/SignUpPage.jsx";
import Dashboard from "../src/Pages/sample.jsx";
import SavedImagesPage from "../src/Pages/SavedImagePage.jsx";


function App() {
  return (
    <Routes>
      <Route element={<RootPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sample" element={<Dashboard />} />
        <Route path="/saved" element={<SavedImagesPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
