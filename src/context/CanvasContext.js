import { createContext, useContext, useState } from 'react';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [canvasItems, setCanvasItems] = useState([]);

  const addItem = (item) => {
    if (!canvasItems.find(i => i.type === item.type)) {
      setCanvasItems([...canvasItems, { ...item, id: Date.now() }]);
    }
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const updated = [...canvasItems];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, dragged);
    setCanvasItems(updated);
  };

  const removeItem = (id) => {
    setCanvasItems(items => items.filter(item => item.id !== id));
  };

  return (
    <CanvasContext.Provider value={{ canvasItems, addItem, moveItem, removeItem }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
