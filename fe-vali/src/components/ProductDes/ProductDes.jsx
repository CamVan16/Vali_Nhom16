import React from 'react';

const ProductDes = ({ description }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '5px' }}>
      <tbody>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Thương hiệu</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.branch}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Chất liệu</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.material}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Trọng lượng</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.weight}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Kích thước</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.size}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Thể tích</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.volume}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Bánh xe</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.wheel}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Khoá</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.key}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Bảo hành</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{description.warranty}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductDes;
