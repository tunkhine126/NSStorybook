/**
 *
 * Tests for SubmissionList Helper functions
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import { formatData, formattedColumns, columns } from '../helper';

describe('SubmissionList Helper', () => {
  const data = formatData(
    'sampleFamily',
    'new community',
    '3225-3124-412',
    '638d2b66-5641-11e9-9966-22000bd4493b',
    '05-123',
    'SV-AHUACHAPAN-SV-AHUACHAPAN78794651516000000',
    'Test Survey',
    'John Doe',
    '2019-08-02'
  );

  it('formatData()', () => {
    expect(data).toEqual({
      family: 'sampleFamily',
      community: 'new community',
      id: '3225-3124-412',
      surveyId: '638d2b66-5641-11e9-9966-22000bd4493b',
      familyId: 'SV-AHUACHAPAN-SV-AHUACHAPAN78794651516000000',
      recipientUuid: '05-123',
      survey: 'Test Survey',
      surveyor: 'John Doe',
      completed: '2019-08-02',
    });
  });

  it('formattedColumns()', () => {
    const classes = {
      recipientLink: {},
      familyCommunity: {},
      caption: {},
      columnHeight: {},
    };
    const path = '/recipients/family-list/family/:id';
    const FC = formattedColumns(classes, path);
    FC.forEach(column => {
      column.content(data);
    });
    expect(FC).toEqual(FC);
  });

  it('columns()', () => {
    const generatedColumns = columns(
      ['Family', 'Community', 'Family ID', 'Survey', 'Surveyor', 'Completed'],
      {
        surveyData: {
          loading: false,
          list: [],
          chips: [],
          clear: () => {},
        },
        surveyorData: {
          loading: false,
          list: [],
          chips: [],
          clear: () => {},
        },
        communitiesData: {
          loading: false,
          list: [],
          chips: [],
          clear: () => {},
        },
        completedData: {
          loading: false,
          list: [],
          chips: [],
          clear: () => {},
        },
      }
    );
    expect(generatedColumns).toHaveLength(6);
  });
});
