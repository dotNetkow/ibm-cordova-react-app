import React, { Component } from 'react';
import { Run } from '../types';
import { calcHaversineDistance } from '../utils';
import { format } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds'


type Props = {
  runList: Run[],
  selectedRunId: number
}

class Home extends Component<Props> {
  render() {
    const run = this.props.runList.find(r => r.id === this.props.selectedRunId);
    if (!run) {
      return null;
    }
    const duration = differenceInSeconds(run.startDateTime, run.endDateTime)
    const distance = calcHaversineDistance(run.startCoordinate, run.endCoordinate);

    return (
      <div>
        <h1>Run Detail</h1>
        <div>
          <dl>
            <dt>
              Duration: {format(duration, 'mm:ss:SSS')}<br/>
              Distance: {distance} m
            </dt>
            <dd>
              {format(this.props.run.startDateTime, 'dd/MM/yyyy')}
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default Home;