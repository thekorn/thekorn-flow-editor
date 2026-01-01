import type { Component } from 'solid-js';
import Icon from './components/editor/Icon';
import WorkflowEditor from './components/editor/WorkflowEditor';
import { DragProvider, SelectionProvider, WorkflowProvider } from './stores';
import type { NodeTemplate, Workflow } from './types';

const WorkflowApp: Component<{
  workflow: Workflow;
  templates: NodeTemplate[];
}> = ({ workflow, templates }) => {
  return (
    <WorkflowProvider workflow={workflow}>
      <DragProvider>
        <SelectionProvider>
          <WorkflowEditor nodeTemplates={templates} Icon={Icon} />
        </SelectionProvider>
      </DragProvider>
    </WorkflowProvider>
  );
};

export default WorkflowApp;
