import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import MAP_STYLE from 'assets/map-style-basic-v8.json';

const defaultMapStyle = fromJS(MAP_STYLE);

const categories = [
  'labels',
  'roads',
  'buildings',
  'parks',
  'water',
  'background',
];

// Layer id patterns by category
const layerSelector = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/,
};

// Layer color class by type
const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color',
};

export default class StyleControls extends PureComponent {
  constructor(props) {
    super(props);

    this._defaultLayers = defaultMapStyle.get('layers');

    this.state = {
      visibility: {
        water: true,
        parks: true,
        buildings: true,
        roads: true,
        labels: true,
        background: true,
      },
      color: {
        water: '#aadaff',
        parks: '#ceeece',
        buildings: '#f0f0f0',
        roads: '#ffffff',
        labels: '#78888a',
        background: '#ebe9e4',
      },
    };
  }

  componentDidMount() {
    this._updateMapStyle(this.state);
  }

  _onVisibilityChange(name, event) {
    const visibility = state => ({
      ...state.visibility,
      [name]: event.target.checked,
    });
    this.setState({ visibility });
    this._updateMapStyle(state => ({ ...state, visibility }));
  }

  _updateMapStyle({ visibility, color }) {
    const layers = this._defaultLayers
      .filter(layer => {
        const id = layer.get('id');
        return categories.every(
          name => visibility[name] || !layerSelector[name].test(id)
        );
      })
      .map(layer => {
        const id = layer.get('id');
        const type = layer.get('type');
        const category = categories.find(name => layerSelector[name].test(id));
        if (category && colorClass[type]) {
          return layer.setIn(['paint', colorClass[type]], color[category]);
        }
        return layer;
      });

    this.props.onChange(defaultMapStyle.set('layers', layers));
  }

  render() {
    return null;
  }
}

StyleControls.propTypes = {
  onChange: PropTypes.func.isRequired,
};
