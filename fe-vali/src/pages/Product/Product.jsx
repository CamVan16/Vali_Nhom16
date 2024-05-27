import React, { useState, useEffect } from 'react';
import CardProduct from '../../components/CardProduct/CardProduct';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StylePage, StylePagination } from './style';
import Category from '../../components/Category/Category';
import SortPrice from '../../components/SortPrice/SortPrice';

const ProductPages = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("Tất cả");
  const [currentPriceRange, setCurrentPriceRange] = useState("Tất cả");
  const [currentDiscount, setCurrentDiscount] = useState(null);
  const [currentBrand, setCurrentBrand] = useState("Tất cả");
  const [isBannerClicked, setIsBannerClicked] = useState(false);
  const productsPerPage = 8;
  const searchTerm = useSelector((state) => state.product.search);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.discount) {
      setCurrentDiscount(location.state.discount);
      setIsBannerClicked(true);
    } else {
      setCurrentDiscount(null);
      setIsBannerClicked(false);
    }
    
    if (location.state && location.state.brand) {
      setCurrentBrand(location.state.brand);
    } else {
      setCurrentBrand("Tất cả");
    }
  }, [location]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/product/getall')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filterProducts = () => {
    let filtered = products;

    if (currentCategory !== "Tất cả") {
      filtered = filtered.filter(product => product.type === currentCategory);
    }

    if (currentPriceRange !== "Tất cả") {
      filtered = filtered.filter(product => {
        const priceOfS = product.price && product.price.S ? product.price.S : null;
        switch (currentPriceRange) {
          case 'Dưới 3 triệu':
            return priceOfS && priceOfS < 3000000;
          case 'Từ 3 đến 5 triệu':
            return priceOfS && priceOfS >= 3000000 && priceOfS < 5000000;
          case 'Từ 5 đến 10 triệu':
            return priceOfS && priceOfS >= 5000000 && priceOfS < 10000000;
          case 'Trên 10 triệu':
            return priceOfS && priceOfS >= 10000000;
          default:
            return true;
        }
      });
    }

    if (currentBrand !== "Tất cả") {
      filtered = filtered.filter(product => product.description.branch.includes(currentBrand));
    }

    if (isBannerClicked && currentDiscount !== null) {
      filtered = filtered.filter(product => product.discount >= currentDiscount);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered;
  };

  const filteredProducts = filterProducts();

  const getProductsForPage = (page) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (value) => {
    setCurrentCategory(value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (value) => {
    setCurrentPriceRange(value);
    setCurrentPage(1);
  };

  const currentProducts = getProductsForPage(currentPage);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft: '10%' }}>
        <Category onCategoryChange={handleCategoryChange} />
        <div style={{ marginLeft: '10px' }}>
          <SortPrice onPriceChange={handlePriceRangeChange} />
        </div>
      </div>
      <StylePage>
        {currentProducts.map(product => (
          <CardProduct key={product.id} product={product} />
        ))}
      </StylePage>
      <StylePagination>
        <Pagination current={currentPage} total={filteredProducts.length} pageSize={productsPerPage} onChange={handlePageChange} />
      </StylePagination>
    </div>
  );
}

export default ProductPages;






