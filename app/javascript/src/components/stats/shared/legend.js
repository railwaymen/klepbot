import React from 'react';

export default function Legend({ data, width = 24, height = 24, onSelect }) {
  const onSelectItem = (item) => {
    if (!onSelect) return;

    onSelect(item)
  }

  const boxStyle = {
    width,
    height,
  }

  return (
    <div className="legend">
      {data.map(stats => (
        <div onClick={() => onSelectItem(stats)} key={`legend-${stats.id}`} className="legend-row">
          <span className="color-box" style={{backgroundColor: stats.color, ...boxStyle}}></span>
          <span>{stats.name}</span>
        </div>
      ))}
    </div>
  )
}