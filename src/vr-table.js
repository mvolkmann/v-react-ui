import React from 'react';

const {arrayOf, func, number, object, shape, string} = React.PropTypes;

class VRTable extends React.Component {
  static propTypes = {
    columns: arrayOf(shape({
      heading: string.isRequired,
      property: string.isRequired,
      sortDirection: string
    })).isRequired,
    data: arrayOf(object).isRequired,
    maxRows: number
  };

  static defaultProps = {
    size: 5
  };

  constructor(props) {
    super(props);

    this.state = {
      sortAscending: true,
      sortColumn: props.columns[0],
      sortedData: props.data
    };

    // Prebind
    //this.moveLeft = this.moveFrom.bind(this, 'right');
  }

  sort(column) {
    const sortAscending = column === this.state.sortColumn ?
      !this.state.sortAscending : true;

    const {type} = column;

    const sortedData = this.props.data.sort((obj1, obj2) => {
      const value1 = obj1[column.property];
      const value2 = obj2[column.property];
      const sortValue =
        type === 'string' ? value1.localeCompare(value2) :
        type === 'number' ? value1 - value2 :
        0; // can't currently sort any other types
      return sortAscending ? sortValue : -sortValue;
    });

    this.setState({
      sortAscending,
      sortColumn: column,
      sortedData
    });
  }

  render() {
    const {columns, maxRows} = this.props;

    const {sortAscending, sortColumn, sortedData} = this.state;

    const headings = columns.map((column, index) =>
      <th key={index} onClick={this.sort.bind(this, column)}>
        {column.heading}
        {
          column !== sortColumn ? <span className="sort"/> :
          sortAscending ? <span className="sort">&#x25b2;</span> :
            <span>&#x25bc;</span>
        }
      </th>);

    const rows = sortedData.map((obj, index) =>
      <tr key={index}>
        {
          columns.map((column, index) =>
            <td className={column.type} key={index}>
              {obj[column.property]}
            </td>)
        }
      </tr>);

    return (
      <table className="vr-table">
        <tr className="headings">
          {headings}
        </tr>
        {rows}
      </table>
    );
  }
}

export default VRTable;
