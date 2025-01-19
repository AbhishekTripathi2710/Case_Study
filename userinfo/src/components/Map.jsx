import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const loader = new Loader({
  apiKey,
  version: "weekly",
});

function Map({ profile }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    loader.load().then(() => {
      const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 2
      };
      mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
    });
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && profile) {
      const { latitude, longitude } = profile.address;
      const position = { lat: latitude, lng: longitude };

      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(14);

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: profile.name
      });
    }
  }, [profile]);

  return <div ref={mapRef} className="h-96 w-full" />;
}

export default Map;

