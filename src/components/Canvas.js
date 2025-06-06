import React, { useState, useEffect } from "react";
import axios from "axios"; // Add this
import { useDrop } from "react-dnd";
import { ItemTypes } from "../constants";
import DraggableCanvasItem from "./DraggableCanvasItem";

const GRID_SIZE = 20;

const Canvas = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  //  Load saved canvas items from MongoDB on mount
  useEffect(() => {
    axios.get("http://localhost:5000/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error loading canvas items", err));
  }, []);

  //  Save items to MongoDB
  const saveCanvas = () => {
    axios.post("http://localhost:5000/items", items)
      .then(() => alert("Canvas saved!"))
      .catch((err) => console.error("Error saving canvas", err));
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [
      ItemTypes.TOOL,
      ItemTypes.IMAGE,
      ItemTypes.EMOJI,
      ItemTypes.BUTTON,
      ItemTypes.PLACED_ITEM
    ],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = document.getElementById("canvas-area")?.getBoundingClientRect();
      if (!offset || !canvasRect) return;

      const left = Math.round((offset.x - canvasRect.left) / GRID_SIZE) * GRID_SIZE;
      const top = Math.round((offset.y - canvasRect.top) / GRID_SIZE) * GRID_SIZE;

      if (item.uid) {
        // Moving existing item
        moveItem(item.uid, left, top);
      } else {
        // Adding new item
        setItems((prev) => [
          ...prev,
          {
            ...item,
            uid: Date.now() + Math.random(),
            left,
            top,
          },
        ]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveItem = (uid, left, top) => {
    setItems((prev) =>
      prev.map((item) =>
        item.uid === uid ? { ...item, left, top } : item
      )
    );
  };

  const toggleSelection = (uid) => {
    setSelectedItems((prev) =>
      prev.includes(uid)
        ? prev.filter((id) => id !== uid)
        : [...prev, uid]
    );
  };

  const deleteSelected = () => {
    setItems((prev) => prev.filter((item) => !selectedItems.includes(item.uid)));
    setSelectedItems([]);
  };

  const clearCanvas = () => {
    setItems([]);
    setSelectedItems([]);
  };

  return (
    <div
      id="canvas-area"
      ref={drop}
      onClick={() => setSelectedItems([])}
      style={{
        position: "relative",
        flex: 1,
        height: "100vh",
        backgroundColor: isOver ? "#f0faff" : "#ffffff",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        overflow: "hidden",
        transition: "background-color 0.2s"
      }}
    >
      {/* 🛠️ Toolbar */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 999,
        display: "flex",
        gap: "10px"
      }}>
        <button
          onClick={saveCanvas}
          disabled={items.length === 0}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: items.length > 0 ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
           Save
        </button>
        <button
          onClick={deleteSelected}
          disabled={selectedItems.length === 0}
          style={{
            padding: "8px 16px",
            backgroundColor: selectedItems.length > 0 ? "#dc3545" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: selectedItems.length > 0 ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          Delete Selected ({selectedItems.length})
        </button>
        <button
          onClick={clearCanvas}
          disabled={items.length === 0}
          style={{
            padding: "8px 16px",
            backgroundColor: items.length > 0 ? "#28a745" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: items.length > 0 ? "pointer" : "not-allowed",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          Clear All
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#666",
          fontSize: "18px"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎨</div>
          <div>Drag items from the sidebar to start creating!</div>
        </div>
      )}

      {/* Render Items */}
      {items.map((item) => (
        <DraggableCanvasItem
          key={item.uid}
          item={item}
          onMove={moveItem}
          onSelect={toggleSelection}
          isSelected={selectedItems.includes(item.uid)}
        />
      ))}
    </div>
  );
};

export default Canvas;
