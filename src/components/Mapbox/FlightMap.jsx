import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNodTI3MDEiLCJhIjoiY2xlZmV2MHA2MHFldzNxbXYwZnppaHFxayJ9.ADfrlVvpEWh4QjYT-3feCg';

const FlightMap = ({ longitude, latitude }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 5
    });

    setMap(newMap);

    const newMarker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude]);

    setMarker(newMarker);

    newMarker.addTo(newMap);

    return () => {
      newMap.remove();
    }
  }, [longitude, latitude]);

  useEffect(() => {
    if (map) {
      map.flyTo({ center: [longitude, latitude] });
    }

    if (marker) {
      marker.setLngLat([longitude, latitude]);
    }
  }, [map, marker, longitude, latitude]);

  return (
    <div id="map-container" style={{ height: '400px' }} />
  );
};

export default FlightMap;
