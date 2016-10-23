import React from 'react';

const {arrayOf, func, shape, string} = React.PropTypes;

class VRDropDown extends React.Component {
  static propTypes = {
    onChange: func.isRequired,
    options: arrayOf(shape({
      text: string.isRequired,
      value: string.isRequired
    })).isRequired
  };

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const {onChange, options} = this.props;
    //TODO: Why does this get called once without props?
    if (options) {
      // Select the first value.
      //TODO: Why does this have to be done here instead of in constructor?
      onChange(options[0].value);
    }
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <select className="vr-drop-down" onChange={this.onChange}>
      {
        this.props.options.map(opt =>
          <option key={opt.value} value={opt.value}>{opt.text}</option>)
      }
      </select>);
  }
}

export default VRDropDown;
