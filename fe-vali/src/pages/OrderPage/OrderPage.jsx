import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Typography, Divider, Space, message, Radio} from 'antd';
import { HomeOutlined, ShoppingCartOutlined, CreditCardOutlined, MessageOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledLayout, StyledContent, StyledTable } from './style';
const { Title, Text } = Typography;
const { TextArea } = Input;

const OrderPage = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: '', address: '', mobile: '' });
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const location = useLocation();
  const { selectedItems } = location.state;
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('Nhanh');
  const [shippingCost, setShippingCost] = useState(100000);
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID');
  const [orderSuccessPopupVisible, setOrderSuccessPopupVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/user/getById/${userID}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUser(data);
        if (data.addresses && data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } catch (error) {
        console.error('Fetch user failed:', error);
      }
    };

    if (userID) fetchUser();
  }, [userID]);

  const handleAddAddress = async () => {
    try {
      if (!newAddress.name || !newAddress.address || !newAddress.mobile) {
        return;
      }

      const response = await fetch(`http://localhost:8080/api/v1/user/addAddress/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress),
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const updatedUser = await response.json();
      setUser(updatedUser);
      setSelectedAddress(updatedUser.addresses[updatedUser.addresses.length - 1]);
      setModalVisible(false);
      setNewAddress({ name: '', address: '', mobile: '' });
    } catch (error) {
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

  const clearSelectedItems = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/cart/${userID}/removeItems`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedItems.map(item => item.id)),
      });
      if (!response.ok) throw new Error('Failed to clear selected items');
    } catch (error) {
      console.error('Failed to clear selected items:', error);
    }
  };

  const placeOrder = async () => {
    try {
      const shippingStatus = 'Chưa nhận hàng';
      const orderTotal = calculateTotalPrice() + shippingCost;

      const orderData = {
        userId: userID,
        cartItems: selectedItems,
        totalPrice: calculateTotalPrice(),
        shippingCost: shippingCost,
        orderTotal: orderTotal,
        shippingMethod: shippingMethod,
        paymentMethod: paymentMethod,
        shippingAddress: user ? `${selectedAddress.name} - ${selectedAddress.address} - ${selectedAddress.mobile}` : 'Loading...',
        notes: notes,
        shippingStatus: shippingStatus,
        paymentStatus: paymentMethod === 'Thanh toán khi nhận hàng' ? 'Chưa thanh toán' : 'Chờ thanh toán',
      };
      if (paymentMethod === 'Thanh toán qua VNPAY') {
        const response = await fetch(`http://localhost:8080/api/v1/order/createVNPAYOrder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const createdOrder = await response.json();
        // await clearSelectedItems();
        const paymentResponse = await fetch(`http://localhost:8080/api/v1/payment/create?amount=${orderTotal}&orderId=${createdOrder.id}`);
        if (!paymentResponse.ok) throw new Error('Failed to create payment URL');

        const paymentData = await paymentResponse.json();
        window.location.href = paymentData.paymentUrl;
        await clearSelectedItems();
      } else {
        const response = await fetch(`http://localhost:8080/api/v1/order/save`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        setOrderSuccessPopupVisible(true);
        setTimeout(async () => {
          await clearSelectedItems();
          setOrderSuccessPopupVisible(false);
          navigate("/CartProductPage");
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };
  const handleVNPayReturn = async (params) => {
    const orderId = params.get('orderId');
    const vnpayResponseCode = params.get('vnp_ResponseCode');

    if (orderId && vnpayResponseCode === '00') {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/payment/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(params)),
        });

        if (!response.ok) throw new Error('Failed to confirm payment');
        navigate("/CartProductPage");
      } catch (error) {
        console.error('Failed to confirm payment:', error);
      }
    } else {
      message.error('VNPay payment failed');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('vnp_ResponseCode')) {
      handleVNPayReturn(params);
    }
  }, []);

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
    <StyledLayout>
      <StyledContent>
        <Divider orientation="left">
          <Title level={4}><HomeOutlined /> Địa chỉ nhận hàng</Title>
        </Divider>
        {renderSelectedAddress()}
        <Button type="primary" onClick={() => setModalVisible(true)}>Thay đổi địa chỉ</Button>

        <Divider orientation="left">
          <Title level={4}><ShoppingCartOutlined /> Sản phẩm</Title>
        </Divider>
        <StyledTable dataSource={dataSource} columns={columns} pagination={false} />

        <Divider orientation="left">
          <Title level={4}><CreditCardOutlined /> Phương thức vận chuyển</Title>
        </Divider>
        <Radio.Group onChange={handleShippingChange} value={shippingMethod}>
          <Space direction="vertical">
            <Radio value="Nhanh">Giao hàng nhanh (100,000 VND)</Radio>
            <Radio value="Cham">Giao hàng tiêu chuẩn (70,000 VND)</Radio>
          </Space>
        </Radio.Group>

        <Divider orientation="left">
          <Title level={4}><CreditCardOutlined /> Phương thức thanh toán</Title>
        </Divider>
        <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
          <Space direction="vertical">
            <Radio value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</Radio>
            <Radio value="Thanh toán qua VNPAY">Thanh toán qua VNPAY</Radio>
          </Space>
        </Radio.Group>

        <Divider orientation="left">
          <Title level={4}><MessageOutlined /> Ghi chú</Title>
        </Divider>
        <TextArea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />

        <Divider />
        <Title level={4}>Tổng thanh toán: {(calculateTotalPrice() + shippingCost).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Title>
        <Button type="primary" onClick={placeOrder}>Đặt hàng</Button>

        <Modal
          title="Thay đổi địa chỉ"
          visible={modalVisible}
          onOk={handleAddAddress}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          {!showAddAddressForm ? (
            <>
              <Radio.Group onChange={e => setSelectedAddress(e.target.value)} value={selectedAddress}>
                <Space direction="vertical">
                  {user?.addresses.map(address => (
                    <Radio key={address._id} value={address}>
                      <div>
                        <Text>{address.name} ({address.mobile})</Text>
                        <Text>{address.address}</Text>
                      </div>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
              <Button type="link" onClick={() => setShowAddAddressForm(true)}>Thêm địa chỉ mới</Button>
              <Button type="primary" onClick={() => setModalVisible(false)}>Xác nhận</Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Tên người nhận"
                value={newAddress.name}
                onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <Input
                placeholder="Địa chỉ"
                value={newAddress.address}
                onChange={e => setNewAddress({ ...newAddress, address: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <Input
                placeholder="Số điện thoại"
                value={newAddress.mobile}
                onChange={e => setNewAddress({ ...newAddress, mobile: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleAddAddress}>Lưu</Button>
              <Button type="link" onClick={() => setShowAddAddressForm(false)}>Quay lại</Button>
            </>
          )}
        </Modal>
        <Modal
          title="Thông báo"
          visible={orderSuccessPopupVisible}
          footer={null}
          closable={true}
        >
          <p>Đặt hàng thành công!</p>
        </Modal>

      </StyledContent>
    </StyledLayout>
  );
};

export default OrderPage;
