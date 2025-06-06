import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";

// Sample data
const tools = ["Mood Tracker", "Journal", "Music Zone", "Mirror Room"];
const sampleImages = [
  "/assets/image1.jpeg",
  "/assets/image2.jpeg",
  "/assets/image3.jpeg",
  "/assets/image4.jpeg",
  "/assets/image5.jpeg"
];
const emojis = ["😀", "😍", "🎉", "🌟", "❤️", "🔥", "✨", "🎨"];

// Sidebar Item Component
const SidebarItem = ({ item, type }) => {    
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { ...item, itemType: type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const renderContent = () => {
    switch (type) {
      case ItemTypes.TOOL:
        return (
          <div style={{
            padding: "8px 12px",
            backgroundColor: "#fff",
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#333"
          }}>
            {item.name}
          </div>
        );
      case ItemTypes.IMAGE:
        return (
          <div style={{
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#fff"
          }}>
            <img
              src={item.src}
              alt={item.name}
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                display: "block"
              }}
            />
            <div style={{
              padding: "4px 8px",
              fontSize: "12px",
              color: "#666",
              textAlign: "center"
            }}>
              {item.name}
            </div>
          </div>
        );
      case ItemTypes.EMOJI:
        return (
          <div style={{
            padding: "12px",
            backgroundColor: "#fff",
            border: "2px solid #e0e0e0", 
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "24px"
          }}>
            {item.emoji}
          </div>
        );
      case ItemTypes.BUTTON:
        return (
          <button style={{
            padding: "8px 16px",
            backgroundColor: item.color,
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            width: "100%"
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
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        marginBottom: "12px",
        transition: "opacity 0.2s"
      }}
    >
      {renderContent()}
    </div>
  );
};

// Main Sidebar Component
const Sidebar = () => {
  const buttonItems = [
    { text: "Click Me", color: "#007bff" },
    { text: "Submit", color: "#28a745" },
    { text: "Cancel", color: "#dc3545" },
    { text: "Save", color: "#ffc107" }
  ];

  return (
    <div style={{
      width: "220px",
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRight: "2px solid #e0e0e0",
      height: "100vh",
      overflowY: "auto"
    }}>
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ 
          margin: "0 0 16px 0", 
          color: "#333", 
          fontSize: "18px",
          fontWeight: "600" 
        }}>
         Tools
        </h3>
        {tools.map((tool) => (
          <SidebarItem
            key={tool}
            item={{ name: tool }}
            type={ItemTypes.TOOL}
          />
        ))}
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ 
          margin: "0 0 16px 0", 
          color: "#333", 
          fontSize: "18px",
          fontWeight: "600" 
        }}>
         Images
        </h3>
        {sampleImages.map((src, index) => (
          <SidebarItem 
            key={src}
            item={{ name: `Image ${index + 1}`, src }}
            type={ItemTypes.IMAGE}
          />
        ))}
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ 
          margin: "0 0 16px 0", 
          color: "#333", 
          fontSize: "18px",
          fontWeight: "600" 
        }}>
         Emojis
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px"
        }}>
          {emojis.map((emoji) => (
            <SidebarItem
              key={emoji}
              item={{ emoji }}
              type={ItemTypes.EMOJI}
            />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ 
          margin: "0 0 16px 0", 
          color: "#333", 
          fontSize: "18px",
          fontWeight: "600" 
        }}>
         Buttons
        </h3>
        {buttonItems.map((button, index) => (
          <SidebarItem
            key={index}
            item={button}
            type={ItemTypes.BUTTON}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;    //The call will go to Sidebar from here