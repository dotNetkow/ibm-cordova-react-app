import React, { Component, MouseEvent } from 'react';
import { Run } from '../types';
import { calcHaversineDistance } from '../utils';
import { format } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds'

type Props = {
  runList: Run[]
}

class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onTrackClick = this.onTrackClick.bind(this);
  }
  onTrackClick(e: MouseEvent) {

  }
  render() {
    return (
      <div>
        <h1>Run Lover</h1>
        <ul>
          { this.props.runList.map(item => {
            const duration = differenceInSeconds(item.startDateTime, item.endDateTime);
            const distance = calcHaversineDistance(item.startCoordinate, item.endCoordinate);
            return (
              <li>
                {format(item.startDateTime, 'dd/MM/yyyy')}<br/>
                {format(duration, 'mm:ss:SSS')}<br/>
                {distance} m
              </li>
          ))}
        </ul>
        <button onClick={this.onTrackClick}>Track Run</button>
      </div>
    );
  }
}

export default Home;