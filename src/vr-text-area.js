import React from 'react';

const VRTextArea = ({
  content, name, onChange, placeholder, resize, rows, title
}) =>
  <div className="form-group">
    <label className="form-label">{title}</label>
    <textarea
      className="form-input"
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={resize ? null : {resize: 'none'}}
      value={content}
    />
  </div>;

const {bool, func, number, string} = React.PropTypes;
VRTextArea.propTypes = {
  content: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  placeholder: string,
  resize: bool,
  rows: number.isRequired,
  title: string.isRequired
};

export default VRTextArea;
