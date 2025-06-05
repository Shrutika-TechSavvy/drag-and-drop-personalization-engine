// Feature: Move Items After Placement
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../constants";

const DraggableCanvasItem = ({ item, onMove, onDelete, isSelected, onSelect }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.PLACED_TOOL,
    item: { id: item.uid, left: item.left, top: item.top },
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PLACED_TOOL,
    hover: (draggedItem, monitor) => {
      if (draggedItem.id !== item.uid) return;

      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;

      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      onMove(item.uid, left, top);
      draggedItem.left = left;
      draggedItem.top = top;
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={(e) => {
        e.stopPropagation(); // Prevent canvas click
        onSelect(item.uid);
      }}
      style={{
        position: "absolute",
        left: item.left,
        top: item.top,
        padding: "10px",
        backgroundColor: isSelected ? "#aed581" : "#e1f5fe", // Highlight if selected
        border: "1px solid #81d4fa",
        borderRadius: "4px",
        cursor: "move",
        userSelect: "none",
      }}
      title="Click to select, drag to move"
    >
      {item.name}
    </div>
  );
};

export default DraggableCanvasItem;
