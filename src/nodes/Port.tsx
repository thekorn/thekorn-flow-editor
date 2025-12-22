import type { Component } from 'solid-js';
import type { Side } from '../types';

const Port: Component<{ side: Side }> = ({ side }) => {
  return (
    <div
      data-port
      data-side={side}
      class="absolute w-5 h-5 border-[3px] rounded-full group-hover:opacity-100 opacity-0"
      classList={{
        'bg-radial-[Circle_at_Center,var(--color-blue-700)_3px,transparent_4px]': true,
        '-left-[10px]': side === 'left',
        '-right-[10px]': side === 'right',
        'top-[calc(50%_-10px)]': side === 'left' || side === 'right',
        '-top-[10px]': side === 'top',
        '-bottom-[10px]': side === 'bottom',
        'left-[calc(50%_-10px)]': side === 'top' || side === 'bottom',
      }}
    />
  );
};

export default Port;
