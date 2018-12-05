export type Coordinate = [number, number];

export type Run = {
  id: string;
  startDateTime: Date;
  endDateTime: Date;
  coordinateList: Coordinate[];
  distance: number;
}
