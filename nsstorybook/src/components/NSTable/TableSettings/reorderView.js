/**
 *
 * ReorderView
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { useDrop } from 'react-dnd-cjs';
import clsx from 'clsx';
import update from 'immutability-helper';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import NSButton from 'components/shared/NSButton';
import globalMessages from 'messages';
import NSCard from '../nsCard';
import messages from '../messages';
import { styles } from '../styles';

function ReorderView({ intl, columns, handleReorderMode, handleReorder }) {
  const classes = styles();
  const [, drop] = useDrop({ accept: 'nsCard' });
  const [dragableColumns, setDragableColumns] = useState(columns);

  const findCard = id => {
    const dragableColumn = dragableColumns.filter(c => c.id === id)[0];
    return {
      dragableColumn,
      index: dragableColumns.indexOf(dragableColumn),
    };
  };

  const moveCard = (id, atIndex) => {
    const { dragableColumn, index } = findCard(id);
    setDragableColumns(
      update(dragableColumns, {
        $splice: [[index, 1], [atIndex, 0, dragableColumn]],
      })
    );
  };

  return (
    <Grid
      item
      container
      className={classes.tsDragNDropSettings}
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Typography
        variant="caption"
        gutterBottom
        className={clsx(classes.caption, classes.tsDragNDropHeader)}
      >
        {intl.formatMessage(messages.reorderDesc)}
      </Typography>
      <Grid
        ref={drop}
        item
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        {dragableColumns.map((card, idx) => (
          <NSCard
            key={card.id}
            index={idx}
            id={`${card.id}`}
            label={card.label}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </Grid>

      <Grid
        item
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
        className={classes.tsDragNDropAction}
      >
        <NSButton
          textBtn
          variant="contained"
          size="small"
          onClick={handleReorderMode}
          componentClasses={classes.tsDragNDropCancelBtn}
        >
          <Typography variant="body1" className={classes.tsDragNDropCancel}>
            {intl.formatMessage(globalMessages.cancel)}
          </Typography>
        </NSButton>
        <NSButton
          version={2}
          variant="contained"
          size="small"
          componentClasses={classes.tsDragNDropSaveBtn}
          onClick={() => {
            handleReorder(dragableColumns);
            handleReorderMode();
          }}
        >
          <Typography variant="body1" className={classes.tsDragNDropSave}>
            {intl.formatMessage(messages.saveChanges)}
          </Typography>
        </NSButton>
      </Grid>
    </Grid>
  );
}

ReorderView.propTypes = {
  intl: intlShape.isRequired,
  columns: PropTypes.array.isRequired,
  handleReorderMode: PropTypes.func.isRequired,
  handleReorder: PropTypes.func.isRequired,
};

const IntlReorderView = injectIntl(ReorderView);
export default IntlReorderView;
