import React from 'react';
import { Select } from 'antd';

const SortPrice = ({ onPriceChange }) => {
  const handleChange = (value) => {
    onPriceChange(value);
  };

  return (
    <div>
      <Select
        defaultValue="Tất cả"
        style={{
          width: 180,
        }}
        onChange={handleChange}
        options={[
          {
            value: 'Tất cả',
            label: 'Tất cả',
          },
          {
            value: 'Dưới 3 triệu',
            label: 'Dưới 3 triệu',
          },
          {
            value: 'Từ 3 đến 5 triệu',
            label: 'Từ 3 đến 5 triệu',
          },
          {
            value: 'Từ 5 đến 10 triệu',
            label: 'Từ 5 đến 10 triệu',
          },
          {
            value: 'Trên 10 triệu',
            label: 'Trên 10 triệu',
          },
        ]}
      />
    </div>
  );
}

export default SortPrice;
