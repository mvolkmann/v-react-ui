import React from 'react';

const {arrayOf, bool, number, object, shape, string} = React.PropTypes;

class VRTable extends React.Component {
  static propTypes = {
    columns: arrayOf(shape({
      heading: string.isRequired,
      property: string.isRequired
    })).isRequired,
    data: arrayOf(object).isRequired,
    filter: bool, // true to include filter row below heading row
    maxRows: number // for pagination
  };

  static defaultProps = {size: 5};

  constructor(props) {
    super(props);

    this.state = {
      filteredData: props.data,
      filters: [],
      sortAscending: true,
      sortColumn: props.columns[0]
    };

    // Prebind
    this.filter = this.filter.bind(this);
  }

  changeFilter(index, event) {
    const {filters} = this.state;
    filters[index] = event.target.value;
    this.setState({filters});
  }

  filter() {
    const {columns, data} = this.props;
    const {filters, sortAscending, sortColumn} = this.state;
    const filteredData = data.filter(obj =>
      columns.every((column, index) => {
        const {property, type} = column;
        const value = obj[property];
        const filter = filters[index];
        return !filter ? true :
          type === 'string' ? value.includes(filter) :
          type === 'number' ? value === Number(filter) :
          true; // cannot yet filter other types
      }));
    this.sortData(filteredData, sortColumn, sortAscending);
    this.setState({filteredData});
  }

  sortData(data, column, ascending) {
    const {property, type} = column;
    data.sort((obj1, obj2) => {
      const value1 = obj1[property];
      const value2 = obj2[property];
      const sortValue =
        type === 'string' ? value1.localeCompare(value2) :
        type === 'number' ? value1 - value2 :
        0; // can't currently sort any other types
      return ascending ? sortValue : -sortValue;
    });
  }

  sortColumn(column) {
    const {filteredData, sortColumn} = this.state;
    const sortAscending =
      column === sortColumn ? !this.state.sortAscending : true;
    this.sortData(filteredData, column, sortAscending);
    this.setState({filteredData, sortAscending, sortColumn: column});
  }

  render() {
    const {columns, filter} = this.props;
    const {filteredData, filters, sortAscending, sortColumn} = this.state;

    const headings = columns.map((column, index) =>
      <th key={index} onClick={this.sortColumn.bind(this, column)}>
        {column.heading}
        {
          column !== sortColumn ? <span className="sort"/> :
          sortAscending ? <span className="sort">&#x25b2;</span> :
            <span className="sort">&#x25bc;</span>
        }
      </th>);

    const filterRow = !filter ? null :
      <tr>
        {
          columns.map((column, index) =>
            <td key={index}>
              <input
                onChange={this.changeFilter.bind(this, index)}
                type={column.type}
                value={filters[index] || ''}/>
            </td>)
        }
        <td><button onClick={this.filter}>Apply</button></td>
      </tr>;

    const rows = filteredData.map((obj, index) =>
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
        <thead>
          <tr className="headings">
            {headings}
          </tr>
          {filterRow}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default VRTable;
