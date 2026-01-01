import { icons, type LucideProps } from 'lucide-solid';

/** The names of available Lucide icons that can be used in the workflow editor. */
export type IconName = Extract<
  keyof typeof icons,
  'FileInput' | 'Sun' | 'Crop' | 'RotateCw' | 'Droplet'
>;

/** Represents a node in the workflow graph. */
export type Node = {
  /** Unique identifier for the node. */
  id: string;
  /** X coordinate of the node's position. */
  x: number;
  /** Y coordinate of the node's position. */
  y: number;
  /** Width of the node in pixels. */
  width: number;
  /** Height of the node in pixels. */
  height: number;
  /** The visual shape of the node. */
  shape: NodeShape;
  /** Display title of the node. */
  title: string;
};

/** Available shapes for rendering nodes. */
export type NodeShape = 'rectangle' | 'diamond' | 'pill' | 'ellipse';

/** A 2D vector representing a point or position in the editor. */
export type Vec = { x: number; y: number };

/** The complete workflow data structure containing all nodes and edges. */
export type Workflow = {
  /** Map of node IDs to their node data. */
  nodes: Record<string, Node>;
  /** Map of edge IDs to their edge data. */
  edges: Record<string, Edge>;
};

type DragNode = { type: 'node'; id: string; posRelToNode: Vec };

/** Represents an edge being dragged from a node's port. */
export type DragEdge = {
  type: 'edge';
  /** The ID of the node the edge is being dragged from. */
  fromNodeId: string;
  /** The side of the source node where the edge originates. */
  fromSide: Side;
  /** The current position relative to the grid. */
  posRelToGrid: Vec;
};

type DragGrid = { type: 'grid'; startPos: Vec; startTranslation: Vec };

/** Union type representing the current drag operation. */
export type Drag = DragNode | DragEdge | DragGrid;

/**
 * Type guard to check if a drag operation is dragging a node.
 * @param drag - The drag operation to check.
 * @returns True if the drag is a DragNode.
 */
export function isDragNode(drag?: Drag): drag is DragNode {
  return drag?.type === 'node';
}

/**
 * Type guard to check if a drag operation is creating an edge.
 * @param drag - The drag operation to check.
 * @returns True if the drag is a DragEdge.
 */
export function isDragEdge(drag?: Drag): drag is DragEdge {
  return drag?.type === 'edge';
}

/**
 * Type guard to check if a drag operation is panning the grid.
 * @param drag - The drag operation to check.
 * @returns True if the drag is a DragGrid.
 */
export function isDragGrid(drag?: Drag): drag is DragGrid {
  return drag?.type === 'grid';
}

/** The four sides of a node where edges can connect. */
export type Side = 'left' | 'right' | 'top' | 'bottom';

/** Represents a connection between two nodes in the workflow graph. */
export type Edge = {
  /** Unique identifier for the edge. */
  id: string;
  /** The ID of the source node. */
  from: string;
  /** The ID of the target node. */
  to: string;
  /** The side of the source node where the edge connects. */
  fromSide: Side;
  /** The side of the target node where the edge connects. */
  toSide: Side;
  /** Optional display title for the edge. */
  title?: string;
};

/** A template for creating new nodes in the workflow editor. */
export type NodeTemplate = {
  /** Unique identifier for the template. */
  id: string;
  /** Width of the node in pixels. */
  width: number;
  /** Height of the node in pixels. */
  height: number;
  /** The visual shape of the node. */
  shape: NodeShape;
  /** Display title of the node. */
  title: string;
  /** The icon to display on the node. */
  icon: IconName;
};

/** Props for rendering an icon component. */
export interface IconProps extends LucideProps {
  /** The name of the icon to display. */
  name: IconName;
}

/**
 * Type guard to check if a string is a valid icon name.
 * @param name - The string to check.
 * @returns True if the string is a valid IconName.
 */
export const isLucidIcon = (name?: string): name is IconName =>
  !!name && name in icons;

/** Represents the currently selected item in the workflow editor. */
export type Selection = {
  /** The type of the selected item. */
  type: 'node' | 'edge';
  /** The ID of the selected item. */
  id: string;
};
