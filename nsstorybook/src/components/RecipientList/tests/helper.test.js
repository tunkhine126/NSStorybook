/**
 *
 * Tests for RecipientList Helper functions
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import { formattedColumns, generateColumns } from '../helper';

describe('RecipientList Helper', () => {
  const columns = [
    {
      id: 'completedSurveys',
      defaultWidth: '123px',
      type: 'multi',
      label: 'Completed Surveys',
      filterWidth: 170,
      align: 'center',
      disablePadding: true,
      noData: false,
      show: true,
      sortable: false,
      filter: true,
      defaultFilter: true,
      custom: false,
    },
    {
      id: 'id',
      defaultWidth: '450px',
      label: 'Country ID',
      align: 'left',
      type: 'single',
      columnData: null,
      noData: false,
      disablePadding: false,
      show: true,
      sortable: true,
      filter: false,
      defaultFilter: false,
      custom: false,
    },
  ];

  it('formattedColumns()', () => {
    const classes = {
      recipientLink: {},
      familyCommunity: {},
      caption: {},
      columnHeight: {},
    };
    const FC = formattedColumns(classes, columns);
    FC.forEach(column => {
      column.content({
        recipientPath: '/recipients/family-list/family/:id',
        parentRecipients: 'Nuevo Cascatlan',
        uuid: 'b3ed06c0-8711-11e9-930f-679cdd5f45dd',
        recipientName: 'Rodriguez',
        id: 'SV-NUEVO_CASCATLAN-SV-NUEVO_CASCATLAN_23158',
        completedSurveys: 1,
        childRecipients: 3,
        lastUpdate: '2019-10-03T14:44:04Z',
      });
    });
    expect(FC).toEqual(FC);
  });

  it('generateColumns()', () => {
    const generatedColumns = generateColumns(
      [
        {
          id: 'completedSurveys',
          loading: false,
          list: [].map(d => ({
            id: d.uuid,
            label: d.name,
            count: d.submissionUuids.length,
            selected: false,
          })),
          chips: [],
          clear: () => {},
        },
      ],
      columns
    );
    expect(generatedColumns).toHaveLength(2);
  });
});
