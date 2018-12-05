import React, { Component } from 'react';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Track from './pages/Track';
import { Run } from './types';

type State = {
  page: 'home' | 'track' | 'detail';
  selectedRunId: number | null;
  runList: Run[]
}
class App extends Component<null, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      page: 'home',
      selectedRunId: null,
      runList: [],
    }
    this.addRun = this.addRun.bind(this);
  }
  addRun(partialRun: Run) {
    this.setState(() => {

      this.runList.push({
        ...partialRun,
        id: this.runList.length + 1,
      });
    });
  }
  render() {
    return (
      <div>
        {(this.state.page === 'home') ? <Home runList={this.state.runList}/> : null}
        {(this.state.page === 'track') ? <Track addRun={this.addRun}/> : null}
        {(this.state.page === 'detail' && this.state.selectedRunId) ? <Detail runList={this.state.runList} selectedRunId={this.state.selectedRunId} /> : null}
      </div>
    );
  }
}

export default App;
