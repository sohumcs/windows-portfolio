
import React, { useState } from 'react';
import { Trash2, RotateCcw, X, AlertTriangle } from 'lucide-react';

export const RecycleBin = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'old_portfolio_v1.zip', type: 'Archive', dateDeleted: '2024-01-15', size: '2.4 MB' },
    { id: 2, name: 'buggy_feature.js', type: 'JavaScript File', dateDeleted: '2024-01-10', size: '156 KB' },
    { id: 3, name: 'unused_dependencies.json', type: 'JSON File', dateDeleted: '2024-01-08', size: '45 KB' },
    { id: 4, name: 'legacy_code.old', type: 'Old File', dateDeleted: '2024-01-05', size: '1.2 MB' },
    { id: 5, name: 'my_mistakes.txt', type: 'Text Document', dateDeleted: '2024-01-01', size: '∞ bytes' }
  ]);

  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const restoreItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const deleteForever = (id: number) => {
    if (id === 5) { // Easter egg for "my_mistakes.txt"
      setShowEasterEgg(true);
    } else {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const emptyRecycleBin = () => {
    setItems([]);
  };

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="bg-gray-100 border-b p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-800">Recycle Bin</span>
          <span className="text-sm text-gray-500">({items.length} items)</span>
        </div>
        {items.length > 0 && (
          <button
            onClick={emptyRecycleBin}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
          >
            Empty Recycle Bin
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <Trash2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-gray-600 mb-2">Recycle Bin is empty</h2>
            <p className="text-gray-500">Deleted items will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <div className="text-sm text-gray-500">
                      {item.type} • {item.size} • Deleted {item.dateDeleted}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => restoreItem(item.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Restore"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteForever(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete Forever"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error 404</h2>
            <p className="text-gray-600 mb-4">
              Cannot delete "my_mistakes.txt" - This file is essential for learning and growth! 
              Besides, it's infinite in size and would crash the system. 😄
            </p>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              I understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
