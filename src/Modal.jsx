import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const codeSnippet = `
  // Google Sheets integration code
  
  `;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Google Sheet Code</h2>
        <pre className="bg-gray-100 p-4 rounded-md">
          <code>{codeSnippet}</code>
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(codeSnippet)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Copy Code
        </button>
      </div>
    </div>
  );
};

export default Modal;

