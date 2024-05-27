import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn"
import ProductPages from "../pages/Product/Product"
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import CartProductPage from "../pages/CartProductPage/CartProductPage"
import OrderPage from "../pages/OrderPage/OrderPage";
import UserPage from "../pages/UserPage/UserPage";
import HomePage from "../pages/HomePage/HomePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/SignUp",
    page: SignUp,
    isShowHeader: true,
  },
  {
    path: "/SignIn",
    page: SignIn,
    isShowHeader: true,
  },
  {
    path: "/ProductPages",
    page: ProductPages,
    isShowHeader: true,
  },
  {
    path: "/ProductDetail/:id",
    page: DetailProduct,
    isShowHeader: true,
  },
  {
    path: "/CartProductPage",
    page: CartProductPage,
    isShowHeader: true,
  },
  {
    path: "/OrderPage",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/UserPage",
    page: UserPage,
    isShowHeader: true,
  },
  {
    path: "/ForgotPassword",
    page: ForgotPassword,
    isShowHeader: true,
  },
  {
    path: "/AdminPage",
    page: AdminPage,
    isShowHeader: true,
  },
  {
    path: "/ForgotPassword",
    page: ForgotPassword,
    isShowHeader: true,
  },
];


