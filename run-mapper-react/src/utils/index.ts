import { format, parse } from 'date-fns';
import { Coordinate } from '../types';

/**
 * Calculates the haversine distance between point A, and B.
 * @param {number[]} latlngA [lat, lng] point A
 * @param {number[]} latlngB [lat, lng] point B
 * @param {boolean} isMiles If we are using miles, else km.
 */
const toRad = (x: number) => (x * Math.PI) / 180;
const R = 6371; // km

export function calcHaversineDistance(latlngA: Coordinate, latlngB: Coordinate, isMiles = true) {

  const dLat = toRad(latlngB[0] - latlngA[0]);
  const dLatSin = Math.sin(dLat / 2);
  const dLon = toRad(latlngB[1] - latlngA[1]);
  const dLonSin = Math.sin(dLon / 2);

  const a = (dLatSin * dLatSin) +
            (Math.cos(toRad(latlngA[1])) * Math.cos(toRad(latlngB[1])) * dLonSin * dLonSin);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c;

  if (isMiles) distance /= 1.60934;

  return distance;
}
