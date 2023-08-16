import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main";
import Home from '../Pages/Home';
import Signup from '../Pages/Signup'
import LoginPage from "../Pages/Login";
import ProductPage from "../Pages/Products";
import ProductDetails from "../Pages/ProductDetails";
import UserInfoPage from "../Pages/UserInfo";
import EditUserInfoPage from "../Pages/EditUser";
import CartPage from "../Pages/CartPage";
import CheckoutForm from "../Pages/Payment/CheckoutPage";
import RequireAuth from "../Pages/RequireAuth";
import NotFound from "../Pages/NotFound";
import PaymentSuccessPage from "../Pages/Payment/PaymentSucces";
import OrderHistoryPage from "../Pages/OrderHistory";
import SearchResults from "../Pages/SearchResult";
import WishLists from "../Pages/WishLists";
import ResetPassword from "../Pages/ResetPassword";

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
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/signup/admin/:pin',
        element: <Signup />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/products',
        element: <ProductPage />
      },
      {
        path: '/productDetails/:id',
        element: <ProductDetails />
      },
      {
        path: '/searchResult/:searchKeyword',
        element: <SearchResults />
      },
      {
        path: '/userInfo',
        element: <UserInfoPage />
      },
      {
        path: '/editUser',
        element: <EditUserInfoPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/checkout',
        element: <RequireAuth><CheckoutForm /></RequireAuth>
      },
      {
        path: '/payment/success',
        element:<PaymentSuccessPage/>
      },
      {
        path: '/orderHistory',
        element:<OrderHistoryPage/>
      },
      {
        path: '/wishlists',
        element:<WishLists/>
      },
      {
        path: `/reset-password/:id`,
        element:<ResetPassword/>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);

export default routes;
