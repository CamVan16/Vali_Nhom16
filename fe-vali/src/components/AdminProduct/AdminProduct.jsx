import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Row, Col } from 'antd';

const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('');
  const [form] = Form.useForm();

  const sizes = ['S', 'M', 'L'];
  const [colorStocks, setColorStocks] = useState([]);
  const [colorImages, setColorImages] = useState([]);
  const [price, setPrice] = useState({ S: '', M: '', L: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchText, filterType, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/product/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    if (searchText) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.id.includes(searchText)
      );
    }
    if (filterType) {
      filtered = filtered.filter(product => product.type === filterType);
    }
    setFilteredProducts(filtered);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    form.setFieldsValue({
      ...product,
      ...product.description,
      priceS: product.price.S,
      priceM: product.price.M,
      priceL: product.price.L,
    });

    const stocks = Object.entries(product.stock).map(([color, sizes]) => ({
      color,
      ...sizes,
    }));

    const images = Object.entries(product.img).map(([color, url]) => ({
      color,
      url,
    }));

    setColorStocks(stocks);
    setColorImages(images);
    setPrice(product.price);
    setIsEditing(true);
    setVisible(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    form.resetFields();
    setColorStocks([]);
    setColorImages([]);
    setPrice({ S: '', M: '', L: '' });
    setIsEditing(false);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSaveProduct = async (values) => {
    const updatedProduct = {
      ...selectedProduct,
      name: values.name,
      type: values.type,
      discount: parseInt(values.discount, 10),
      img: colorImages.reduce((acc, { color, url }) => {
        acc[color] = url;
        return acc;
      }, {}),
      price: {
        S: parseFloat(values.priceS),
        M: parseFloat(values.priceM),
        L: parseFloat(values.priceL),
      },
      stock: colorStocks.reduce((acc, { color, ...sizes }) => {
        acc[color] = sizes;
        return acc;
      }, {}),
      description: {
        branch: values.branch,
        material: values.material,
        weight: values.weight,
        size: values.size,
        volume: values.volume,
        wheel: values.wheel,
        key: values.key,
        warranty: values.warranty,
      },
    };

    try {
      const response = isEditing
        ? await fetch(`http://localhost:8080/api/v1/product/update/${selectedProduct.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
          })
        : await fetch(`http://localhost:8080/api/v1/product/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
          });

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update product' : 'Failed to add product');
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  const handleDelete = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      onOk: async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/product/delete/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
          fetchProducts();
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleColorChange = (index, key, value) => {
    const newColorStocks = [...colorStocks];
    newColorStocks[index][key] = value;
    setColorStocks(newColorStocks);
  };

  const handleImageChange = (index, key, value) => {
    const newColorImages = [...colorImages];
    newColorImages[index][key] = value;
    setColorImages(newColorImages);
  };

  const handleAddStockRow = () => {
    setColorStocks([...colorStocks, { color: '', S: '', M: '', L: '' }]);
  };

  const handleAddImageRow = () => {
    setColorImages([...colorImages, { color: '', url: '' }]);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
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

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Search
            placeholder="Tìm kiếm theo ID hoặc tên"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 20, width: 400 }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Lọc theo kiểu"
            value={filterType}
            onChange={(value) => setFilterType(value)}
            style={{ width: 200 }}
          >
            <Option value="">Tất cả</Option>
            <Option value="Vali khoá khung">Vali khoá khung</Option>
            <Option value="Vali nhựa dẻo">Vali nhựa dẻo</Option>
            <Option value="Vali nhựa cứng">Vali nhựa cứng</Option>
            <Option value="Vali kéo chống rạch">Vali kéo chống rạch</Option>
            <Option value="Vali kéo vải">Vali kéo vải</Option>
          </Select>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddProduct}>Thêm</Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filteredProducts} rowKey="id" />

      <Modal
        title={isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        visible={visible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleSaveProduct}>
          <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Hãy nhập tên sản phẩm' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Loại sản phẩm" name="type" rules={[{ required: true, message: 'Hãy nhập loại sản phẩm' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Giảm giá" name="discount" rules={[{ required: true, message: 'Hãy nhập giảm giá' }]}>
            <Input type="number" step="1" />
          </Form.Item>

          <h3>Giá:</h3>
          <Form.Item label="Giá (S)" name="priceS" rules={[{ required: true, message: 'Hãy nhập giá của size S' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Giá (M)" name="priceM" rules={[{ required: true, message: 'Hãy nhập giá của size M' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Giá (L)" name="priceL" rules={[{ required: true, message: 'Hãy nhập giá của size L' }]}>
            <Input type="number" />
          </Form.Item>

          <h3>Tồn kho:</h3>
          {colorStocks.map((stock, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <Input
                placeholder="Màu sắc"
                value={stock.color}
                onChange={(e) => handleColorChange(index, 'color', e.target.value)}
                style={{ width: '20%', marginRight: 8 }}
              />
              {sizes.map(size => (
                <Input
                  key={size}
                  placeholder={`Tồn kho ${size}`}
                  value={stock[size]}
                  onChange={(e) => handleColorChange(index, size, e.target.value)}
                  style={{ width: '15%', marginRight: 8 }}
                />
              ))}
            </div>
          ))}
          <Button type="dashed" onClick={handleAddStockRow}>
            Thêm
          </Button>

          <h3>Hình ảnh:</h3>
          {colorImages.map((image, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <Input
                placeholder="Màu sắc"
                value={image.color}
                onChange={(e) => handleImageChange(index, 'color', e.target.value)}
                style={{ width: '20%', marginRight: 8 }}
              />
              <Input
                placeholder="URL hình ảnh"
                value={image.url}
                onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                style={{ width: '75%' }}
              />
            </div>
          ))}
          <Button type="dashed" onClick={handleAddImageRow}>
            Thêm
          </Button>

          <h3>Mô tả:</h3>
          <Form.Item label="Thương hiệu" name="branch">
            <Input />
          </Form.Item>
          <Form.Item label="Chất liệu" name="material">
            <Input />
          </Form.Item>
          <Form.Item label="Trọng lượng" name="weight">
            <Input />
          </Form.Item>
          <Form.Item label="Kích thước" name="size">
            <Input />
          </Form.Item>
          <Form.Item label="Thể tích" name="volume">
            <Input />
          </Form.Item>
          <Form.Item label="Bánh xe" name="wheel">
            <Input />
          </Form.Item>
          <Form.Item label="Khoá" name="key">
            <Input />
          </Form.Item>
          <Form.Item label="Bảo hành" name="warranty">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;

