import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Typography, Divider, Space, message, Radio } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, CreditCardOutlined, MessageOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { StyledLayout, StyledContent, StyledFooter, StyledTable } from './style';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;
const { TextArea } = Input;
const OrderPage = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: '', address: '', mobile: '' });
  const location = useLocation();
  const { selectedItems } = location.state;
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [shippingMethod, setShippingMethod] = useState('Nhanh'); // Default to 'Nhanh'
  const [shippingCost, setShippingCost] = useState(100000);
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng'); // Default to 'Thanh toán khi nhận hàng'
  const [notes, setNotes] = useState('');

  const navigate = useNavigate();
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
        if (data.addresses && data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } catch (error) {
        message.error('Failed to fetch user information');
        console.error('Fetch user failed:', error);
      }
    };

    if (userID) {
      fetchUser();
    }
  }, []);

  const handleAddAddress = async () => {
    try {
      if (!newAddress.name || !newAddress.address || !newAddress.mobile) {
        message.error('Vui lòng nhập đầy đủ thông tin địa chỉ');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/v1/user/addAddress/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setSelectedAddress(updatedUser.addresses[updatedUser.addresses.length - 1]); // Chọn địa chỉ mới thêm vào
      setModalVisible(false);
      setNewAddress({ name: '', address: '', mobile: '' });
    } catch (error) {
      message.error('Failed to add new address');
      console.error('Failed to add new address:', error);
    }
  };

  const renderSelectedAddress = () => {
    if (selectedAddress) {
      return (
        <div>
          <Text>{selectedAddress.name} ({selectedAddress.mobile})</Text>
          <Text>{selectedAddress.address}</Text><br />
        </div>
      );
    } else {
      return <Text>No address selected</Text>;
    }
  };

  const handleShippingChange = e => {
    const method = e.target.value;
    setShippingMethod(method);
    setShippingCost(method === 'Nhanh' ? 100000 : 70000);
  };

  const handlePaymentChange = e => {
    setPaymentMethod(e.target.value);
  };
  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  const clearSelectedItems = async (userID, selectedItems) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/cart/${userID}/removeItems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedItems.map(item => item.id)),
      });
      if (!response.ok) {
        throw new Error('Failed to clear selected items');
      }
      message.success('Selected items cleared');
    } catch (error) {
      message.error('Failed to clear selected items');
      console.error('Failed to clear selected items:', error);
    }
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
          shippingCost: shippingCost,
          orderTotal: calculateTotalPrice() + shippingCost,
          shippingMethod: shippingMethod,
          paymentMethod: paymentMethod,
          shippingAddress: user ? `${selectedAddress.name} - ${selectedAddress.address} - ${selectedAddress.mobile}` : 'Loading...',
          notes: notes
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      message.success('Order placed successfully',5);
      await clearSelectedItems(localStorage.getItem('userID'), selectedItems);
      navigate("/");
    } catch (error) {
      //message.error('Failed to place order');
      navigate("/");
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
              {renderSelectedAddress()}
              <Button type="primary" onClick={() => setModalVisible(true)}>Thay Đổi</Button>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </section>

        <Modal
          title="Thay Đổi Địa Chỉ Nhận Hàng"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setModalVisible(false)}>OK</Button>,
            <Button key="add" type="primary" onClick={handleAddAddress}>Thêm Địa Chỉ</Button>,
          ]}
        >
          <Radio.Group
            onChange={(e) => setSelectedAddress(user.addresses.find(addr => addr.id === e.target.value))}
            value={selectedAddress ? selectedAddress.id : null}
          >
            {user && user.addresses.map(address => (
              <Radio key={address.id} value={address.id}>
                <Text>{address.name} ({address.mobile})</Text>
                <Text>{address.address}</Text><br />
              </Radio>
            ))}
          </Radio.Group>
          <Divider />
          <Input
            placeholder="Tên người nhận"
            value={newAddress.name}
            onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
          />
          <Input
            placeholder="Địa chỉ"
            value={newAddress.address}
            onChange={e => setNewAddress({ ...newAddress, address: e.target.value })}
          />
          <Input
            placeholder="Số điện thoại"
            value={newAddress.mobile}
            onChange={e => setNewAddress({ ...newAddress, mobile: e.target.value })}
          />
        </Modal>

        <Divider />

        <section className="order-items">
          <Title level={2}><ShoppingCartOutlined /> Sản phẩm</Title>
          <StyledTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </section>

        {/* <Divider />

        <section className="voucher-section">
          <Title level={2}>Voucher của Shop</Title>
          <Button type="primary">Chọn Voucher</Button>
        </section> */}

        <Divider />

        <section className="shipping-method">
          <Title level={2}>Đơn vị vận chuyển</Title>
          <Radio.Group onChange={handleShippingChange} value={shippingMethod}>
            <Radio value="Nhanh">Nhanh - 100,000 VND</Radio>
            <Radio value="Thuong">Thường - 70,000 VND</Radio>
          </Radio.Group>
          {/* <Space direction="vertical">
            <Text>Phí vận chuyển: {shippingCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
          </Space> */}
        </section>

        <Divider />

        <section className="payment-method">
          <Title level={2}><CreditCardOutlined /> Phương thức thanh toán</Title>
          <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
            <Radio value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</Radio>
            <Radio value="Thanh toán qua VNPAY">Thanh toán qua VNPAY</Radio>
          </Radio.Group>
        </section>

        <Divider />

        <section className="order-total">
          <Title level={2}>Tổng tiền đơn hàng</Title>
          <Space direction="vertical">
            <Text>Tổng tiền hàng: {calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            <Text>Phí vận chuyển: {shippingCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
            <Text strong>Tổng thanh toán: {(calculateTotalPrice() + shippingCost).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
          </Space>
        </section>

        <Divider />

        <section className="order-notes">
          <Title level={2}><MessageOutlined /> Lời nhắn</Title>
          <TextArea
            placeholder="Lưu ý cho người bán..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </section>
      </StyledContent>

      <StyledFooter className="order-footer">
  <Button type="primary" size="large" onClick={placeOrder}>Đặt hàng</Button>
</StyledFooter>

    </StyledLayout>
  );
}

export default OrderPage;

