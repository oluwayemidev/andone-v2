// src/components/InteractiveMapWidget.js
import React from 'react';
import { Card } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/InteractiveMapWidget.css';

const position = [6.5244, 3.3792]; // Default position (Lagos, Nigeria)

const InteractiveMapWidget = () => {
  return (
    <Card title="Interactive Map" bordered={false} className="interactive-map-card">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Lagos, Nigeria.
          </Popup>
        </Marker>
      </MapContainer>
    </Card>
  );
};

export default InteractiveMapWidget;
