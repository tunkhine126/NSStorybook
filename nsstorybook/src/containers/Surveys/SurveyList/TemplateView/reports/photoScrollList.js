/**
 *
 * PhotoScrollList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Grid } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// Components
import { generateImg } from 'utils/helpers';
import { photoScrollStyle } from './styles';
import messages from '../../../messages';

function PhotoScrollList({
  intl,
  responses,
  surveyName,
  primaryRecipientIdPath,
}) {
  const classes = photoScrollStyle();

  // Dynamically apply border styling
  let special = [2];

  for (let i = 0; i < responses.length - 3; i += 3) {
    special = [...special, special[special.length - 1] + 3];
  }

  if (responses.length === special[special.length - 1]) {
    special[special.length - 1] = special[special.length - 1] - 1;
  } else {
    special = [...special, special[special.length - 2] + 1];
  }

  return (
    <Grid container className={classes.container}>
      {responses.map(
        (
          { imageUrl, base64Image, recipientUuid, submissionCompletedAt },
          index
        ) => (
          <Grid
            key={index}
            item
            container
            justify="center"
            alignItems="center"
            lg={4}
            md={6}
            xs={12}
            style={{
              padding: 15,
              paddingTop: 10,
              border: '1px solid lightGrey',
              borderRight: !special.includes(index) ? 'none' : 'auto',
              borderBottom: index < responses.length - 3 ? 'none' : 'auto',
              backgroundColor: (index + 1) % 2 !== 0 ? '#F0F0F0' : 'auto',
            }}
          >
            <Grid item>
              <LazyLoadImage
                alt=""
                effect="opacity"
                src={imageUrl || generateImg(base64Image)}
                height={176}
                width={211}
              />
            </Grid>
            <Grid item>
              <a
                className={classes.text}
                target="_blank"
                href={primaryRecipientIdPath.replace(
                  ':id',
                  `${recipientUuid}?tab=2&name=${surveyName}&date=${submissionCompletedAt}`
                )}
              >
                {intl.formatMessage(messages.viewFamily)}{' '}
                <OpenInNewIcon className={classes.icon} />
              </a>
              {/* TODO: Revist once submissions view complete */}
              <a
                className={classes.text}
                style={{ pointerEvents: 'none' }}
                target="_blank"
                href={primaryRecipientIdPath.replace(
                  ':id',
                  'REPLACE_WITH_SUBMISSION_UUID'
                )}
              >
                {intl.formatMessage(messages.viewSubmission)}{' '}
                <OpenInNewIcon className={classes.icon} />
              </a>
            </Grid>
          </Grid>
        )
      )}
    </Grid>
  );
}

PhotoScrollList.propTypes = {
  intl: intlShape.isRequired,
  responses: PropTypes.array.isRequired,
  surveyName: PropTypes.string.isRequired,
  primaryRecipientIdPath: PropTypes.string.isRequired,
};

const intlPhotoScrollList = injectIntl(PhotoScrollList);

export default intlPhotoScrollList;
