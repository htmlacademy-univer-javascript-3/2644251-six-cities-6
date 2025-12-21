import { useEffect, useRef } from 'react';
import leaflet, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../store/offers/types';
import React from 'react';

type MapProps = {
  offers: Offer[];
  className?: string;
  hoveredOfferId: number | null;
};

const Map = ({
  offers,
  className = 'cities__map map',
  hoveredOfferId,
}: MapProps): JSX.Element => {
  const mapRef = useRef<HTMLElement | null>(null);
  const mapInstance = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstance.current === null) {
      mapInstance.current = leaflet.map(mapRef.current, {
        center: [48.86709, 2.36491],
        zoom: 12,
      });

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
        })
        .addTo(mapInstance.current);
    }

    if (mapInstance.current) {
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          mapInstance.current!.removeLayer(layer);
        }
      });

      offers.forEach((offer) => {
        const icon = leaflet.icon({
          iconUrl:
            offer.id === hoveredOfferId
              ? '/img/pin-active.svg'
              : '/img/pin.svg',
          iconSize: [27, 39],
        });

        leaflet
          .marker([offer.location.latitude, offer.location.longitude], { icon })
          .addTo(mapInstance.current!)
          .bindPopup(offer.title);
      });
    }
  }, [hoveredOfferId, offers]);

  return <section className={className} ref={mapRef}></section>;
};

const MemoizedMap = React.memo(Map);
export default MemoizedMap;
