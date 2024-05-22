import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button, Input, Popover, Badge } from "antd";
import {
    MenuOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProduct as searchProductAction } from "../../redux/slides/productSlice";
import { resetUser } from "../../redux/slides/userSlide";
//import { resetCart } from "../../redux/slides/cartSlide";
import * as UserService from "../../services/UserService";
import axios from "axios";
import "./style.css";
import { WrapperContentPopup } from "./style";
//import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import CardProduct from '../../components/CardProduct/CardProduct';

const { Header } = Layout;

const AppHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("");

    const [avatar, setAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [isOpenPopup, setIsOpenPopup] = useState("");
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    //const cart = useSelector((state) => state.cart);
    //console.log("order from app header", cart.orderItems);


    useEffect(() => {
        if (user?._id) {
            setLoading(true);
            setUserName(user?.name);
            //setAvatar(user?.avatar);
            setLoading(false);
        }
    }, [user?.name /*,user?.avatar*/]);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    //   const onSearch = (value) => {
    //     if (!value.trim()) return;
    //     dispatch(searchProductAction(value));
    //     navigate(`/search-results?query=${encodeURIComponent(value)}`);
    //   };

    //   Navigate to cart page
    const goToCart = () => {
        navigate("/CartProductPage", { state: location.pathname });
    };

    const handleNavigateLogin = () => {
        console.log(location);
        navigate("/SignIn", { state: location.pathname });
    };

    const handleClickNavigate = (type) => {
        if (type === "UserPage") {
            navigate("/UserPage");
        } else if (type === "admin") {
            navigate("/system/admin");
        } else if (type === "my-order") {
            navigate("/my-order", {
                state: {
                    id: user?.id,
                    token: user?.access_token,
                },
            });
        } else {
            handleLogout();
        }
        setIsOpenPopup(false);
    };

    const handleLogout = async () => {
        setLoading(true);
        // await UserService.logoutUser()
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(resetUser());
        //dispatch(resetCart());
        setLoading(false);
        navigate("/");
    };

    const handleNavigateStore = (name) => {
        // console.log(name)
        navigate(`/ProductPages`)
        window.location.reload();
    }



    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate("UserPage")}>
                Thông tin người dùng
            </WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
                    Quản lí hệ thống
                </WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate()}>
                Đăng xuất
            </WrapperContentPopup>
        </div>
    );

    return (
        <Header
            className="header"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
            }}
        >
            <div
                className="logo"
                onClick={() => {
                    navigate("/");
                }}
            >
                <img src="https://www.shutterstock.com/image-vector/vintage-retro-travel-bag-silhouette-260nw-2161476513.jpg" alt="" />
            </div>

            {/* <Input.Search
        style={{ flex: 2 }}
        placeholder="Bạn cần tìm gì?"
        value={search}
        onChange={onChange}
        onSearch={onSearch}
        enterButton
      /> */}
            <SearchBar
        style={{ flex: 2 }}
        placeholder="Bạn cần tìm gì?"
        value={search}
        onChange={onChange}
        //onSearch={onSearch}
        enterButton
      />
            <div
                style={{
                    cursor: "pointer",
                    maxWidth: 150,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "8px 16px",
                    backgroundColor: "#fff",
                    maxHeight: 36,
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClick={handleNavigateStore}
            >
                <span style={{ color: "#000" }}>Giỏ hàng</span>
            </div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "48px",
                }}
            >
                <Badge /*count={cart?.orderItems?.length} */ size="small">
                    <ShoppingCartOutlined
                        style={{ fontSize: "36px", color: "#fff" }}
                        onClick={goToCart}
                    />
                </Badge>
                {/* <CardProduct /> */}
                {user?._id ? (
                    <>
                        {console.log("is admin? : ", user?.isAdmin)}
                        <Popover content={content} trigger="click" open={isOpenPopup}>
                            <div
                                style={{
                                    cursor: "pointer",
                                    maxWidth: 150,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "flex",
                                }}
                                onClick={() => setIsOpenPopup((prev) => !prev)}
                            >
                                <div
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        objectFit: "cover",
                                        marginRight: "16px",
                                        borderRadius: "50%",
                                    }}
                                >
                                    {/* {user?.avatar ? (
                    <img src={user?.avatar} alt="" />
                  ) : (
                    <FaUserCircle
                      style={{
                        width: "inherit",
                        height: "inherit",
                        color: "#fff",
                      }}
                    />
                  )} */}
                                </div>
                                <span style={{ color: "#fff" }}>
                                    {userName?.length ? userName : user?.email}
                                </span>
                            </div>
                        </Popover>
                    </>
                ) : (
                    <div
                        style={{
                            cursor: "pointer",
                            maxWidth: 150,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "8px 16px",
                            backgroundColor: "#fff",
                            maxHeight: 36,
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={handleNavigateLogin}
                    >
                        <span style={{ color: "#000" }}>Đăng nhập</span>
                    </div>
                )}
            </div>
        </Header>
    );
};

export default AppHeader;
