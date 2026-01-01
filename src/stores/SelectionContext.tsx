import {
  createContext,
  createSignal,
  type ParentComponent,
  useContext,
} from 'solid-js';
import type { Selection } from '@/types';

type SelectionContextValue = {
  selection: ReturnType<typeof createSignal<Selection | undefined>>[0];
  setSelection: ReturnType<typeof createSignal<Selection | undefined>>[1];
};

const SelectionContext = createContext<SelectionContextValue>();

/**
 * Provides a context for managing selection state in the workflow editor.
 * Wraps children components and exposes selection signals for tracking selected items.
 * @param props - The children components to wrap with the selection context.
 */
export const SelectionProvider: ParentComponent = (props) => {
  const [selection, setSelection] = createSignal<Selection | undefined>();

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {props.children}
    </SelectionContext.Provider>
  );
};

/**
 * Hook to access the selection context.
 * @returns The current selection state and setter function.
 * @throws Error if called outside of a SelectionProvider.
 */
export function useSelectionContext() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error(
      'useSelectionContext should be called inside its ContextProvider',
    );
  }
  return context;
}
