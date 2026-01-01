import {
  createContext,
  createSignal,
  type ParentComponent,
  useContext,
} from 'solid-js';
import type { Drag } from '@/types';

type DragContextValue = {
  drag: ReturnType<typeof createSignal<Drag | undefined>>[0];
  setDrag: ReturnType<typeof createSignal<Drag | undefined>>[1];
};

const DragContext = createContext<DragContextValue>();

/**
 * Provides a context for managing drag state in the workflow editor.
 * Wraps children components and exposes drag signals for tracking drag operations.
 * @param props - The children components to wrap with the drag context.
 */
export const DragProvider: ParentComponent = (props) => {
  const [drag, setDrag] = createSignal<Drag | undefined>();

  return (
    <DragContext.Provider value={{ drag, setDrag }}>
      {props.children}
    </DragContext.Provider>
  );
};

/**
 * Hook to access the drag context.
 * @returns The current drag state and setter function.
 * @throws Error if called outside of a DragProvider.
 */
export function useDragContext() {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error(
      'useDragContext should be called inside its ContextProvider',
    );
  }
  return context;
}
