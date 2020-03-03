/**
 *
 * LangSettings
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Grid from '@material-ui/core/Grid';

import NSSelect from 'components/shared/NSSelect';
import isoLangs from 'assets/isoLangs.json';
import messages from '../messages';

import { commonStyles } from '../styles';
export function LangSettings({ data, state, intl }) {
  const classes = commonStyles();
  const {
    survlangState,
    handleSurvLangChange,
    langState,
    handleLangChange,
    setSurvLangState,
  } = {
    ...state,
  };
  const {
    viewer: { defaultContextPermalink },
  } = data;

  const surveyLanguages = [
    { value: 'us_en' },
    { value: 'sv_es' },
    { value: 'ht_ht' },
  ];

  useEffect(() => {
    setSurvLangState({ item: defaultContextPermalink || 'us_en' });
  }, [defaultContextPermalink, setSurvLangState]);

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item className={classes.selectSpacing}>
          <NSSelect
            values={survlangState}
            items={surveyLanguages}
            update={handleSurvLangChange}
            label={intl.formatMessage(messages.defaultSurveyLang)}
            code="value"
            value="value"
          />
        </Grid>

        <Grid item>
          <NSSelect
            values={langState}
            items={isoLangs}
            update={handleLangChange}
            label={intl.formatMessage(messages.defaultLang)}
            code="code"
            value="name"
            infoKey="nativeName"
          />
        </Grid>
      </Grid>
    </>
  );
}

LangSettings.propTypes = {
  data: PropTypes.any.isRequired,
  intl: intlShape.isRequired,
  state: PropTypes.any,
};

const IntlLangSettings = injectIntl(LangSettings);

export default IntlLangSettings;
