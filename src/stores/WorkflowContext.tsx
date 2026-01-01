import { createContext, type ParentComponent, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { Edge, Node, Workflow } from '@/types';

/**
 * Creates a workflow store with methods for managing workflow state.
 * @param workflow - The initial workflow data containing nodes and edges.
 * @returns An object containing the workflow state and methods to modify it.
 */
function createWorkflowStore(workflow: Workflow) {
  const [workflowState, setWorkflow] = createStore<Workflow>(workflow);

  /**
   * Removes a node from the workflow and all connected edges.
   * @param nodeId - The ID of the node to delete.
   */
  function deleteNode(nodeId: string) {
    setWorkflow((workflow) => {
      const { [nodeId]: _, ...rest } = workflow.nodes;
      const edges = Object.entries(workflow.edges).filter(
        ([_, edge]) => edge.from !== nodeId && edge.to !== nodeId,
      );
      return {
        ...workflow,
        edges: Object.fromEntries(edges),
        nodes: rest,
      };
    });
  }

  /**
   * Removes an edge from the workflow.
   * @param edgeId - The ID of the edge to delete.
   */
  function deleteEdge(edgeId: string) {
    setWorkflow((workflow) => {
      const { [edgeId]: _, ...rest } = workflow.edges;
      return {
        ...workflow,
        edges: rest,
      };
    });
  }

  /**
   * Updates an edge's properties in the workflow.
   * @param edgeId - The ID of the edge to update.
   * @param partialEdge - The partial edge data to merge with the existing edge.
   */
  function updateEdge(edgeId: string, partialEdge: Partial<Edge>) {
    const edge = workflow.edges[edgeId];
    setWorkflow((workflow) => ({
      ...workflow,
      edges: { ...workflow.edges, [edgeId]: { ...edge, ...partialEdge } },
    }));
  }

  /**
   * Updates a node's properties in the workflow.
   * @param nodeId - The ID of the node to update.
   * @param partialNode - The partial node data to merge with the existing node.
   */
  function updateNode(nodeId: string, partialNode: Partial<Node>) {
    const node = workflow.nodes[nodeId];
    setWorkflow((workflow) => ({
      ...workflow,
      nodes: { ...workflow.nodes, [nodeId]: { ...node, ...partialNode } },
    }));
  }

  return {
    workflow: workflowState,
    setWorkflow,
    deleteNode,
    deleteEdge,
    updateEdge,
    updateNode,
  };
}

type WorkflowContextValue = ReturnType<typeof createWorkflowStore>;

const WorkflowContext = createContext<WorkflowContextValue>();

/**
 * Provides a context for managing workflow state.
 * Wraps children components and exposes the workflow store with methods for manipulation.
 * @param props - The initial workflow data and children components.
 */
export const WorkflowProvider: ParentComponent<{ workflow: Workflow }> = (
  props,
) => {
  const workflowStore = createWorkflowStore(props.workflow);
  return (
    <WorkflowContext.Provider value={workflowStore}>
      {props.children}
    </WorkflowContext.Provider>
  );
};

/**
 * Hook to access the workflow context.
 * @returns The workflow state and methods for manipulation.
 * @throws Error if called outside of a WorkflowProvider.
 */
export const useWorkflowContext = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error(
      'useWorkflowContext should be called inside its ContextProvider',
    );
  }
  return context;
};
