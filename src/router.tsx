import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout/layout";
import Basket from "./pages/Basket";
import BookDetail from "./pages/BookDetail";
import Books from "./pages/books";
import Login from "./pages/login";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
// import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/signup";
import Error from "./components/commons/error";

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books/search",
    element: <Books />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "/reset",
  //   element: <ResetPassword />,
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/books/:bookId",
    element: <BookDetail />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/orderlist",
    element: <OrderList />,
  },
];

export const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <Error />,
    };
  })
);
