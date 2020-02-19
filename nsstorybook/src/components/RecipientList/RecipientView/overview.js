/**
 *
 * OverView
 *
 */

import React, { useState, useContext, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import clsx from 'clsx';

import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import colors from 'global-styles';
import ToolTipIcon from 'components/shared/Icons/toolTipIcon';
import TextLink from 'components/shared/TextLink';
import CardMedia from '@material-ui/core/CardMedia';

import { generateImg } from 'utils/helpers';
import placeHolderImg from 'assets/images/familyPlaceholder.png';
import LinkRouter from 'components/shared/LinkRouter';
import globalMessages from 'messages';
import Widget from './Widget/widget';
import RecipientPanel from './Widget/recipientPanel';
import TwoColumns from './Widget/twoColumns';
import ColumnContent from './Widget/columnContent';
import ThreeRows from './Widget/threeRows';
import { RecipientViewContext } from './context/index';
import { recipientListStyles, progressBarStyles } from '../styles';

function Overview({ intl }) {
  let customFields = null;
  let snapShotItems = [];
  let snapShotRender = [];
  const classes = recipientListStyles();
  const { data, tabChange, rdData, rest, profileDetails } = useContext(
    RecipientViewContext
  );

  const { name, description, color } = data.pipelineStep
    ? data.pipelineStep
    : {};
  const { history, location } = rest;

  const percentComplete =
    data.progressPercentage && data.progressPercentage > 100
      ? 100
      : data.progressPercentage;

  if (data.children.length > 0) {
    const {
      children: [
        {
          recipientDefinition: { customFields: CF },
        },
      ],
    } = data;
    customFields = CF;
  }

  const [progressState] = useState({
    value: percentComplete,
    color: color || defaultColors,
  });

  const recipientChildPanels = data.children.map((c, idx) => (
    <Fragment key={idx}>
      <RecipientPanel
        name={c.name}
        customFields={customFields}
        data={c}
        enableDelete
        lastChild={data.children.length === idx + 1}
      />
    </Fragment>
  ));

  if (data.customFields) {
    let columnsContent = [];

    snapShotItems = data.recipientDefinition.customFields.map(s => ({
      name: s.contexts.us_en.label,
      value: data.customFields[s.name],
      type: s.field_type,
    }));

    columnsContent = snapShotItems.map((i, idx) => {
      const sName = i.name || 'N/A';
      const sValue = i.value || 'N/A';

      return (
        <ColumnContent
          key={idx}
          header={sName}
          data={
            i.type === 'photo' ? (
              <CardMedia
                component="img"
                alt={sName}
                height="100%"
                image={sValue === 'N/A' ? placeHolderImg : generateImg(sValue)}
                title={sName}
              />
            ) : (
              sValue
            )
          }
        />
      );
    });

    for (let i = 0; i < columnsContent.length; i += 2) {
      const current = columnsContent[i];
      const next = columnsContent[i + 1];

      snapShotRender = [
        ...snapShotRender,
        <TwoColumns key={i} col1={current || null} col2={next || null} />,
      ];
    }
  }

  const defaultColors =
    percentComplete < 100 ? colors.STATUS.notice : colors.STATUS.positive;

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      className={classes.container}
    >
      {(data.pipelineStep || profileDetails.childRecipients) && (
        <Grid item className={clsx(classes.column1)}>
          {data.pipelineStep && (
            <Paper className={clsx(classes.paper, classes.moveInContainer)}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.widgetHeader}
              >
                {name}
              </Typography>
              <Grid
                item
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={11}>
                  <LinearProgress
                    classes={progressBarStyles(progressState.color)()}
                    className={classes.statusProgress}
                    variant="determinate"
                    value={progressState.value}
                  />
                </Grid>

                <Grid item>
                  <Tooltip
                    title={intl.formatMessage(globalMessages.progressBarDesc)}
                    placement="right"
                    className={classes.progressTip}
                  >
                    <ToolTipIcon />
                  </Tooltip>
                </Grid>

                <Typography
                  variant="caption"
                  className={classes.movedInDetails}
                >
                  {description}.
                </Typography>
              </Grid>
            </Paper>
          )}
          {profileDetails.childRecipients && (
            <Widget
              header={profileDetails.childRecipients}
              body={recipientChildPanels}
              message="addRecipientChild"
              disableBtn={!rdData.customFields}
              btnHandler={() =>
                history.push(
                  `/recipients/add/recipient?pId=${data.uuid}&rdId=${
                    rdData.uuid
                  }&name=${profileDetails.addRecipientName}&path=${
                    location.pathname
                  }`
                )
              }
            />
          )}
        </Grid>
      )}

      <Grid item className={clsx(classes.column2)}>
        <Widget
          header={intl.formatMessage(globalMessages.snapshot)}
          body={snapShotRender}
          message="fullProfile"
          btnHandler={e => tabChange(e, 1)}
        />

        {
          // TODO: NOT Beta
          /* <Widget
          header={intl.formatMessage(messages.files)}
          body={
            <>
              <TwoColumns
                col1={
                  <ThreeRows
                    row1={intl.formatMessage(messages.uploaded)}
                    row2="17"
                    row3="212 MB"
                  />
                }
                col2={
                  <ThreeRows
                    row1={intl.formatMessage(messages.lastUpload)}
                    row2={
                      <TextLink
                        content="Family-Donor-Profile.pdf"
                        bold={false}
                      />
                    }
                    row3="2 weeks ago"
                  />
                }
              />
            </>
          }
          message="allFiles"
        /> */
        }
      </Grid>
      <Grid item className={classes.activityContainer}>
        {/* ********* Activity Container  ************ */}
        {/* <Paper className={clsx(classes.paper)}>xs=4</Paper> */}
      </Grid>
    </Grid>
  );
}

Overview.propTypes = {
  intl: intlShape.isRequired,
};

const intlOverview = injectIntl(Overview);

export default intlOverview;
