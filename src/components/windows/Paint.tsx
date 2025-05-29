
import React, { useState, useRef, useEffect } from 'react';
import { Palette, Brush, Square, Circle, Type, Eraser, Undo, Download, FileText } from 'lucide-react';

export const Paint = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('brush');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#800080', '#FFA500', '#A52A2A', '#808080'
  ];

  const tools = [
    { id: 'brush', name: 'Brush', icon: <Brush className="w-4 h-4" /> },
    { id: 'eraser', name: 'Eraser', icon: <Eraser className="w-4 h-4" /> },
    { id: 'rectangle', name: 'Rectangle', icon: <Square className="w-4 h-4" /> },
    { id: 'circle', name: 'Circle', icon: <Circle className="w-4 h-4" /> },
    { id: 'text', name: 'Text', icon: <Type className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPosition({ x, y });

    if (currentTool === 'brush' || currentTool === 'eraser') {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'my-painting.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Menu Bar */}
      <div className="bg-gray-300 border-b-2 border-gray-400 p-1">
        <div className="flex gap-4 text-sm">
          <span className="font-bold">File</span>
          <span className="font-bold">Edit</span>
          <span className="font-bold">View</span>
          <span className="font-bold">Image</span>
          <span className="font-bold">Options</span>
          <span className="font-bold">Help</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-300 border-b-2 border-gray-400 p-2 flex items-center gap-2">
        <button 
          onClick={() => clearCanvas()}
          className="px-2 py-1 bg-gray-200 border border-gray-600 hover:bg-gray-100 text-xs"
          title="New"
        >
          <FileText className="w-4 h-4" />
        </button>
        <button 
          onClick={saveImage}
          className="px-2 py-1 bg-gray-200 border border-gray-600 hover:bg-gray-100 text-xs"
          title="Save"
        >
          <Download className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-1"></div>
        <button className="px-2 py-1 bg-gray-200 border border-gray-600 hover:bg-gray-100 text-xs">
          <Undo className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Tool Panel */}
        <div className="w-16 bg-gray-300 border-r-2 border-gray-400 p-1">
          <div className="grid grid-cols-2 gap-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setCurrentTool(tool.id)}
                className={`p-2 border border-gray-600 hover:bg-gray-200 ${
                  currentTool === tool.id ? 'bg-gray-400' : 'bg-gray-300'
                }`}
                title={tool.name}
              >
                {tool.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Color Panel */}
        <div className="w-24 bg-gray-300 border-r-2 border-gray-400 p-2">
          <div className="mb-4">
            <div className="text-xs font-bold mb-2">Colors:</div>
            <div className="grid grid-cols-2 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className={`w-6 h-6 border-2 ${
                    currentColor === color ? 'border-black' : 'border-gray-600'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-xs font-bold mb-2">Size:</div>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-center">{brushSize}px</div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-4 bg-gray-200 overflow-auto">
          <div className="bg-white border-2 border-gray-600 inline-block">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="block cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-300 border-t-2 border-gray-400 p-1 text-xs">
        <div className="flex justify-between">
          <span>Tool: {tools.find(t => t.id === currentTool)?.name}</span>
          <span>Color: {currentColor}</span>
          <span>Size: {brushSize}px</span>
        </div>
      </div>
    </div>
  );
};
