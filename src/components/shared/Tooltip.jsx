import React, { useState } from "react";

const Tooltip = ({ children, text, className = "" }) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseMove={(e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      }}
    >
      {children}
      {show && text && (
        <div
          className="fixed z-[9999] w-fit text-wrap max-w-lg rounded-lg bg-gray-800 px-3 py-1 text-sm text-white shadow-lg pointer-events-none"
          style={{
            top: position.y - 10,
            left: position.x + 10,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
