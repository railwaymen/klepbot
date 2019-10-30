import React from 'react';

export default function CardDetails({ card: { metadata, phone_numbers, websites } }) {
  return (
    <div>
      <p>Phone numbers: {phone_numbers}</p>
      <p>Websites: {websites}</p>
      <p>Metadata: {metadata}</p>
    </div>
  )
}
