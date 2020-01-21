import React, { useState } from 'react';

export default function PopupWrapper({ children, title, close }) {
  const [expand, setExpand] = useState(true);

  return (
    <div className="task">
      <div onClick={() => setExpand(!expand)} className="task-bar">
        <div>
          <span>{title}</span>
        </div>
        <div className="actions">
          <i className={`fas ${expand ? 'fa-chevron-down' : 'fa-window-minimize'}`}></i>
          <i className="fas fa-times" onClick={close}></i>
        </div>
      </div>
      {expand ?
        <div className="task-body">
         {children}
        </div>
      : null}
    </div>
  )
}
