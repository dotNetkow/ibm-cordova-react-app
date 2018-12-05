import React, { Component } from 'react';
import { Run } from '../types';
import { calcHaversineDistance } from '../utils';
import { format } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds'


type Props = {
  runList: Run[],
  selectedRunId: string
}

class Home extends Component<Props> {
  render() {
    const run = this.props.runList.find(r => r.id === this.props.selectedRunId);
    if (!run) {
      return null;
    }
    const duration = differenceInSeconds(run.startDateTime, run.endDateTime)

    return (
      <div>
        <h1>Run Detail</h1>
        <div>
          <dl>
            <dt>
              Duration: {format(duration, 'mm:ss:SSS')}<br/>
              Distance: {run.distance} m
            </dt>
            <dd>
              {format(run.startDateTime, 'dd/MM/yyyy')}
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default Home;