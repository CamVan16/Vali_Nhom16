import React, { useState, useEffect } from 'react';
import CardProduct from '../../components/CardProduct/CardProduct';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { StylePage, StylePagination } from './style';
import Category from '../../components/Category/Category';
import SortPrice from '../../components/SortPrice/SortPrice';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
const ProductPages = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("Tất cả");
  const [currentPriceRange, setCurrentPriceRange] = useState("Tất cả");
  //const [sizeSGia, setSizeSGia] = useState(null);
  const productsPerPage = 8;
  const searchTerm = useSelector((state) => state.product.search);
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/product/getall')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        //setSizeSGia(data.price && data.price.S ? data.price.S : null);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filteredProductsByCategory = currentCategory === "Tất cả" ? products : products.filter(product => product.type === currentCategory);

  const filteredProductsByPrice = currentPriceRange === "Tất cả" ? 
  filteredProductsByCategory : 
  filteredProductsByCategory.filter(product => {
    // Lấy giá của kích thước S và lọc
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

  const getProductsForPage = (page) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProductsByPrice.slice(startIndex, endIndex);
  };

  // const filteredProductsBySearchTerm = searchTerm === '' ? filteredProductsByPrice :
  //   filteredProductsByPrice.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  // // const getProductsForPage = (page) => {
  // //   const startIndex = (page - 1) * productsPerPage;
  // //   const endIndex = startIndex + productsPerPage;
  // //   return filteredProductsByPrice.slice(startIndex, endIndex);
  // // };
  // const getProductsForPage = (page) => {
  //   const startIndex = (page - 1) * productsPerPage;
  //   const endIndex = startIndex + productsPerPage;
  //   return filteredProductsBySearchTerm.slice(startIndex, endIndex);
  // };
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
      <Header></Header>
      <SearchBar/>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft:'10%'}}>
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
        <Pagination current={currentPage} total={filteredProductsByPrice.length} pageSize={productsPerPage} onChange={handlePageChange} />
      </StylePagination>
    </div>
  );
}

export default ProductPages;




