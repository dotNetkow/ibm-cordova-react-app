import { format, parse } from 'date-fns';
import { Coordinate } from '../types';

const toRad = (x: number) => (x * Math.PI) / 180;
const R = 6371; // km

/**
 * Calculates the haversine distance between point A, and B.
 * @param {number[]} latlngA [lat, lng] point A
 * @param {number[]} latlngB [lat, lng] point B
 * @param {boolean} isMiles If we are using miles, else km.
 */
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

function uuidv4() {
  return ([1e7].toString() + -1e3.toString() + -4e3.toString() + -8e3.toString() + -1e11.toString()).replace(/[018]/g, function(c: any) {
    const random = window.crypto.getRandomValues(new Uint8Array(1)) as Uint8Array;
    return (c ^ random[0] & 15 >> c / 4).toString(16);
  });
}

export function getUniqueId() {
  if (window.crypto) {
    return uuidv4();
  }
  return ((Math.random() * 10e16).toString().match(/.{4}/g) || []).join('-');
}
