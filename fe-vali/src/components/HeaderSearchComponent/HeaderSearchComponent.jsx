import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input, Col, Popover, Badge } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { searchProduct as searchProductAction } from "../../redux/slides/productSlice"; // Correct the path if necessary
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import Loading from "../LoadingComponent/Loading";
import * as UserService from '../../services/UserService'
import { resetUser } from "../../redux/slides/userSlide";
import { useLocation } from "react-router-dom";

const HeaderSearchComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState("");
  const isHiddenCart = false;

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );
  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }
  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
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
  const handleNavigateLogin = () => {
    console.log(location)
    navigate("/signin", {state:location.pathname});
  };
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (value) => {
    if (!value.trim()) return;
    dispatch(searchProductAction(value));
    navigate(`/search-results?query=${encodeURIComponent(value)}`);
  };

  return (
    <WrapperHeader>
      <Col span={6}> </Col>
      <Col span={12}>
        <Input.Search
          placeholder="Bạn cần tìm gì?"
          value={search}
          onChange={onChange}
          onSearch={onSearch}
          enterButton
        />
      </Col>
      <Col
        span={6}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "54px",
          alignItems: "center",
        }}
      >
        <Loading isLoading={loading}>
          <WrapperHeaderAccount>
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserOutlined style={{ fontSize: "30px" }} />
            )}
            {user?.access_token ? (
              <>
                <Popover content={content} trigger="click" open={isOpenPopup}>
                  <div
                    style={{
                      cursor: "pointer",
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onClick={() => setIsOpenPopup((prev) => !prev)}
                  >
                    {userName?.length ? userName : user?.email}
                  </div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Đăng nhập/Đăng ký
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
        </Loading>
        {!isHiddenCart && (
          <div onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
            <Badge count={order?.orderItems?.length} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "#fff" }}
              />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        )}
      </Col>
    </WrapperHeader>
  );
};

export default HeaderSearchComponent;
