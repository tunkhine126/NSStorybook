/**
 *
 * NSCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd-cjs';

import DragIndicator from '@material-ui/icons/DragIndicator';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { styles } from './styles';

function NSCard({ id, label, moveCard, findCard, index }) {
  const classes = styles();
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'nsCard', id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: 'nsCard',
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.nsCardContainer}
    >
      <Grid item className={classes.tsDragNDropIndex}>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.nsCardIndex}
        >
          {index + 1}
        </Typography>
      </Grid>

      <Grid
        item
        xs
        container
        direction="row"
        justify="center"
        alignItems="center"
        ref={node => drag(drop(node))}
        className={classes.nsCardContent}
        style={{
          opacity,
        }}
      >
        <Grid item xs className={classes.nsCardLabel}>
          {label}
        </Grid>

        <DragIndicator className={classes.nsCardDragIndicator} />
      </Grid>
    </Grid>
  );
}

NSCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
  findCard: PropTypes.func.isRequired,
};

export default NSCard;
