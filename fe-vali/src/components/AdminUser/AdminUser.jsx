import React, { useState, useEffect} from 'react';
import { Table, Modal, Form, Input, message, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [form] = Form.useForm();
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchText, users]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/user/getall');
      const data = await response.json();
      const processedData = data.map(user => ({
        ...user,
        address: user.address || [],
      }));
      setUsers(processedData);
      setTotalUsers(processedData.length);
      setFilteredUsers(processedData);
    } catch (error) {
      console.error(error);
    }
  };

  const filterUsers = () => {
    let filtered = users;
    if (searchText) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.mobile.toString().includes(searchText) ||
        (user.addresses && user.addresses.length > 0 && user.addresses[0].address.toLowerCase().includes(searchText.toLowerCase())) ||
        user._id.includes(searchText)
      );
    }
    setFilteredUsers(filtered);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (userId) => {
    setDeleteUserId(userId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/v1/user/delete/${deleteUserId}`, {
        method: 'DELETE',
      });
      fetchUserData();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const handleCancel = () => {
    setUpdateModalVisible(false);
    setDeleteModalVisible(false);
    setDeleteUserId(null);
  };

  const showModal = (user) => {
    setUpdateModalVisible(true);
    setUserData(user);
    form.setFieldsValue({
      ...user,
      address: user.addresses && user.addresses.length > 0 ? user.addresses[0].address : '',
    });
  };

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      const updatedAddresses = [...userData.addresses];
      if (updatedAddresses.length > 0) {
        updatedAddresses[0].address = values.address;
      } else {
        updatedAddresses.push({ address: values.address });
      }

      const updatedUser = {
        ...userData,
        username: values.username,
        email: values.email,
        mobile: values.mobile,
        addresses: updatedAddresses,
      };

      const response = await fetch(`http://localhost:8080/api/v1/user/update/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      if (data._id) {
        setUpdateModalVisible(false);
        fetchUserData();
      } else {
        message.error('Failed to update user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (mobile) => mobile.toString().replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'addresses',
      key: 'addresses',
      render: (addresses) =>
        addresses && addresses.length > 0
          ? addresses[0].address
          : 'No address available',
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <EditOutlined style={{ color: '#00a86b', fontSize: '30px', cursor: 'pointer' }} onClick={() => showModal(record)} />
          <DeleteOutlined style={{ marginLeft: 8, color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={() => handleDelete(record._id)} />
        </span>
      ),
    },
  ];

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Tìm kiếm theo ID, tên, email, số điện thoại hoặc địa chỉ"
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 20, width: 400 }}
          />
        </Col>
      </Row>
      <div style={{ marginBottom: 20, fontSize: 18 }}>
        <strong>Tổng số lượng người dùng: {totalUsers}</strong>
      </div>
      <Table columns={columns} dataSource={filteredUsers} rowKey="_id" />
      <Modal
        title="Cập nhật thông tin"
        open={updateModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Nhập tên người dùng' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Nhập email' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: 'Nhập số điện thoại' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, mobile: e.target.value })} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Nhập địa chỉ' }]}
          >
            <Input onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa người dùng này không?</p>
      </Modal>
    </div>
  );
};

export default AdminUser;
