import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { loggedInUser, logout as logoutUser } from "../reducers/userSlice";
import { loadUser, login } from "../apiCilet";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authUser);

  useEffect(() => {
    loadUser()
      .then((res) => {
        dispatch(loggedInUser(res?.userWithoutPassword));
      })
      .catch((_) => {
        dispatch(logoutUser());
      });
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <Hero />

      <div className="container mx-auto py-10 flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
