import React from 'react';

const VRInput = ({
  content, inputType, name, onChange, placeholder, title
}) =>
  <div className="form-group">
    <label className="form-label">{title}</label>
    <input
      className="form-input"
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={inputType}
      value={content}
    />
  </div>;

const {func, number, oneOf, oneOfType, string} = React.PropTypes;
VRInput.propTypes = {
  content: oneOfType([string, number]).isRequired,
  inputType: oneOf(['text', 'number']).isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  placeholder: string,
  title: string.isRequired
};

export default VRInput;
