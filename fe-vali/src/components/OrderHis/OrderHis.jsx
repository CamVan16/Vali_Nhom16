import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, List, Typography, Space, Row, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const userId = localStorage.getItem('userID');
  const navigate = useNavigate();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'cartItems',
      key: 'cartItems',
      render: (cartItems) => (
        <span>
          {cartItems.map((item) => (
            <div key={item.id}>
              <a onClick={() => navigate(`/ProductDetail/${item.productId}`)}>
                {productDetails[item.productId]?.name || item.productId}
              </a>
            </div>
          ))}
        </span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'orderTotal',
      key: 'orderTotal',
      render: (orderTotal) => orderTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VND'),
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Trạng thái giao hàng',
      dataIndex: 'shippingStatus',
      key: 'shippingStatus',
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Button type="primary" size="small" onClick={() => handleOpenModal(record)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchOrderHistory();
  }, [userId]);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/order/orderHis/${userId}`);
      const data = await response.json();
      setOrderHistory(data);
      fetchProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const fetchProductDetails = async (orders) => {
    const details = {};
    const uniqueProductIds = new Set();

    orders.forEach(order => {
      order.cartItems.forEach(item => {
        uniqueProductIds.add(item.productId);
      });
    });

    for (const productId of uniqueProductIds) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/product/get/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          details[productId] = productData;
        } else {
          throw new Error(`Failed to fetch details for product ID ${productId}`);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    setProductDetails(details);
  };

  const handleOpenModal = (record) => {
    setSelectedOrder(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h1>Lịch sử mua hàng</h1>
      <Table columns={columns} dataSource={orderHistory} loading={loading} rowKey="id" />

      <Modal
        title={`Chi tiết đơn hàng #${selectedOrder?.id}`}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
      >
        {selectedOrder && (
          <div>
            <List
              itemLayout="vertical"
              dataSource={[selectedOrder.shippingAddress]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Typography.Title level={5}>Địa chỉ giao hàng</Typography.Title>}
                  />
                  <Space direction="vertical">
                    <Row gutter={[16, 16]}>
                      <Col span={24}>{item}</Col>
                    </Row>
                  </Space>
                </List.Item>
              )}
            />
            <Typography.Title level={5}>Danh sách sản phẩm</Typography.Title>
            <List
              itemLayout="horizontal"
              dataSource={selectedOrder.cartItems}
              renderItem={(item) => {
                const product = productDetails[item.productId];
                if (!product) return null;

                return (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Image src={product.img[item.color]} alt={product.name} width={50} />}
                      title={<a onClick={() => navigate(`/ProductDetail/${item.productId}`)}>{product.name}</a>}
                    />
                    <Space direction="vertical">
                      <p>Màu sắc: {item.color}</p>
                      <p>Kích cỡ: {item.size}</p>
                      <p>Số lượng: {item.quantity}</p>
                    </Space>
                  </List.Item>
                );
              }}
            />

            <List
              itemLayout="vertical"
              dataSource={[{ title: 'Thông tin thanh toán' }]}
              renderItem={(item) => (
                <List.Item key={item.title} style={{ borderBottom: '1px solid #ddd' }}>
                  <List.Item.Meta title={item.title} />
                  <Space direction="vertical">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>Phương thức thanh toán:</Col>
                      <Col span={12}>{selectedOrder.paymentMethod}</Col>
                      <Col span={12}>Tổng tiền sản phẩm:</Col>
                      <Col span={12}>{selectedOrder.totalPrice.toLocaleString()} VND</Col>
                      <Col span={12}>Phí vận chuyển:</Col>
                      <Col span={12}>{selectedOrder.shippingCost.toLocaleString()} VND</Col>
                      <Col span={12}>Tổng giá trị đơn hàng:</Col>
                      <Col span={12}>{selectedOrder.orderTotal.toLocaleString()} VND</Col>
                      <Col span={12}>Trạng thái thanh toán:</Col>
                      <Col span={12}>{selectedOrder.paymentStatus}</Col>
                      <Col span={12}>Trạng thái giao hàng:</Col>
                      <Col span={12}>{selectedOrder.shippingStatus}</Col>
                    </Row>
                  </Space>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderHistory;
