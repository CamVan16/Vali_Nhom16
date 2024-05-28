import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;
const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/order/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/product/get/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  const handleViewDetails = async (order) => {
    const cartItemsWithDetails = await Promise.all(order.cartItems.map(async (item) => {
      const product = await fetchProduct(item.productId);
      const price = product ? product.price[item.size] : 0;
      const discountedPrice = price - (price * (product.discount / 100));
      return {
        ...item,
        productName: product ? product.name : 'Unknown',
        price: discountedPrice
      };
    }));

    setSelectedOrder({
      ...order,
      cartItems: cartItemsWithDetails
    });

    form.setFieldsValue({
      ...order,
    });
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleUpdateOrder = async (values) => {
    const updatedOrder = {
      ...selectedOrder,
      paymentStatus: values.paymentStatus,
      shippingStatus: values.shippingStatus,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/order/update/${selectedOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
      });
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      fetchOrders();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDelete = (orderId) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xoá hoá đơn?',
      onOk: async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/order/delete/${orderId}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Failed to delete order');
          }
          fetchOrders();
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      },
      onCancel() {
        console.log('Delete cancelled');
      },
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filtered = orders.filter(order =>
        order.id.includes(value) || order.userId.includes(value)
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  const calculateTotalRevenue = (orders) => {
    return orders.reduce((total, order) => total + order.orderTotal, 0);
  };

  const totalRevenue = calculateTotalRevenue(filteredOrders);
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'IDKH',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Tổng tiền sản phẩm',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Tổng tiền hoá đơn',
      dataIndex: 'orderTotal',
      key: 'orderTotal',
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
    },
    {
      title: 'Tạng thái vận chuyển',
      dataIndex: 'shippingStatus',
      key: 'shippingStatus',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleViewDetails(record)}>Xem chi tiết</Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>Xoá</Button>
        </span>
      ),
    },
  ];

  const cartItemColumns = [
    {
      title: 'ID sản phẩm',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Tìm kiếm theo ID hoá đơn hoặc ID khách hàng"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        onSearch={handleSearch}
        style={{ marginBottom: 20, width: 400 }}
      />
      <div style={{ marginBottom: 20, fontSize: 18 }}>
        <strong>Doanh thu: </strong>
        {totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
      </div>
      <Table columns={columns} dataSource={filteredOrders} rowKey="id" />

      <Modal
        title="Chi tiết hoá đơn"
        visible={visible}
        onCancel={handleCloseModal}
        width={800} 
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>,
        ]}
      >
        {selectedOrder && (
          <Form form={form} onFinish={handleUpdateOrder}>
            <Form.Item label="IDKH" name="userId">
              <Input disabled />
            </Form.Item>
            <Table 
              columns={cartItemColumns} 
              dataSource={selectedOrder.cartItems} 
              rowKey="productId" 
              pagination={false}
            />
            <Form.Item label="Tổng tiền sản phẩm" name="totalPrice">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Phí ship" name="shippingCost">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Tổng hoá đơn" name="orderTotal">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Phương thức vận chuyển" name="shippingMethod">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Phương thức thanh toán" name="paymentMethod">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="shippingAddress">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Ghi chú" name="notes">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Thời gian tạo" name="createdAt">
              <Input disabled value={new Date(selectedOrder.createdAt).toLocaleString()} />
            </Form.Item>
            <Form.Item label="Trạng thái thanh toán" name="paymentStatus">
              <Select>
                <Option value="Chưa thanh toán">Chưa thanh toán</Option>
                <Option value="Đã thanh toán">Đã thanh toán</Option>
                <Option value="Thanh toán thất bại">Thanh toán thất bại</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Trạng thái vận chuyển" name="shippingStatus">
              <Select>
                <Option value="Chưa nhận hàng">Chưa nhận hàng</Option>
                <Option value="Đang giao">Đang giao</Option>
                <Option value="Đã nhận hàng">Đã nhận hàng</Option>
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrder;




