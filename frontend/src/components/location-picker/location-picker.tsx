import { useRef, useEffect, useCallback } from 'react';
import { Icon, Marker } from 'leaflet';
import Select from 'react-select';
import { Location } from '../../types/location';
import { FormAction, FormActionType } from '../../types/edit-form';
import useMap from '../../hooks/use-map';
import { CITIES, URL_MARKER_DEFAULT, Zoom } from '../../const';
import { City } from '../../types/city';
import 'leaflet/dist/leaflet.css';

type LocationPickerProps = {
  dispatch: (value: FormAction) => void;
  location: Location;
  city: City;
};

const customIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 40],
});

function LocationPicker({ location, city, dispatch }: LocationPickerProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  const marker = useRef<Marker>();
  const map = useMap(mapRef);

  const resetMarker = useCallback(
    (coords: Location) => {
      if (map) {
        if (marker.current) {
          marker.current.remove();
        }

        marker.current = new Marker(
          {
            lat: coords.latitude,
            lng: coords.longitude,
          },
          {
            draggable: true,
            icon: customIcon,
          }
        );

        marker.current.on('moveend', (evt) => {
          dispatch({
            type: FormActionType.setLocation,
            payload: `${evt.target.getLatLng().lat}, ${
              evt.target.getLatLng().lng
            }`,
          });
        });

        marker.current.addTo(map);
      }
    },
    [map, dispatch]
  );

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        Zoom.City
      );

      resetMarker(city.location);
    }
  }, [map, city, resetMarker]);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: location.latitude,
          lng: location.longitude,
        }
      );

      resetMarker(location);
    }
  }, [map, location, resetMarker]);

  return (
    <div>
      <div className="form__input-wrapper location-picker">
        <label htmlFor="cityName" className="location-picker__label">
          Location
        </label>
        <Select
          className="location-picker__select"
          classNamePrefix="react-select"
          name="cityName"
          id="cityName"
          defaultValue={{ value: city.name, label: city.name }}
          options={CITIES.map(({ name }) => ({
            value: name,
            label: name,
          }))}
          onChange={(evt) =>
            dispatch({
              type: FormActionType.setCity,
              payload: evt?.value ?? city.name,
            })}
        />
      </div>
      <section className="location-picker__map" ref={mapRef}></section>
    </div>
  );
}

export default LocationPicker;
