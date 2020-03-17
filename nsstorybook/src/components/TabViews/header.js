/**
 *
 * TabView Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import placeHolderImg from '../../assets/images/familyPlaceholder.png';
import { generateImg } from '../../utils/helpers';
import { headerStyles } from './styles';

function a11yProps(name) {
  return {
    id: `${name}-tab`,
    'aria-controls': `${name}-control-tab`,
  };
}

export function Header({ data, btns, showImg, tabChange, tabValues, value }) {
  const classes = headerStyles();

  const TabNavs = tabValues.map((tab, idx) => (
    <Tab
      key={tab}
      label={tab}
      disabled={idx === 3 || idx === 4}
      {...a11yProps(tab)}
      className={classes.tab}
    />
  ));

  return (
    <Grid container>
      {showImg && (
        <Grid item xs={2} className={classes.cardContainer}>
          <Card className={classes.headerImg}>
            <img
              height="100%"
              alt={data.name}
              src={
                data.base64Avatar
                  ? generateImg(data.base64Avatar)
                  : placeHolderImg
              }
              title={data.name}
            />
          </Card>
        </Grid>
      )}
      <Grid container item className={classes.navContainer}>
        <Grid container item direction="row-reverse">
          <Grid
            item
            container
            xs={8}
            justify="flex-end"
            alignItems="flex-start"
          >
            <Grid item container justify="flex-end">
              {btns}
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.recipientInfo}>
            <Typography variant="h1" className={classes.recipientName}>
              {data.name}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems="flex-end">
          <AppBar position="static" color="default" className={classes.appBar}>
            <Tabs
              value={value}
              onChange={tabChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="Recipient List Tabs"
            >
              {TabNavs}
            </Tabs>
          </AppBar>
        </Grid>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  value: PropTypes.number.isRequired,
  tabValues: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  tabChange: PropTypes.func.isRequired,
  showImg: PropTypes.bool,
  btns: PropTypes.element,
};

export default Header;
