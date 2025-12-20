export type Node = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
}

export type Vec = { x: number, y: number };

export type Workflow = {nodes: Record<string, Node>, edges: Record<string, Edge>};
export type Drag = { id: string, posRelToNode: Vec };
export type Side = 'left' | 'right' | 'top' | 'bottom';

export type Edge = {
  id: string;
  from: string;
  to: string;
  fromSide: Side;
  toSide: Side;
  title?: string
}
