import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../../redux/slides/productSlice';
import { Input, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';



const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearch = () => {
    dispatch(searchProduct(searchTerm));
    // window.location.href = '/ProductPages';
    if (location?.state) {
      navigate(location.state);
    } else {
      navigate('/ProductPages');
    }


  };

  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <Input
        placeholder="Tìm kiếm sản phẩm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 200, marginRight: '10px', backgroundColor: 'rgb(0, 168, 106)', color:'black' }}
      />
      <Button type="primary" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchBar;
