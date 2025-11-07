import { useEffect, useRef } from 'react';
import leaflet, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../mocks/offers';

type MapProps = {
  offers: Offer[];
};

const Map = ({ offers }: MapProps): JSX.Element => {
  const mapRef = useRef<HTMLElement | null>(null);
  const mapInstance = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstance.current === null) {
      mapInstance.current = leaflet.map(mapRef.current, {
        center: [52.3909553943508, 4.85309666406198], // Amsterdam center
        zoom: 12,
      });

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapInstance.current);
    }

    if (mapInstance.current) {
      offers.forEach((offer) => {
        leaflet
          .marker([offer.location.latitude, offer.location.longitude])
          .addTo(mapInstance.current!)
          .bindPopup(offer.title);
      });
    }
  }, [offers]);

  return <section className="cities__map map" ref={mapRef}></section>;
};

export default Map;
