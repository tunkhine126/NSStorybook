/**
 *
 * Tests for SurveyList Helper functions
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import { formatData, formattedColumns, columns } from '../helper';

describe('SurveyList Helper', () => {
  const data = formatData(
    'sampleSurvey',
    '3225-3124-412',
    3,
    'EN United States',
    5,
    '2019-08-02'
  );

  it('formatData()', () => {
    expect(data).toEqual({
      name: 'sampleSurvey',
      id: '3225-3124-412',
      questionsCount: 3,
      availableContexts: 'EN United States',
      submissionsCount: 5,
      lastUpdate: '2019-08-02',
    });
  });

  it('formattedColumns()', () => {
    const classes = {
      familyLink: {},
      familyCommunity: {},
      caption: {},
      columnHeight: {},
    };
    const FC = formattedColumns(classes);
    FC.forEach(column => {
      column.content(data);
    });
    expect(FC).toEqual(FC);
  });

  it('columns()', () => {
    const generatedColumns = columns(
      ['Name', 'Questions', 'Languages', 'Submissions', 'Last Update'],
      {
        contextsData: {
          loading: false,
          list: [],
          chips: [],
          clear: () => {},
        },
        lastUpdateData: {
          loading: false,
          list: [],
          chips: [],
          clear: () => {},
        },
      }
    );
    expect(generatedColumns).toHaveLength(5);
  });
});
