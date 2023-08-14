import { createContext, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export { App, UserContext };
