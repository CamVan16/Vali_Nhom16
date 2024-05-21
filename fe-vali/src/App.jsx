import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "antd/dist/reset.css";
import { Layout } from "antd";
import SubCategoryList from "./components/SubCategoryList/SubCategoryList";
import AppHeader from "./components/AppHeader/AppHeader";
import AppFooter from "./components/AppFooter/AppFooter";
import { routes } from "./routes";
import "./index.css";

const { Content } = Layout;

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((c) => c.name === selectedCategory);
      setSubCategories(category ? category.subCategories : []);
    }
  }, [selectedCategory, categories]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                {route.isShowHeader && <AppHeader categories={categories} />}
                <Content
                  style={{
                    padding: "0 50px",
                    marginTop: route.isShowHeader ? 64 : 0,
                  }}
                >
                  <div
                    style={{ background: "#fff", padding: 24, minHeight: 380 }}
                  >
                    {route.isShowHeader && selectedCategory && (
                      <SubCategoryList subCategories={subCategories} />
                    )}
                    <route.page />
                  </div>
                </Content>
                <AppFooter />
              </>
            }
          />
        ))}
      </Routes>
    </Layout>
  );
};

export default App;
