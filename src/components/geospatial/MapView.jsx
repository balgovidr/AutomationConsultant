"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";



export default function MapView({placing, setPlacing, pickedLocation, setPickedLocation, setShowItemForm}) {
  function ClickHandler({ placing, setPlacing, setPickedLocation }) {
    useMapEvents({
      click(e) {
        if (placing) {
          setPickedLocation([e?.latlng?.lat, e?.latlng?.lng]);
          setPlacing(false);
          setShowItemForm(true);
        }
      },
    });

    return null;
  }

  // Fix Leaflet’s default marker icon issue in Next.js
  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  
  const position = [51.505, -0.09]; // London

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler placing={placing} setPlacing={setPlacing} setPickedLocation={setPickedLocation} />
      {(placing && pickedLocation) ?? <Marker position={pickedLocation} />}
      <Marker position={position}>
        <Popup>
          A sample borehole log <br /> Depth: 30m
        </Popup>
      </Marker>
    </MapContainer>
  );
}
