import React, {Component} from 'react';
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
    this.onListUpdate = this.onListUpdate.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  onListUpdate(left, right) {
    this.setState({leftSports: left, rightSports: right});
  }

  onStateChange(usState) {
    this.setState({selectedUsState: usState});
  }

  render() {
    const {columns, leftSports, rightSports, sports} = this.state;

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
          update={this.onListUpdate}/>

        <VRTable columns={columns} data={sports}/>
      </div>
    );
  }
}

export default App;
