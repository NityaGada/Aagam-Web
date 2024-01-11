// AdminPage.js
import React, { useState } from 'react';
import "./index.css";
import expand from "../../assets/expand.png";
import del from "../../assets/delete.png";

const AdminPage = () => {
  const [tiles, setTiles] = useState([]);
  const [showTileForm, setShowTileForm] = useState(false);

  const Tile = ({ id, title, image, length, onExpand, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
      setExpanded(!expanded);
      onExpand(id);
    };

    const handleDelete = () => {
      onDelete(id);
    };
    const handleCloseOverlay = () => {
        setExpanded(false);
      };
  
      return (
        <div className="tile">
          <img src={image} alt={title} onClick={handleExpand} />
          <h3>{title}</h3>
          <p>Length Available: {length}</p>
          <div className="actions">
            <img
              src={expand}
              alt="Expand"
              onClick={handleExpand}
              style={{ width: "10%", height:"10%" }}
              className="action-icon"
            />
            <img
              src={del}
              alt="Delete"
              onClick={handleDelete}
              style={{ width: "10%", height:"10%" }}
              className="action-icon"
            />
          </div>
          {expanded && (
            <div className="overlay">
              <button className="close-button" onClick={handleCloseOverlay}>
                Close
              </button>
              <img src={image} alt={title} />
              <h3>{title}</h3>
              <p>Length Available: {length}</p>
            </div>
          )}
        </div>
      );
    };

  const TileForm = ({ onAddTile }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [length, setLength] = useState(0);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!file) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onAddTile({ title, image: reader.result, length });
      };
      reader.readAsDataURL(file);

      setTitle('');
      setImage('');
      setLength(0);
      setFile(null);
      setShowTileForm(false); // Hide the form after submission
    };

    return (
      <div>
        {showTileForm ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', maxWidth: '600px', margin: 'auto' }}>
            <div style={{ marginRight: '20px', flex: '1' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginLeft: '5px', width: '100%' }} />
              </label>
              
              <label style={{ display: 'block' }}>
                Length:
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} style={{ marginLeft: '5px', width: '100%' }} />
              </label>
            </div>

            <div style={{ flex: '1' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>
                Image:
                <div style={{ border: '2px dashed #ccc', padding: '10px', textAlign: 'center' }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                  <p style={{ cursor: 'pointer' }} onClick={() => document.querySelector('input[type="file"]').click()}>Drag & Drop or Click to Upload</p>
                </div>
              </label>
            </div>

            <button type="submit" style={{ color: 'black', alignSelf: 'center' }}>
              Add Design
            </button>
          </form>
        ) : (
          <button style={{ color: 'black' }} onClick={() => setShowTileForm(true)}>Add New Design</button>
        )}
        {showTileForm && (
          <button style={{ color: 'black' }} onClick={() => setShowTileForm(false)}>Close</button>
        )}
      </div>
    );
  };

  const handleAddTile = (newTile) => {
    setTiles([...tiles, newTile]);
  };

  const handleExpandTile = (id) => {
    // Implement expand logic if needed
  };

  const handleDeleteTile = (id) => {
    const updatedTiles = tiles.filter((_, index) => index !== id);
    setTiles(updatedTiles);
  };

  return (
    <div className="admin-page">
      <TileForm onAddTile={handleAddTile} />
      <div className="tile-container">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            id={index}
            title={tile.title}
            image={tile.image}
            length={tile.length}
            onExpand={handleExpandTile}
            onDelete={handleDeleteTile}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
