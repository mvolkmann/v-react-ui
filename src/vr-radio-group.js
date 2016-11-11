import React from 'react';

const VRRadioGroup = ({
  onChange, options, selectedOptions, setName, title
}) =>
  <div>
    <label className="form-label">{title}</label>
    <div className="checkbox-group">
      {
        options.map(option =>
          <label key={option} className="form-label capitalize">
            <input
              checked={selectedOptions.indexOf(option) > -1}
              className="form-checkbox"
              name={setName}
              onChange={onChange}
              type="radio"
              value={option}
            />
            {option}
          </label>)
      }
    </div>
  </div>;

const {arrayOf, func, string} = React.PropTypes;
VRRadioGroup.propTypes = {
  onChange: func.isRequired,
  options: arrayOf(string).isRequired,
  selectedOptions: arrayOf(string),
  setName: string.isRequired,
  title: string.isRequired
};

export default VRRadioGroup;
