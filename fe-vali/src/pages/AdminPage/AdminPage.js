import { Menu} from "antd";
import React, {useState } from "react";
import { getItem } from "../../utils";
import {  UserOutlined, ShoppingOutlined, FileSearchOutlined } from "@ant-design/icons";
import CustomizedContent from "./components/CustomizedContent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");

  const items = [
    getItem("Quản lý khách hàng", "users",<UserOutlined />),
    getItem("Quản lý sản phẩm", "products",<ShoppingOutlined />),
    getItem("Quản lý hoá đơn ", "orders",<FileSearchOutlined />),
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
