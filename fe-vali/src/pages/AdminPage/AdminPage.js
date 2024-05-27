import { Carousel, Menu, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getItem } from "../../utils";
import { FormOutlined, ProductOutlined, FileImageOutlined, DeliveredProcedureOutlined, UserOutlined, MenuOutlined, GroupOutlined, WechatOutlined } from "@ant-design/icons";
import CustomizedContent from "./components/CustomizedContent";

import AdminUser from "../../components/AdminUser/AdminUser";
import { useQueries } from "@tanstack/react-query";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");

  const items = [
    getItem("Quản lý khách hàng", "users",<UserOutlined />),
    getItem("Quản lý sản phẩm", "products",<UserOutlined />),
    getItem("Quản lý hoá đơn ", "orders",<UserOutlined />),
  ];

  

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <AdminUser />;
      case "products":
        return <AdminProduct/>;
      case "orders":
        return <AdminOrder/>;
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ display: "flex", overflowX: "hidden" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          selectedKeys={[keySelected]}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: "15px 0 15px 15px" }}>
          {!keySelected && (
            <CustomizedContent data={items} setKeySelected={setKeySelected} />
          )}
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
