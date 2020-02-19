/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/**
 *
 * LevelSelect
 *
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { injectIntl, intlShape } from 'react-intl';
import { Treebeard } from 'react-treebeard';
import Fuse from 'fuse.js';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

import TextLink from 'components/shared/TextLink';
import { resetNestedLevels } from 'utils/helpers';
import {
  SelectFilterStyles,
  multiSelectSearchClasses,
  AccordianTreeStyles,
  AccordianTreeWrapper,
} from '../styles';
import CheckBoxGroup from '../checkboxGroup';
import messages from '../messages';
import { NSFiltersContext } from '../context/filters';

export function LevelSelect({
  intl,
  label,
  id: filterId,
  filterData,
  filterQueryTriggers,
}) {
  const classes = SelectFilterStyles();
  const treeClasses = AccordianTreeStyles();
  const searchClasses = multiSelectSearchClasses();
  const [cursor, setCursor] = useState(false);
  const {
    levelSelect: { levelSelectOptions: data, setLevelSelectOptions: setData },
    handleSelected,
  } = useContext(NSFiltersContext);

  if (data[filterId] && data[filterId].length === 0) {
    setData(currentState => ({ ...currentState, [filterId]: filterData }));
  }

  const settings = {
    threshold: 0.0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'children.name'],
  };
  const fuse = new Fuse(filterData, settings);

  const handleCheckboxChange = (status, id) => {
    handleSelected([]);
    setData(currentState => ({
      ...currentState,
      [filterId]: data[filterId].map(option => {
        const recursive = function(arr) {
          arr.forEach(obj => {
            if (obj.id === id || option.id === id) {
              obj.checked = status;
            }
            if (obj.children.length > 0) {
              recursive(obj.children);
            }
          });
        };

        if (option.children.length > 0) {
          recursive(option.children);
        }

        if (option.id === id) {
          option.checked = status;
        }

        return option;
      }),
    }));

    if (filterQueryTriggers[filterId]) {
      let selected = [];
      let selectedChips = [];

      data[filterId].forEach(option => {
        if (option.checked) {
          selected = [...selected, option.id];
        }

        if (option.children.length > 0) {
          const decoratorRecursive = function(arr) {
            arr.forEach(obj => {
              if (obj.checked) {
                selected = [...selected, obj.id];
                selectedChips = [...selectedChips, obj.name];
              }
              decoratorRecursive(obj.children);
            });
          };

          decoratorRecursive(option.children);
        }
      });

      filterQueryTriggers[filterId](
        selected.length === 0
          ? { query: null, chips: [] }
          : { query: selected, chips: selectedChips }
      );
    }
  };

  const decorators = {
    Container: props => {
      const {
        onClick: click,
        node: { name, id, toggled, checked, children },
      } = { ...props };
      let nestedChildren = [];
      let intermediate = false;
      let allChildrenChecked = false;

      if (children.length > 0) {
        const decoratorRecursive = function(arr) {
          arr.forEach(obj => {
            nestedChildren = [...nestedChildren, obj.checked ? 1 : 0];
            decoratorRecursive(obj.children);
          });
        };

        decoratorRecursive(children);

        intermediate =
          nestedChildren.includes(1) && !nestedChildren.every(i => i === 1);

        allChildrenChecked =
          nestedChildren.length === nestedChildren.filter(i => i === 1).length;
      }

      return (
        <div
          className={clsx(treeClasses.root, 'levels-accordion', {
            [treeClasses.active]: toggled && children.length,
          })}
          onClick={e => {
            if (e.target.type !== 'checkbox') {
              click();
            }
          }}
          role="button"
          onKeyPress={click}
          tabIndex="-1"
        >
          <CheckBoxGroup
            shouldDisable={{
              disable: false,
              id: null,
            }}
            label={name}
            show={checked || allChildrenChecked}
            intermediate={intermediate}
            id={id}
            resultCount={children.length}
            checboxChange={(e, chkBoxId) => {
              handleCheckboxChange(e.target.checked, chkBoxId);
            }}
          />
          {children.length ? (
            <svg
              className={clsx(treeClasses.icon, {
                [treeClasses.open]: toggled,
              })}
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.11363 0.199951L5.99954 4.0774L9.88546 0.199951L11.0792 1.39366L5.99954 6.47329L0.919922 1.39366L2.11363 0.199951Z"
                fill="#4E4E56"
              />
            </svg>
          ) : null}
        </div>
      );
    },
  };

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }

    node.active = true;

    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(currentState => ({
      ...currentState,
      [filterId]: [...data[filterId]],
    }));
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.multiSelectContainer}
      >
        <Grid item xs>
          <TextField
            classes={searchClasses}
            id={`${label}-search`}
            onChange={e => {
              const { value } = e.target;
              const newList =
                fuse.search(value).length > 0 ? fuse.search(value) : filterData;
              setData(currentState => ({
                ...currentState,
                [filterId]: newList,
              }));
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item>
          <TextLink
            className={clsx(treeClasses.reset, 'levels-reset')}
            content={intl.formatMessage(messages.reset)}
            onClick={() => {
              setData(currentState => ({
                ...currentState,
                [filterId]: data[filterId].map(options => {
                  resetNestedLevels(options);
                  return options;
                }),
              }));
              filterQueryTriggers[filterId]({ query: null, chips: [] });
            }}
          />
        </Grid>
      </Grid>
      <AccordianTreeWrapper className="levels-component-tree">
        <Treebeard
          data={data[filterId]}
          onToggle={onToggle}
          decorators={decorators}
        />
      </AccordianTreeWrapper>
    </>
  );
}

LevelSelect.propTypes = {
  intl: intlShape.isRequired,
  id: PropTypes.string.isRequired,
  filterData: PropTypes.array.isRequired,
  filterQueryTriggers: PropTypes.object.isRequired,
};

const IntlLevelSelect = injectIntl(LevelSelect);

export default IntlLevelSelect;
