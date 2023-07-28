import React from 'react';
import './loader.css'; // Import the CSS file

const FullScreenLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="loader" />
    </div>
  );
};

export default FullScreenLoader;
