import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";

const DraggableCanvasItem = ({ item, onMove, onSelect, isSelected }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLACED_ITEM,
    item: { uid: item.uid },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const renderContent = () => {
    switch (item.itemType) {
      case ItemTypes.TOOL:
        return (
          <div style={{
            padding: "12px 16px",
            backgroundColor: "#fff",
            border: `3px solid ${isSelected ? "#007bff" : "#e0e0e0"}`,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            boxShadow: isSelected ? "0 0 0 2px rgba(0,123,255,0.25)" : "0 2px 4px rgba(0,0,0,0.1)",
            minWidth: "120px",
            textAlign: "center"
          }}>
            {item.name}
          </div>
        );
      case ItemTypes.IMAGE:
        return (
          <div style={{
            border: `3px solid ${isSelected ? "#007bff" : "#e0e0e0"}`,
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: isSelected ? "0 0 0 2px rgba(0,123,255,0.25)" : "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <img
              src={item.src}
              alt={item.name}
              style={{
                width: "120px",
                height: "100px",
                objectFit: "cover",
                display: "block"
              }}
            />
          </div>
        );
      case ItemTypes.EMOJI:
        return (
          <div style={{
            padding: "16px",
            backgroundColor: "#fff",
            border: `3px solid ${isSelected ? "#007bff" : "#e0e0e0"}`,
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "32px",
            boxShadow: isSelected ? "0 0 0 2px rgba(0,123,255,0.25)" : "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            {item.emoji}
          </div>
        );
      case ItemTypes.BUTTON:
        return (
          <button style={{
            padding: "12px 20px",
            backgroundColor: item.color,
            color: "white",
            border: `3px solid ${isSelected ? "#007bff" : "transparent"}`,
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: isSelected ? "0 0 0 2px rgba(0,123,255,0.25)" : "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            {item.text}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={drag}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.uid);
      }}
      style={{
        position: "absolute",
        left: item.left,
        top: item.top,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.8 : 1,
        zIndex: isSelected ? 10 : 1
      }}
    >
      {renderContent()}
    </div>
  );
};

export default DraggableCanvasItem;