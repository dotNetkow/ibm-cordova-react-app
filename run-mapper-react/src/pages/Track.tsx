import React, { Component } from 'react';
import { Coordinate, Run } from '../types';
import { calcHaversineDistance } from '../utils';
import { format } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds'

type Props = {
  addRun: (r: Run) => void
}

type State = {
  startDateTime: Date | null;
  endDateTime: Date | null;
  coordinateList: Coordinate[];
  distance: number | null
}

class Home extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      startDateTime: null,
      endDateTime: null,
      coordinateList: [],
      distance: null
    }

    this.startTracking = this.startTracking.bind(this);
    this.stopTracking = this.stopTracking.bind(this);
    this.saveRun = this.saveRun.bind(this);
    this.reset = this.reset.bind(this);
  }
  startTracking() {

  }
  stopTracking() {

  }
  saveRun() {
    if (this.state.startDateTime && this.state.endDateTime && this.state.distance) {
      this.props.addRun({
        id: 'new',
        startDateTime: this.state.startDateTime,
        endDateTime: this.state.endDateTime,
        coordinateList: this.state.coordinateList,
        distance: this.state.distance
      });
    }
  }
  reset() {

  }
  render() {
    const duration = (this.state.startDateTime && this.state.endDateTime) ?
        differenceInSeconds(this.state.startDateTime, this.state.endDateTime) :
        0;

    return (
      <div>
        <h1>Track Run</h1>
        <div>
          <dl>
            <dt>
              {format(duration, 'mm:ss:SSS')}<br/>
              {this.state.distance} m
            </dt>
          </dl>
          <div>
            <button onClick={this.startTracking}>Start</button>
          </div>
          <div>
            <button onClick={this.stopTracking}>Stop</button>
            <button onClick={this.saveRun}>Save</button>
            <button onClick={this.reset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;