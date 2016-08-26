import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar'
import Calculator from './Calculator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="Weight Calculator" />
        <Calculator />
      </div>
    );
  }
}

export default App;
