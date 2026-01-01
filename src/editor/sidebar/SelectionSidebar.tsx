import {
  type Accessor,
  type Component,
  createMemo,
  Match,
  Switch,
} from 'solid-js';
import type { Selection } from '../../types';
import SidebarContentForEdge from './SidebarContentForEdge';
import SidebarContentForNode from './SidebarContentForNode';

const SelectionSidebar: Component<{
  selection: Accessor<Selection | undefined>;
}> = ({ selection }) => {
  const getNodeSelection = createMemo(() => {
    const s = selection();
    return s?.type === 'node' ? s : undefined;
  });

  const getEdgeSelection = createMemo(() => {
    const s = selection();
    return s?.type === 'edge' ? s : undefined;
  });

  return (
    <div
      class="absolute top-24 right-4 z-10 w-50 rounded-xl border-2 border-gray-300 bg-white p-4"
      data-sidebar
    >
      <Switch>
        <Match when={getNodeSelection()}>
          {(s) => <SidebarContentForNode selection={s} />}
        </Match>
        <Match when={getEdgeSelection()}>
          {(s) => <SidebarContentForEdge selection={s} />}
        </Match>
      </Switch>
    </div>
  );
};

export default SelectionSidebar;
