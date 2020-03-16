import React from 'react'
import NSFilters from '../components/NSFilters'
import { defineMessages, IntlProvider } from 'react-intl';
import { NSFiltersProvider } from '../components/NSFilters/context/filters';
import Wrapper from '../components/NSFilters/index';
import { action } from '@storybook/addon-actions';
import MultiSelect from '../components/NSFilters/multi';
import LevelSelect from '../components/NSFilters/levels'
import Single from '../components/NSFilters/single'
import { generateISODate } from '../utils/helpers';

export default {
  title: 'New Story Filters',
  component: NSFilters
}

// Multi-select boilerplate
const label = 'Completed Surveys';
const data = [
  {
    id: 'fef3f-2r223-vrb423',
    label: 'New Story Storybook',
    count: 1,
    selected: true,
  },
  {
    id: 'fef3f-2r223-vrb424',
    label: 'Storybook',
    count: 2,
    selected: false,
  },
  {
    id: 'fef3f-2r223-vrb425',
    label: 'Mexico',
    count: 5,
    selected: false,
  },
  {
    id: 'fef3f-2r223-vrb426',
    label: 'El Salvador',
    count: 3,
    selected: false,
  },
];

// NS Filters boilerplate 
const defaultState = { query: null, chips: [] };

const columns = [
  {
    id: 'recipientName',
    defaultWidth: '380px',
    label: 'Family',
    align: 'left',
    type: 'single',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: true,
    defaultFilter: false,
    filter: false,
    custom: false,
  },
  {
    id: 'id',
    defaultWidth: '450px',
    label: 'Family ID',
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
  {
    id: 'completedSurveys',
    defaultWidth: '123px',
    type: 'multi',
    label: 'Completed Surveys',
    filterWidth: 170,
    align: 'center',
    columnData: null,
    disablePadding: true,
    noData: false,
    show: true,
    sortable: false,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
  {
    id: 'childRecipients',
    defaultWidth: '100px',
    type: 'multi',
    label: 'Family Members',
    align: 'center',
    columnData: null,
    noData: false,
    disablePadding: true,
    show: true,
    sortable: false,
    filter: false,
    defaultFilter: false,
    custom: false,
  },
  {
    id: 'parentRecipients',
    type: 'levels',
    label: 'Community',
    filterWidth: 150,
    align: 'center',
    noData: false,
    columnData: null,
    disablePadding: true,
    sortable: false,
    show: true,
    filter: true,
    noColumn: true,
    defaultFilter: true,
    custom: false,
  },
  {
    id: 'lastUpdate',
    defaultWidth: '180px',
    type: 'date',
    label: 'Last Update',
    filterWidth: 150,
    align: 'center',
    columnData: null,
    noData: true,
    disablePadding: true,
    show: true,
    sortable: true,
    filter: true,
    defaultFilter: true,
    custom: false,
  },
];

  const filterQueryTriggers = {
    completedSurveys: () => {},
  };

  const multiSelectProps = {
    label,
    id: 'completedSurveys',
    data,
    filterQueryTriggers,
  };

const handleSelected = () => {};

const dateRangeProps = {
  dateRange: { before: null, after: null },
  setDateRange: () => {},
};

const lastUpdateProps = {
  lastUpdate: defaultState,
  setLastUpdate: () => {},
};

const lastUpdatePropsCalendar = {
  lastUpdate: {
    query: 'custom',
    chips: [],
  },
  setLastUpdate: () => {},
};

const commonProps = {
  filterCategories: columns,
  dateRangeProps,
  lastUpdateProps: lastUpdatePropsCalendar,
};

const wrapperProps = {
  filterQueryTriggers: {
    completedSurveys: () => {},
    lastUpdate: () => {},
  },
  setSelected: () => {},
  messages: defineMessages({
    completedSurveys: {
      id: `completedSurveys`,
      defaultMessage: 'Completed Surveys',
    },
    lastUpdate: {
      id: `lastUpdate`,
      defaultMessage: 'Last Update',
    },
    parentRecipients: {
      id: `parentRecipients`,
      defaultMessage: 'Community',
    },
  }),
};

const NSFiltersProviders = ({ children }) => (
  <NSFiltersProvider handleSelected={handleSelected} {...commonProps}>
    {children}
  </NSFiltersProvider>
);

// Level select boilerplate
const levelSelectData = [
  {
    id: '60786f62-5641-11e9-9966-22000bd4493b',
    name: 'Country',
    toggled: true,
    checked: false,
    children: [
      {
        id: '40786f62-3641-11e9-9916-22000bd4493b',
        name: 'City',
        toggled: true,
        checked: false,
        children: [,
          {
            id: '40786f62-3641-11e9-9916-22000bd4493c',
            name: 'Community',
            toggled: true,
            checked: false,
            children: [
              {
                id: '40786f62-3641-11e9-9916-22000bd4493d',
                name: 'Family',
                toggled: true,
                checked: false,
                children: [
                  {
                    id: '40786f62-3641-11e9-9916-22000bd4493e',
                    name: 'Family Member',
                    toggled: true,
                    checked: false,
                    children: [],
                  }
                ],
              }
            ],
          }
        ],   
      },
    ],
  },
];

const levelSelectFilterQueryTriggers = {
  parentRecipients: {
    data: [],
    set: () => {},
  },
};

const levelFilterProps = {
  id: 'parentRecipients',
  filterData: levelSelectData,
  levelSelectFilterQueryTriggers,
};

const singleLabel = 'Community';
const singleSelected = 'all-time';
const singleDateOptions = [
  { value: '', label: 'All time' },
  {
    value: generateISODate(7),
    label: 'Past 7 days',
  },
  {
    value: generateISODate(30),
    label: 'Past 30 days',
  },
  {
    value: generateISODate(365),
    label: 'Past Year',
  },
];

export function NSFilterContainer() {

  return(
    <IntlProvider>
      <div onClick={action('Component handler')}>
        <h3>New Story Filters View</h3>
        <NSFiltersProviders>
          <Wrapper {...commonProps} {...wrapperProps} />
        <h3>Multi-select</h3>
          <MultiSelect {...multiSelectProps} />
        <h3>Level select</h3>
          <LevelSelect {...levelFilterProps} />
        <h3>Single Select</h3>
          <Single 
            label={singleLabel}
            selected={singleSelected}
            handleChange={() => {}}
            singleOptions={singleDateOptions}/>
        </NSFiltersProviders>
      </div>
    </IntlProvider>
  )
}
