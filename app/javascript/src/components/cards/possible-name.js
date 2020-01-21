import React from 'react';

export default function PossibleName ({ name, onNameSelect }) {
  const onSelect = () => {
    const splittedName = name.split(' ');

    onNameSelect({
      firstName: splittedName[0],
      lastName: splittedName[1]
    });
  }

  return (
    <div onClick={onSelect}>
      <a href="javascript:void(0)">{name}</a>
    </div>
  )
}
