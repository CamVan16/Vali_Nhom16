import React from 'react'
import { Select} from 'antd';

const Category = ({ onCategoryChange }) => {
    const handleChange = (value) => {
        onCategoryChange(value);
      };
  return (
    <div>
      <Select
      defaultValue="Tất cả"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
            value: 'Tất cả',
            label: 'Tất cả',
        },
        {
          value: 'Vali khoá khung',
          label: 'Vali khoá khung',
        },
        {
          value: 'Vali nhựa dẻo',
          label: 'Vali nhựa dẻo',
        },
        {
          value: 'Vali nhựa cứng',
          label: 'Vali nhựa cứng',
        },
        {
          value: 'Vali kéo chống rạch',
          label: 'Vali kéo chống rạch',
        },
        {
            value: 'Vali kéo vải',
            label: 'Vali kéo vải',
        },
      ]}
    />
    </div>
  )
}

export default Category
