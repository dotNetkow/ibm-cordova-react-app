import React, { Component } from 'react';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Track from './pages/Track';
import { Run } from './types';
import { getUniqueId } from './utils';
import PouchDB from 'pouchdb';

type State = {
  page: 'home' | 'track' | 'detail';
  selectedRunId: string | null;
  runList: Run[]
}
class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.retrieveRunHistory();

    this.state = {
      page: 'home',
      selectedRunId: null,
      runList: [],
    }
    this.addRun = this.addRun.bind(this);
    this.setSelectedRun = this.setSelectedRun.bind(this);
    this.setTrackRun = this.setTrackRun.bind(this);
    this.goBackHome = this.goBackHome.bind(this);
  }

  retrieveRunHistory() {
    this.state = {
      page: 'home',
      selectedRunId: null,
      runList: [],
    }

    let database = new PouchDB("react-cordova");
    database.allDocs<Run>({ include_docs: true }).then((result) => {
      
      if (result.rows.length != this.state.runList.length) {
        for(let i = 0; i < result.rows.length; i++) {
          const newRun : Run = {
            ...result.rows[i].doc
          };
          this.state.runList.push(newRun);
        }
      }
    });
  }

  addRun(partialRun: Run) {
    const newRun = {
      ...partialRun,
      id: getUniqueId(),
    };

    this.setState((prevState) => {
      return {
        ...prevState,
        runList: prevState.runList.concat(newRun)
      };
    });
  }

  setSelectedRun(selectedRunId: string) {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedRunId,
        page: 'detail'
      } 
    });
  }

  setTrackRun() {
    this.setState((prevState) => {
      return {
        ...prevState,
        page: 'track'
      } 
    });
  }

  goBackHome() {
    this.setState((prevState) => {
      return {
        ...prevState,
        page: 'home'
      }
    })
  }

  render() {
    const renderSelectedPage = (pageName: string) => {
      switch (pageName) {
      case 'track':
        return <Track addRun={this.addRun} />;
      case 'detail':
        return <Detail runList={this.state.runList} selectedRunId={this.state.selectedRunId || ''} />
      default:
        return <Home runList={this.state.runList} setSelectedRun={this.setSelectedRun} setTrackRun={this.setTrackRun} />;
      }
    }

    return (
      <div>
        <header>
          { this.state.page !== 'home' ?
            <button onClick={this.goBackHome}>&#60; Home</button> :
            null }
          React Run Mapper
        </header>
        { renderSelectedPage(this.state.page) }
      </div>
    );
  }
}

export default App;
