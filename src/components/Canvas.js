// Canvas.js
// Features: Free Placement, Move Items, Multi-Select, Snap-to-Grid, Save State
import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import DraggableCanvasItem from "./DraggableCanvasItem";

const GRID_SIZE = 20; // Feature: Snap-to-grid 

const Canvas = () => {
  const [items, setItems] = useState(() => {
    // Feature: Save State
    const saved = localStorage.getItem("canvas-items");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedItems, setSelectedItems] = useState([]);

  // Feature: Save State
  useEffect(() => {
    localStorage.setItem("canvas-items", JSON.stringify(items));
  }, [items]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.TOOL, ItemTypes.PLACED_TOOL],
    drop: (item, monitor) => {
      if (item.type === ItemTypes.PLACED_TOOL) return;

      const offset = monitor.getClientOffset();
      const canvasRect = document.getElementById("canvas-area")?.getBoundingClientRect();
      if (!offset || !canvasRect) return;

      const left = Math.round((offset.x - canvasRect.left) / GRID_SIZE) * GRID_SIZE; // Snap
      const top = Math.round((offset.y - canvasRect.top) / GRID_SIZE) * GRID_SIZE;   // Snap

      setItems((prev) => [
        ...prev,
        {
          ...item,
          uid: Date.now(),
          left,
          top,
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Feature: Move Items After Placement
  const moveItem = (uid, left, top) => {
    setItems((prev) =>
      prev.map((item) =>
        item.uid === uid ? { ...item, left, top } : item
      )
    );
  };

  // Feature: Multi-select
  const toggleSelection = (uid) => {
    setSelectedItems((prev) =>
      prev.includes(uid)
        ? prev.filter((id) => id !== uid)
        : [...prev, uid]
    );
  };

  // Feature: Delete selected
  const deleteSelected = () => {
    setItems((prev) => prev.filter((item) => !selectedItems.includes(item.uid)));
    setSelectedItems([]);
  };

  return (
    <div
      id="canvas-area"
      ref={drop}
      onClick={() => setSelectedItems([])} // Deselect all on canvas click
      style={{
        position: "relative",
        flex: 1,
        height: "100vh",
        borderLeft: "2px dashed #ccc",
        backgroundColor: isOver ? "#f0faff" : "#fff",
        overflow: "hidden",
      }}
    >
      <button
        onClick={deleteSelected}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 999,
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Delete Selected
      </button>

      {items.map((item) => (
        <DraggableCanvasItem
          key={item.uid}
          item={item}
          onMove={moveItem} // Move feature
          onDelete={() => {}} // Already handled in multi-select
          isSelected={selectedItems.includes(item.uid)}
          onSelect={toggleSelection}
        />
      ))}
    </div>
  );
};

export default Canvas;
