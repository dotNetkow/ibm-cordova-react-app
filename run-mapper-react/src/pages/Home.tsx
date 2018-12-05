import React, { Component, MouseEvent } from 'react';
import { Run } from '../types';
import { format } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds'

type Props = {
  runList: Run[]
  setSelectedRun: (selectedRunId: string) => void
  setTrackRun: () => void;
}

class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onTrackClick = this.onTrackClick.bind(this);
  }
  onTrackClick(e: MouseEvent) {
    this.props.setTrackRun();
  }
  render() {
    return (
      <div>
        <h1>All Runs</h1>
        <ul>
          { this.props.runList.map(item => {
            const duration = differenceInSeconds(item.startDateTime, item.endDateTime);
            return (
              <li>
                {format(item.startDateTime, 'dd/MM/yyyy')}<br/>
                {format(duration, 'mm:ss:SSS')}<br/>
                {item.distance} m
              </li>
            );
          }) }
        </ul>
        <button onClick={this.onTrackClick}>Track Run</button>
      </div>
    );
  }
}

export default Home;