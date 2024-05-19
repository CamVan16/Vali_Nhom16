import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../../redux/slides/productSlice';
import { Input, Button } from 'antd';



const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(searchProduct(searchTerm));
   // window.location.href = '/ProductPages';


  };

  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <Input
        placeholder="Tìm kiếm sản phẩm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 200, marginRight: '10px' }}
      />
      <Button type="primary" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchBar;
