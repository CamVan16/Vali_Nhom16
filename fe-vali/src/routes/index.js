import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn"
import ProductPages from "../pages/Product/Product"
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import CartProductPage from "../pages/CartProductPage/CartProductPage"
import OrderPage from "../pages/OrderPage/OrderPage";
export const routes = [
  {
    path: "/",
    page: SignUp,
    //isShowHeader: true,
  },
  {
    path: "/SignIn",
    page: SignIn,
    //isShowHeader: true,
  },
  {
    path: "/ProductPages",
    page: ProductPages,
    //isShowHeader: true,
  },
  {
    path: "/ProductDetail/:id",
    page: DetailProduct,
    //isShowHeader: true,
  },
  {
    path: "/CartProductPage",
    page: CartProductPage,
    //isShowHeader: true,
  },
  {
    path: "/OrderPage",
    page: OrderPage,
    //isShowHeader: true,
  },
];


