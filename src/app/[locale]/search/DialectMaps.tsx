"use client";

import "./DialectMaps.css";
import data from "./dialect_maps.json";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "@vnedyalk0v/react19-simple-maps";
import { FC, use } from "react";

type LatLng = {
  lat: number;
  lng: number;
};

const dialectCoordinates: Record<string, LatLng> = {
  "樺太/西海岸/小田洲": { lat: 48.321389, lng: 142.148611 },
  "樺太/西海岸/鵜城": { lat: 48.841889, lng: 141.930778 },
  "樺太/西海岸/来知志": { lat: 48.416667, lng: 142.083333 },

  "北海道/南西/沙流": { lat: 42.5833, lng: 142.1167 },
  "北海道/南西/千歳": { lat: 42.819, lng: 141.6521 },
  "北海道/南西/鵡川": { lat: 42.5747, lng: 141.9261 },
  "北海道/南西/幌別": { lat: 42.4523, lng: 141.1791 },
  "北海道/南西/虻田": { lat: 42.553, lng: 140.7577 },
  "北海道/南西/白老": { lat: 42.551, lng: 141.3577 },

  "北海道/北東/静内": { lat: 42.3367, lng: 142.3686 },
  "北海道/北東/石狩": { lat: 43.7706, lng: 142.3649 },
  "北海道/北東/白糠": { lat: 42.9583, lng: 144.077 },
  "北海道/北東/十勝": { lat: 42.9236, lng: 143.1967 },
  "北海道/北東/釧路": { lat: 42.9849, lng: 144.3814 },
  "北海道/北東/浦河": { lat: 42.1667, lng: 142.7667 },
  "北海道/北東/美幌": { lat: 43.8236, lng: 144.1067 },
  "北海道/北東/様似": { lat: 42.1278, lng: 142.9386 },
};

export type DialectMapsProps = {
  facetsPromise: Promise<Record<string, Record<string, number>>>;
};

export const DialectMaps: FC<DialectMapsProps> = (props) => {
  const { facetsPromise } = props;

  const facets = use(facetsPromise);

  const countsWithCoords = Object.entries(facets.dialect_lv3)
    .filter(([key]) => key in dialectCoordinates)
    .map(([key, count]) => {
      return {
        key,
        count,
        coords: dialectCoordinates[key],
      };
    });

  return (
    <ComposableMap
      id="DialectSelectorMap"
      projection="geoMercator"
      projectionConfig={{
        scale: 3500,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rotate: [-148.0, -46, 0] as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        center: [0, 0] as any,
      }}
    >
      <title>北海道・南樺太・千島列島の地図（メルカトル図法）</title>

      <Geographies geography={data} className="geographies">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>

      <g aria-hidden>
        {countsWithCoords.map((count) => (
          <Marker
            key={count.key}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            coordinates={[count.coords.lng, count.coords.lat] as any}
          >
            <circle r={2.5 * Math.sqrt(count.count)} className="circle" />
          </Marker>
        ))}
      </g>
    </ComposableMap>
  );
};
