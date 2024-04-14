import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Details from "../pages/Details";
import Protected from "../protected/Protected";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import DashBoardStats from "../Admin/DashBoardStats";
import DashboardUsers from "../Admin/DashboardUsers";
import DashboardRooms from "../Admin/DashboardRooms";
import DashboardBookings from "../Admin/DashboardBookings";
import DashBoardAvailableRooms from "../Admin/DashBoardAvailableRooms";
import AddRoom from "../Admin/AddRoom";
import AvailableRooms from "../AdminComponents/AvailableRooms";
import AllRooms from "../AdminComponents/AllRooms";
import AllBookings from "../AdminComponents/AllBookings";
import UpdateRoom from "../AdminComponents/UpdateRoom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "detail/:id",
        element: <Details />,
      },
      {
        path: "booking/:id",
        element: (
          <Protected>
            <Booking />
          </Protected>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <Protected>
            <MyBookings />
          </Protected>
        ),
      },
    ],
  },
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path: "available-rooms",
        element: (
          <Protected adminOnly>
            <AvailableRooms />
          </Protected>
        ),
      },
      {
        path: "all-rooms",
        element: (
          <Protected adminOnly>
            <AllRooms />
          </Protected>
        ),
      },
      {
        path: "all-bookings",
        element: (
          <Protected adminOnly>
            <AllBookings />
          </Protected>
        ),
      },
      {
        path: "update",
        element: (
          <Protected adminOnly>
            <UpdateRoom />
          </Protected>
        ),
      },
    ],

  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        children: [
          {
            path: "",
            element: (
              <Protected adminOnly={true}>
                <DashBoardStats />
              </Protected>
            ),
          },
          {
            path: "users",
            element: (
              <Protected adminOnly={true}>
              <DashboardUsers/>
              
              </Protected>
            ),
          },
          {
            path: "rooms",
            element: (
              <Protected adminOnly={true}>
              <DashboardRooms/>
              
              </Protected>
            ),
          },
          {
            path: "bookings",
            element: (
              <Protected adminOnly={true}>
              <DashboardBookings/>
              
              </Protected>
            ),
          },
          {
            path: "available-rooms",
            element: (
              <Protected adminOnly={true}>
              <DashBoardAvailableRooms/>
              
              </Protected>
            ),
          },
          {
            path: "add-room",
            element: (
              <Protected adminOnly={true}>
              <AddRoom/>
              
              </Protected>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);
