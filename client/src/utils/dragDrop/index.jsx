import React, { useState, useRef } from 'react';
import { BsCloudUpload } from 'react-icons/bs';

const FileUploadDrop = ({ file, onFileSelect }) => {
  const dropRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null); 

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]); 
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      ref={dropRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      style={{
        border: dragging ? '2px dashed #00f' : '2px dashed #ccc',
        padding: '20px 10px',
        borderRadius: '10px',
        textAlign: 'center',
        backgroundColor: dragging ? '#f0f8ff' : '#fff',
        cursor: 'pointer',
      }}
    >
      {file ? (
        <div>
          <div>File Selected: {file.name}</div>
        </div>
      ) : (
        <div className="d-flex justify-content-between text-dark align-items-center px-4 gap-2">
          <BsCloudUpload size={30} className="my-auto fw-bold" />
          <span className="me-auto">Drag and drop files here</span>
          <button className="btn-purple py-1">Browse files</button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default FileUploadDrop;
