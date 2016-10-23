import React, {Component} from 'react';
import VRListSwap from './vr-list-swap';
import VRStateSelect from './vr-state-select';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      leftSports: [
        {name: 'Baseball', ball: 'baseball'},
        {name: 'Football', ball: 'football'},
        {name: 'Hockey', ball: 'puck'}
      ],
      rightSports: [
        {name: 'Golf', ball: 'golf ball'}
      ]
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
    const {leftSports, rightSports} = this.state;

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
      </div>
    );
  }
}

export default App;
