/**
 *
 * TextScrollList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { styles } from './styles';

function TextScrollList({ responses, surveyName, primaryRecipientIdPath }) {
  const classes = styles();

  return (
    <List
      height={241}
      itemData={responses}
      itemCount={responses.length}
      itemSize={35}
      width="90%"
      style={{ marginLeft: 40 }}
    >
      {({ index, style, data }) => (
        <ListItem
          button
          style={{
            ...style,
            border: '1px solid lightGrey',
            borderTop: index !== 0 ? 'none' : '1px solid lightGrey',
          }}
          key={index}
          className={index % 2 === 0 ? classes.scrollList : ''}
        >
          <ListItemText primary={data[index].sourceValue} />
          <a
            className={classes.text}
            target="_blank"
            href={primaryRecipientIdPath.replace(
              ':id',
              `${data[index].recipientUuid}?tab=2&name=${surveyName}&date=${
                data[index].submissionCompletedAt
              }`
            )}
          >
            <OpenInNewIcon fontSize="small" className={classes.textIcon} />
          </a>
        </ListItem>
      )}
    </List>
  );
}

TextScrollList.propTypes = {
  responses: PropTypes.array.isRequired,
  surveyName: PropTypes.string.isRequired,
  primaryRecipientIdPath: PropTypes.string.isRequired,
};

export default TextScrollList;
