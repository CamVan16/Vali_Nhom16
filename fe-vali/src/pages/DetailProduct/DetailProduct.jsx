import React, { useState, useEffect } from 'react';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import ProductDes from '../../components/ProductDes/ProductDes';
import { SideSection, SizeButton, Container, ProductContainer } from './style';
import { useParams } from 'react-router-dom';
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
    <Container>
      <ProductContainer>
        <SideSection>
          <ProductImage selectedImage={selectedImage} />
        </SideSection>
        <SideSection>
          <ProductInfo
            id={id}
            name={name}
            price={price[selectedSize]}
            discount={discount}
            img={img}
            sizes={sizes}
            stock={stock}
            description={description}
            onImageClick={setSelectedImage}
            onSizeClick={handleSizeClick}
            selectedSize={selectedSize}
          />
          <ProductDes description={description} />
        </SideSection>
      </ProductContainer>
    </Container>
  );
};

export default DetailProduct;
