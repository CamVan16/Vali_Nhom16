import React, { useState, useEffect } from 'react';
import { Button, Input, Typography, Divider, Space, message } from 'antd';
import { UserOutlined, HomeOutlined, ShoppingCartOutlined, CreditCardOutlined, MessageOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { StyledLayout, StyledHeader, StyledContent, StyledFooter, StyledTable } from './style';
const { Title, Text } = Typography;

const OrderPage = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { selectedItems } = location.state;

  useEffect(() => {
    const userID = localStorage.getItem('userID');

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/user/getById/${userID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        message.error('Failed to fetch user information');
        console.error('Fetch user failed:', error);
      }
    };

    if (userID) {
      fetchUser();
    }
  }, []);

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  const placeOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/order/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userID'),
          cartItems: selectedItems,
          totalPrice: calculateTotalPrice(),
          shippingCost: 19600, 
          orderTotal: calculateTotalPrice() + 19600, 
          shippingMethod: 'Nhanh', // assuming fixed shipping method
          paymentMethod: 'Thanh toán khi nhận hàng', // assuming fixed payment method
          shippingAddress: user ? `${user.username} - ${user.mobile} - ${user.address}` : 'Loading...', // using shipping address from user if available
          notes: 'Lưu ý cho người bán...', // get this value from the input field
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // log the response data
      // You can handle success or navigate to a thank you page here
    } catch (error) {
      message.error('Failed to place order');
      console.error('Failed to place order:', error);
    }
  };
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={record.productImg} alt={record.color} style={{ width: '50px', marginRight: '10px' }} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text, record) => (
        <span>{(record.productPrice * record.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
      ),
    },
  ];

  const dataSource = selectedItems.map(item => ({
    key: item.id,
    productName: item.productName,
    productImg: item.productImg,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    productPrice: item.productPrice,
    totalPrice: item.productPrice * item.quantity,
  }));

  return (
    <StyledLayout className="order-page">
      <StyledContent>
        <section className="shipping-info">
          <Title level={2}><HomeOutlined /> Địa Chỉ Nhận Hàng</Title>
          {user ? (
            <>
              <Text>{user.username} ({user.mobile})</Text>
              <Text>{user.address}</Text><br />
              <Button type="primary">Thay Đổi</Button>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </section>

        <Divider />

        <section className="order-items">
          <Title level={2}><ShoppingCartOutlined /> Sản phẩm</Title>
          <StyledTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </section>

        <Divider />

        <section className="voucher-section">
          <Title level={2}>Voucher của Shop</Title>
          <Button type="primary">Chọn Voucher</Button>
        </section>

        <Divider />

        <section className="shipping-method">
          <Title level={2}>Đơn vị vận chuyển</Title>
          <Space direction="vertical">
            <Text>Nhanh</Text>
            <Text>19,600</Text>
          </Space>
        </section>

        <Divider />

        <section className="payment-method">
          <Title level={2}><CreditCardOutlined /> Phương thức thanh toán</Title>
          <Button type="primary">Thay Đổi</Button>
          <Text>Thanh toán khi nhận hàng</Text>
        </section>

        <Divider />

        <section className="order-total">
          <Title level={2}>Tổng tiền đơn hàng</Title>
          <Space direction="vertical">
            <Text>Tổng tiền hàng: {calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            <Text>Phí vận chuyển: 19,600</Text>
            <Text strong>Tổng thanh toán: {(calculateTotalPrice() + 19600).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
          </Space>
        </section>

        <Divider />

        <section className="order-notes">
          <Title level={2}><MessageOutlined /> Lời nhắn</Title>
          <Input placeholder="Lưu ý cho người bán..." />
        </section>
      </StyledContent>

      <StyledFooter className="order-footer">
  <Button type="primary" size="large" onClick={placeOrder}>Đặt hàng</Button>
</StyledFooter>

    </StyledLayout>
  );
}

export default OrderPage;

