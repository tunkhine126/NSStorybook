/**
 *
 * Widget
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import ActionLink from './actionLink';
import { recipientListStyles, ExpansionPanelStyle } from '../../styles';

function Widget({
  header,
  body,
  message,
  disableBtn,
  buttonPosition = 'start',
  btnHandler,
}) {
  const classes = recipientListStyles();

  return (
    <Paper className={clsx(classes.paper)}>
      <Typography
        gutterBottom
        className={clsx(classes.widgetHeader, classes.widgetPadding)}
      >
        {header}
      </Typography>

      <Divider light />

      <ExpansionPanelStyle>
        {body}

        <Divider light />
        {message && btnHandler && (
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems={`flex-${buttonPosition}`}
          >
            <ActionLink
              message={message}
              style={{
                marginRight: buttonPosition === 'end' ? 20 : 'auto',
                pointerEvents: disableBtn ? 'none' : 'initial',
                opacity: disableBtn ? 0.5 : 'initial',
              }}
              onClick={btnHandler}
            />
          </Grid>
        )}
      </ExpansionPanelStyle>
    </Paper>
  );
}

Widget.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  buttonPosition: PropTypes.oneOf(['start', 'end']),
  disableBtn: PropTypes.bool,
  message: PropTypes.string,
  btnHandler: PropTypes.func,
};

export default Widget;
