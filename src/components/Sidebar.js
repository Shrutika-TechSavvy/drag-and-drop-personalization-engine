import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";

const tools = ["Mood Tracker", "Journal", "Music Zone", "Mirror Room"];

const SidebarItem = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({   //Drag source
    type: ItemTypes.TOOL,
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        marginBottom: "10px",
        padding: "8px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px"
      }}
    >
      {name}
    </div>
  );
};

const Sidebar = () => (
  <div style={{ width: "200px", background: "#f0f0f0", padding: "20px" }}>
    <h3>Toolkit</h3>
    {tools.map((tool) => (
      <SidebarItem key={tool} name={tool} />
    ))}
  </div>
);

export default Sidebar;
