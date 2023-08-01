import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main";
import Home from '../Pages/Home';
import Signup from '../Pages/Signup'
import LoginPage from "../Pages/Login";
import ProductPage from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import UserInfoPage from "../Pages/UserInfo";
import EditUserInfoPage from "../Pages/EditUser";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/signup',
        element:<Signup/>
      },
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/products',
        element:<ProductPage/>
      },
      {
        path:'/products/:id',
        element:<ProductDetails/>
      },
      {
        path:'/userInfo',
        element:<UserInfoPage/>
      },
      {
        path:'/editUser',
        element:<EditUserInfoPage/>
      } 
    ],
  },
]);

export default routes;
