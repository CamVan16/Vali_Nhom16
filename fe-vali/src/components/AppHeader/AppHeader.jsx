import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button, Input, Popover, Badge } from "antd";
import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { WrapperContentPopup } from "./style";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart"
const { Header } = Layout;

const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("userID");
            if (userId) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8080/api/v1/user/getById/${userId}`);
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUser();
    }, []);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const goToCart = () => {
        navigate("/CartProductPage", { state: location.pathname });
    };

    const handleNavigateLogin = () => {
        navigate("/SignIn", { state: location.pathname });
    };

    const handleClickNavigate = (type) => {
        if (type === "UserPage") {
            navigate("/UserPage");
        } else if (type === "admin") {
            navigate("/AdminPage");
        } else if (type === "my-order") {
            navigate("/my-order", {
                state: {
                    id: user?.id,
                },
            });
        } else {
            handleLogout();
        }
        setIsOpenPopup(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("userID");
        setUser(null);
        navigate("/");
    };

    const handleNavigateStore = () => {
        navigate(`/ProductPages`);
        window.location.reload();
    };

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate("UserPage")}>
                Thông tin người dùng
            </WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
                Quản lí hệ thống
            </WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>
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
                backgroundColor: "#00A86B",
                padding: "0 20px",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >
            <div className="logo" onClick={() => navigate("/")}>
                <span style={{
                    cursor: "pointer",
                    maxWidth: 150,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "8px 16px",
                    maxHeight: 36,
                    fontSize: "24px",
                    fontFamily: "'Pacifico', cursive",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>LUGKY</span>
            </div>

            <SearchBar
                style={{ flex: 2 }}
                placeholder="Bạn cần tìm gì?"
                value={search}
                onChange={onChange}
                enterButton
            />



            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "48px",
                    transition: "opacity 0.3s",
                    maxWidth: 400,

                }}
            >
                <div
                    style={{
                        cursor: "pointer",
                        maxWidth: 150,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: "8px 16px",
                        maxHeight: 36,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "opacity 0.3s"
                    }}
                    onClick={handleNavigateStore}
                    className="hover-opacity"
                >
                    <span style={{ color: "#fff" }}>Sản phẩm</span>
                </div>
                {user ? (
                    <Popover content={content} trigger="click" open={isOpenPopup} className="hover-opacity"
                    >
                        <div
                            style={{
                                cursor: "pointer",
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
                                {/* Avatar handling logic here */}
                            </div>
                            <span style={{ color: "#fff" }}>
                                {user.username ? user.username : user.email}
                            </span>
                        </div>
                    </Popover>
                ) : (
                    <div
                        style={{
                            cursor: "pointer",
                            maxWidth: 150,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "8px 16px",
                            maxHeight: 36,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={handleNavigateLogin}
                        className="hover-opacity"
                    >
                        <span style={{ color: "#fff" }}>Đăng nhập</span>
                    </div>
                )}
                <Badge size="small">
                    <Cart/>
                </Badge>
            </div>
        </Header>
    );
};

export default AppHeader;
