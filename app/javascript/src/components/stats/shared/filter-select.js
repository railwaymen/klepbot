import React, { useState } from 'react';

export default function FilterSelect({ name, onFilterChange, children }) {
  const [selected, setSelected] = useState(null);

  const onChange = ({ target: { value } }) => {
    setSelected(value);

    onFilterChange({
      [name]: value
    })
  }

  return (
    <select name={name} className="custom-select" onChange={onChange} selected={selected}>
      <option value="">All</option>
      {children}
    </select>
  )
}
