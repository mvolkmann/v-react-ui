import React from 'react';

const Select = ({
  name, onChange, options, placeholder, selectedOption
}) =>
  <div className="form-group">
    <select
      className="form-select"
      name={name}
      onChange={onChange}
      value={selectedOption}
    >
      <option value="">{placeholder}</option>
      {
        options.map(opt =>
          <option key={opt} value={opt}>{opt}</option>)
      }
    </select>
  </div>;

const {arrayOf, func, string} = React.PropTypes;
Select.propTypes = {
  name: string.isRequired,
  onChange: func.isRequired,
  options: arrayOf(string).isRequired,
  placeholder: string,
  selectedOption: string
};

export default Select;
