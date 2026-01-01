import type { Component } from 'solid-js';

const EdgeMarker: Component = () => {
  return (
    <marker
      id="arrowHead"
      viewBox="0 0 10 10"
      refX="8"
      refY="4"
      markerWidth="8"
      markerHeight="8"
      orient="auto"
      markerUnits="userSpaceOnUse"
      fill="context-stroke"
    >
      <polygon points="0 0, 8 4, 0 8" />
    </marker>
  );
};

export default EdgeMarker;
