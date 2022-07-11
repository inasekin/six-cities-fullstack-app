import { useRef, useEffect, memo } from 'react';
import { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE, Zoom } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  activeOffer: string | null;
  city: City;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 40],
});

const activeCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [13.5, 40],
});

function Map({ offers, activeOffer, city, className = '' }: MapProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        Zoom.City
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            activeOffer && offer.id === activeOffer
              ? activeCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeOffer]);

  return <section className={`${className} map`} ref={mapRef}></section>;
}

export default memo(
  Map,
  (prevProps, nextProps) =>
    prevProps.city.name === nextProps.city.name &&
    prevProps.activeOffer === nextProps.activeOffer
);
