import React from 'react';

const {arrayOf, func, number, object, string} = React.PropTypes;

class VRListSwap extends React.Component {
  static propTypes = {
    display: string.isRequired,
    left: arrayOf(object).isRequired,
    onUpdate: func.isRequired,
    right: arrayOf(object).isRequired,
    size: number
  };

  static defaultProps = {size: 5};

  static getOptions(items, prop) {
    return items.map((item, index) =>
      <option key={index}>{item[prop]}</option>);
  }

  static getSelectedOptions(selectId) {
    const select = document.getElementById(selectId);
    const options = [...select.selectedOptions];
    return options.map(option => option.textContent);
  }

  constructor(props) {
    super(props);

    this.sortFn = (a, b) =>
      a[props.display].localeCompare(b[props.display]);

    // Prebind
    this.moveLeft = this.moveFrom.bind(this, 'right');
    this.moveRight = this.moveFrom.bind(this, 'left');
  }

  moveFrom(selectId) {
    const {display, left, right} = this.props;
    const options = VRListSwap.getSelectedOptions(selectId);

    const fromLeft = selectId === 'left';
    const fromList = fromLeft ? left : right;
    const toList = fromLeft ? right : left;

    // Get a new from list that keeps everything in
    // the current one except the ones selected.
    const newFrom = fromList.filter(
      obj => !options.includes(obj[display]));

    // Get all the objects that were selected.
    const selected = fromList.filter(
      obj => options.includes(obj[display]));

    // Get a new "to" list by adding the selected objects
    // to the current ones.
    const newTo = toList.concat(selected);

    // Sort both new lists.
    newFrom.sort(this.sortFn);
    newTo.sort(this.sortFn);

    // Tell the parent component about the change.
    const newLeft = fromLeft ? newFrom : newTo;
    const newRight = fromLeft ? newTo : newFrom;
    this.props.onUpdate(newLeft, newRight);
  }

  render() {
    const {display, left, right, size} = this.props;

    return (
      <div className="vr-list-swap">
        <select className="list" id="left" multiple size={size}>
          {VRListSwap.getOptions(left, display)}
        </select>
        <div>
          <button onClick={this.moveRight}>-&gt;</button>
          <br/>
          <button onClick={this.moveLeft}>&lt;-</button>
        </div>
        <select className="list" id="right" multiple size={size}>
          {VRListSwap.getOptions(right, display)}
        </select>
      </div>
    );
  }
}

export default VRListSwap;
