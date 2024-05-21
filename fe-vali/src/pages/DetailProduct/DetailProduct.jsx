import React, { useState, useEffect } from 'react';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import ProductDes from '../../components/ProductDes/ProductDes';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('S');

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/product/get/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(Object.values(data.img)[0]); // Set the first image as the default
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, img, price, discount, description, stock } = product;
  const sizes = Object.keys(price);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div>
        <Header></Header>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', margin: '0 auto', maxWidth: '1200px' }}>
      <div style={{ flex: 1 }}>
        <ProductImage selectedImage={selectedImage} />
      </div>
      <div style={{ flex: 1 }}>
        <ProductInfo
          id = {id}
          name={name}
          price={price[selectedSize]}
          discount={discount}
          img={img}
          sizes={['S', 'M', 'L']}
          stock={stock}
          description={description}
          onImageClick={setSelectedImage}
          onSizeClick={handleSizeClick}
          selectedSize={selectedSize}
        />
        <ProductDes description={description} />
      </div>
    </div>
    </div>
    
  );
};

export default DetailProduct;
