import type { Component } from 'solid-js';
import Icon from './editor/Icon';
import {
  DragProvider,
  SelectionProvider,
  WorkflowProvider,
} from './editor/stores';
import WorkflowEditor from './editor/WorkflowEditor';
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
