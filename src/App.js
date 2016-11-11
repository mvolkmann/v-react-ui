import React, {Component} from 'react';
import PetAdoptionForm from './pet-adoption-form';
import VRListSwap from './vr-list-swap';
import VRStateSelect from './vr-state-select';
import VRTable from './vr-table';
import './App.css';

class App extends Component {
  constructor() {
    super();

    const columns = [
      {heading: 'Sport Name', property: 'name', type: 'string'},
      {heading: 'Ball Used', property: 'ball', type: 'string'},
      {heading: 'Team Size', property: 'teamSize', type: 'number'}
    ];
    const sports = [
      {name: 'Baseball', ball: 'baseball', teamSize: 9},
      {name: 'Football', ball: 'football', teamSize: 11},
      {name: 'Golf', ball: 'golf ball', teamSize: 1},
      {name: 'Hockey', ball: 'puck', teamSize: 6}
    ];
    this.state = {
      columns,
      sports,
      leftSports: sports,
      rightSports: []
    };

    // Pre-binds
    this.getSports = this.getSports.bind(this);
    this.onListUpdate = this.onListUpdate.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  getSports(config) {
    const {sports} = this.state;
    const {filters, pageNumber, pageSize, sort} = config;
    const {ascending, property: sortProperty, type: sortType} = sort;

    return new Promise(resolve => {
      let data = sports;

      if (filters) {
        // Filter the data.
        data = sports.filter(obj =>
          filters.every(({property, value, type}) => {
            const objValue = obj[property];
            return !value ? true :
              type === 'string' ? objValue.includes(value) :
              type === 'number' ? objValue === Number(value) :
              true; // cannot yet filter other types
          }));
      }

      // Sort the data.
      data.sort((obj1, obj2) => {
        const value1 = obj1[sortProperty];
        const value2 = obj2[sortProperty];
        const sortValue =
          sortType === 'string' ? value1.localeCompare(value2) :
          sortType === 'number' ? value1 - value2 :
          0; // can't currently sort any other types
        return ascending ? sortValue : -sortValue;
      });

      // Get the requested page of data.
      const pageCount = Math.floor(data.length / pageSize) + 1;
      const page = pageNumber <= pageCount ? pageNumber : 1;
      const startIndex = (page - 1) * pageSize;
      data = data.slice(startIndex, startIndex + pageSize);

      config.page = page;
      config.pageCount = pageCount;

      resolve({config, data});
    });
  }

  onListUpdate(left, right) {
    this.setState({leftSports: left, rightSports: right});
  }

  onStateChange(usState) {
    this.setState({selectedUsState: usState});
  }

  render() {
    const {columns, leftSports, rightSports} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>

        <div>
          <label>State:</label>
          <VRStateSelect onChange={this.onStateChange}/>
        </div>
        <div>
          You selected {this.state.selectedUsState}.
        </div>

        <VRListSwap
          left={leftSports}
          right={rightSports}
          display="name"
          onUpdate={this.onListUpdate}
        />

        <VRTable
          columns={columns}
          filter
          getData={this.getSports}
          pageSize={2}
        />

        <div className="container">
          <div className="columns">
            <div className="col-md-9 centered">
              <PetAdoptionForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
