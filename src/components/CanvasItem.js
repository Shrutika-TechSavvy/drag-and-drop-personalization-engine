// src/components/CanvasItem.js
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useCanvas } from '../context/CanvasContext';

const CanvasItem = ({ item, index }) => {
  const ref = useRef(null);
  const { moveItem, removeItem } = useCanvas();

  const [, drop] = useDrop({
    accept: 'canvasItem',
    hover(dragged) {
      if (dragged.index === index) return;
      moveItem(dragged.index, index);
      dragged.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'canvasItem',
    item: { ...item, index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: 10,
        background: '#fff',
        marginBottom: 10,
        boxShadow: '0 0 3px rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {item.type}
      <button onClick={() => removeItem(item.id)}>✖</button>
    </div>
  );
};

export default CanvasItem;
