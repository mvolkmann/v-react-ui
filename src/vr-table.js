import React from 'react';

const {arrayOf, bool, func, number, shape, string} = React.PropTypes;

// max-statements-per-line doesn't work!

class VRTable extends React.Component {
  static propTypes = {
    columns: arrayOf(shape({
      heading: string.isRequired,
      property: string.isRequired
    })).isRequired,
    filter: bool, // true to include filter row below heading row
    getData: func.isRequired,
    pageSize: number, // for pagination
    startRow: number // for pagination; NOT USED YET
  };

  static defaultProps = {size: 5};

  constructor(props) {
    super(props);

    const {columns, pageSize} = props;

    this.state = {
      config: {
        filters: [],
        page: 1,
        pageCount: 1,
        pageSize,
        sort: {
          ascending: true,
          property: columns[0].property,
          type: columns[0].type
        }
      }
    };
  }

  componentDidMount() {
    this.refresh();
  }

  changeFilter(index, event) {
    const {config} = this.state;
    console.log('vr-table.js changeFilter: config =', config);
    const {filters} = config;
    filters[index] = event.target.value;
    this.setState({config});
  }

  refresh() {
    const {config} = this.state;
    this.props.getData(config).then(({config, data}) => {
      const {page, pageCount} = config;
      this.setState({data, page, pageCount});
    });
  }

  sort(column) {
    const {sort} = this.state.config;
    sort.ascending = true; //TODO: Fix
    sort.property = column.property;
    sort.type = column.type;
    this.refresh();
  }

  render() {
    const {config, data} = this.state;
    if (!data) return null;

    const {filters, page, pageCount, sort} = config;
    const {columns, filter} = this.props;

    const headings = columns.map((column, index) =>
      <th key={index} onClick={this.sort.bind(this, column)}>
        {column.heading}
        {
          column.property !== sort.property ? <span className="sort"/> :
          sort.ascending ? <span className="sort">&#x25b2;</span> :
            <span className="sort">&#x25bc;</span>
        }
      </th>);

    const filterRow = !filter ? null :
      <tr>
        {
          columns.map((column, index) => {
            const filter = filters[index];
            return <td key={index}>
              <input
                onChange={this.changeFilter.bind(this, index)}
                type={column.type}
                value={filter ? filter.value : ''}
              />
            </td>;
          })
        }
        <td><button onClick={this.refresh}>Apply</button></td>
      </tr>;

    const rows = data.map((obj, index) =>
      <tr key={index}>
        {
          columns.map((column, index) =>
            <td className={column.type} key={index}>
              {obj[column.property]}
            </td>)
        }
      </tr>);

    return (
      <div>
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

        {
          pageCount === 1 ? null :
            <div>
              Showing page #{page}.
              NEED PAGINATION BUTTONS!
            </div>
        }
      </div>
    );
  }
}

export default VRTable;
