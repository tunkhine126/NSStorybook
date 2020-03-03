/**
 *
 * Pins
 *
 */

import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import PropTypes from 'prop-types';

const SIZE = 30;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {
  render() {
    const { data, onClick } = this.props;

    return data.map((city, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        <svg
          height={SIZE}
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
          }}
          viewBox="0 0 25 35"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => onClick(city)}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5013 0.416504C5.89005 0.416504 0.542969 5.76359 0.542969 12.3748C0.542969 21.3436 12.5013 34.5832 12.5013 34.5832C12.5013 34.5832 24.4596 21.3436 24.4596 12.3748C24.4596 5.76359 19.1126 0.416504 12.5013 0.416504ZM12.5013 16.6457C10.1438 16.6457 8.23047 14.7323 8.23047 12.3748C8.23047 10.0173 10.1438 8.104 12.5013 8.104C14.8588 8.104 16.7721 10.0173 16.7721 12.3748C16.7721 14.7323 14.8588 16.6457 12.5013 16.6457Z"
            fill="#f24702"
          />
        </svg>
      </Marker>
    ));
  }
}

Pins.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};
