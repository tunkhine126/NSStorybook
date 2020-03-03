/**
 *
 * Map
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ReactMapGL, { Popup } from 'react-map-gl';

import Grid from '@material-ui/core/Grid';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// Components
import { styles } from './styles';
import ControlPanel from './control-panel';
import Pins from './pins';
import messages from '../../../messages';

function CoordinateMap({
  intl,
  responses,
  surveyName,
  primaryRecipientIdPath,
}) {
  const classes = styles();

  const [viewport, setViewport] = useState({
    width: 500,
    height: 400,
    latitude: 37.7577,
    longitude: -100.4376,
    zoom: 3,
  });

  const [, setMapStyle] = useState('');
  const [popupInfo, setPopupInfo] = useState(null);
  const data = responses
    .map(({ sourceValue, recipientUuid, submissionCompletedAt }) => ({
      latitude: Number(sourceValue.split(',')[0]),
      longitude: Number(sourceValue.split(',')[1]),
      id: recipientUuid,
      completed: submissionCompletedAt,
    }))
    .filter(({ latitude, longitude }) => latitude && longitude);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={viewPort => setViewport(viewPort)}
      width="100%"
      style={{ paddingLeft: 40, paddingRight: 40 }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      mapboxApiAccessToken="pk.eyJ1IjoibnNkZXYiLCJhIjoiY2s0eWMxa2VwMGE3dDNrcDg5MWdheHJsNiJ9.ebjOaP9Sondd6VUkf0kdAQ"
    >
      <Pins data={data} onClick={city => setPopupInfo(city)} />
      {popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <Grid container direction="column">
            <Grid
              item
              container
              direction="row"
              className={classes.coordinates}
            >
              <svg
                width="15"
                className={classes.pin}
                viewBox="0 0 25 35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5013 0.416504C5.89005 0.416504 0.542969 5.76359 0.542969 12.3748C0.542969 21.3436 12.5013 34.5832 12.5013 34.5832C12.5013 34.5832 24.4596 21.3436 24.4596 12.3748C24.4596 5.76359 19.1126 0.416504 12.5013 0.416504ZM12.5013 16.6457C10.1438 16.6457 8.23047 14.7323 8.23047 12.3748C8.23047 10.0173 10.1438 8.104 12.5013 8.104C14.8588 8.104 16.7721 10.0173 16.7721 12.3748C16.7721 14.7323 14.8588 16.6457 12.5013 16.6457Z"
                  fill="#f24702"
                />
              </svg>
              <p className={classes.locationText}>{`${popupInfo.latitude}, ${
                popupInfo.longitude
              }`}</p>
            </Grid>
            <Grid item container direction="column">
              <a
                className={classes.pinLinks}
                target="_blank"
                href={primaryRecipientIdPath.replace(
                  ':id',
                  `${popupInfo.id}?tab=2&name=${surveyName}&date=${
                    popupInfo.completed
                  }`
                )}
              >
                {intl.formatMessage(messages.viewFamily)}{' '}
                <OpenInNewIcon className={classes.pinIcon} />
              </a>
              {/* TODO: Revist once submissions view complete */}
              <a
                className={classes.pinLinks}
                style={{ pointerEvents: 'none' }}
                target="_blank"
                href={primaryRecipientIdPath.replace(
                  ':id',
                  'REPLACE_WITH_SUBMISSION_UUID'
                )}
              >
                {intl.formatMessage(messages.viewSubmission)}{' '}
                <OpenInNewIcon className={classes.pinIcon} />
              </a>
            </Grid>
          </Grid>
        </Popup>
      )}
      <ControlPanel onChange={setMapStyle} />
    </ReactMapGL>
  );
}

CoordinateMap.propTypes = {
  intl: intlShape.isRequired,
  responses: PropTypes.array.isRequired,
  surveyName: PropTypes.string.isRequired,
  primaryRecipientIdPath: PropTypes.string.isRequired,
};

const intlCoordinateMap = injectIntl(CoordinateMap);

export default intlCoordinateMap;
