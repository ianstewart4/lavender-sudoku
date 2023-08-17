import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import Play from "./pages/Play";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { useEffect, useState } from "react";
import { getProfile } from "./services/endpoints/users";
import { isAuth } from "./services/utils/isAuth";
import { Loading } from "./components/Loading";

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  useEffect(()=>{
    const checkAuth = async () => {
      try {
        setIsAuthenticated(await isAuth());
        const res = await getProfile();
        setProfile(res.user);

      } catch (error) {
        console.error(error);
      }finally{
        setIsloading(false);
      }
    };
    checkAuth();
  },[location]);
  if(isLoading){return <Loading />}
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage isAuth={isAuthenticated} profile={profile} isLoading={isLoading}/>} />
        <Route path="/play" element={<Play />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
