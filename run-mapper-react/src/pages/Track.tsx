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
  distance: number
}

class Home extends Component<Props, State> {
  geolocator: any;
  geolocation: any;
  map: any;
  mapRef: React.Ref<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      startDateTime: null,
      endDateTime: null,
      coordinateList: [],
      distance: 0
    }

    this.mapRef = React.createRef();

    this.startTracking = this.startTracking.bind(this);
    this.stopTracking = this.stopTracking.bind(this);
    this.saveRun = this.saveRun.bind(this);
    this.reset = this.reset.bind(this);
  }
  startTracking() {
    this.geolocator = navigator.geolocation.watchPosition((data: Position) => {
      if (data.coords == null) {
        return;
      }

      this.setState((prevState) => {
        const lastCoordinate = prevState.coordinateList[prevState.coordinateList.length - 1];
        const currentCoordinate: [number, number] = [data.coords.latitude, data.coords.longitude];
        let distance = prevState.distance;
        if (lastCoordinate) {
          distance += calcHaversineDistance(lastCoordinate, currentCoordinate);
        }
        return {
          ...prevState,
          distance,
          coordinateList: prevState.coordinateList.concat([currentCoordinate])
        }
      });

      this.map.moveCamera({ zoom: 15, target: {
        lat: data.coords.latitude,
        lng: data.coords.longitude
      }});


    }, () => {}, { enableHighAccuracy: true });
  }
  componentDidMount() {
    this.map = (window as any).plugin.google.maps.Map.getMap(this.mapRef);
  }
  stopTracking() {
    navigator.geolocation.clearWatch(this.geolocator);
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
        <div ref={this.mapRef} style={{ height: '100%' }}></div>
        <footer>
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
        </footer>
      </div>
    );
  }
}

export default Home;
