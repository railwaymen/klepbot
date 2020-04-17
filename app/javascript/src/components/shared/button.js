import React from 'react';

export default function GradientButton({ children, onClick }) {
  return (
    <div className="gradient-button" onClick={onClick}>
      {children}
    </div>
  )
}
