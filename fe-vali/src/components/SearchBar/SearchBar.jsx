import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../../redux/slices/productSlice';
import { Input, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const searchBarStyles = {
  display: 'flex',
  marginBottom: '5px',
};

const searchInputStyles = {
  width: '600px', 
  height:'37px',
  marginRight: '10px',
};

const searchButtonStyles = {
  backgroundColor: 'transparent', 
  color: '#fff', 
  height:'37px',

  border: '1px solid #00a86b', 
  transition: 'background-color 0.3s, border-color 0.3s',
};

const searchButtonHoverStyles = {
  backgroundColor: '#02ce83', 
  borderColor: '#02ce83', 
  color: '#fff', 
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = () => {
    dispatch(searchProduct(searchTerm));
    if (location?.state) {
      navigate(location.state);
    } else {
      navigate('/ProductPages');
    }
  };

  return (
    <div style={searchBarStyles}>
      <Input
        placeholder="Tìm kiếm sản phẩm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyles}
      />
      <Button
        style={isHovered ? { ...searchButtonStyles, ...searchButtonHoverStyles } : searchButtonStyles}
        onClick={handleSearch}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SearchBar;
