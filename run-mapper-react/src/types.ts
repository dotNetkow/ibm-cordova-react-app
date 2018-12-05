export type Coordinate = [number, number];

export type Run = {
  id: number;
  startDateTime: Date;
  endDateTime: Date;
  startCoordinate: Coordinate;
  endCoordinate: Coordinate;
}
