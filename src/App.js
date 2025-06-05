import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <Canvas />
    </div>
  );
}

export default App;

