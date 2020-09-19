import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import { createHeaderLocal } from "./task-list-header";
import { GanttFooter } from "./gantt-footer";
import { ViewSwitcher } from "./view-switcher";
import { IInputs } from "../generated/ManifestTypes";
import { createTooltip } from "./gantt-tooltip";
import { creatTaskListLocal } from "./task-list-table";

export type UniversalGanttProps = {
  context: ComponentFramework.Context<IInputs>;
  tasks: Task[];
  ganttHeight?: number;
  recordDisplayName: string;
  startDisplayName: string;
  endDisplayName: string;
  progressDisplayName: string;
  listCellWidth: string;
  startFieldName: string;
  endFieldName: string;
  progressFieldName: string;
  isProgressing: boolean;
  onViewChange: (viewMode: ViewMode) => void;
} & EventOption &
  DisplayOption;
export const UniversalGantt: React.FunctionComponent<UniversalGanttProps> = (
  props
) => {
  const [view, setView] = React.useState(props.viewMode);
  const context = props.context;

  const handleDateChange = async (task: Task) => {
    const recordRef = context.parameters.entityDataSet.records[
      task.id
    ].getNamedReference();

    const entityName =
      recordRef.etn || ((recordRef as any).logicalName as string);

    try {
      await context.webAPI.updateRecord(entityName, task.id, {
        [props.endFieldName]: task.end,
        [props.startFieldName]: task.start,
      });
    } catch (e) {
      context.navigation.openErrorDialog(e);
      context.parameters.entityDataSet.refresh();
      return false;
    }
    return true;
  };

  const handleProgressChange = async (task: Task) => {
    const recordRef = context.parameters.entityDataSet.records[
      task.id
    ].getNamedReference();

    const entityName =
      recordRef.etn || ((recordRef as any).logicalName as string);

    try {
      await context.webAPI.updateRecord(entityName, task.id, {
        [props.progressFieldName]: task.progress,
      });
    } catch (e) {
      context.navigation.openErrorDialog(e);
      context.parameters.entityDataSet.refresh();
      return false;
    }
    return true;
  };

  const handleTaskDelete = async (task: Task) => {
    var confirm = await context.navigation.openConfirmDialog({
      text: context.resources.getString("Confirm"),
    });
    if (!confirm.confirmed) {
      return false;
    }

    const recordRef = context.parameters.entityDataSet.records[
      task.id
    ].getNamedReference();
    const entityName =
      recordRef.etn || ((recordRef as any).logicalName as string);

    try {
      await context.webAPI.deleteRecord(entityName, task.id);
    } catch (e) {
      context.navigation.openErrorDialog(e);
      context.parameters.entityDataSet.refresh();
      return false;
    }
    return true;
  };

  const handleOpenRecord = async (task: Task) => {
    const recordRef = context.parameters.entityDataSet.records[
      task.id
    ].getNamedReference();
    const entityName =
      recordRef.etn || ((recordRef as any).logicalName as string);

    const entityOptions: ComponentFramework.NavigationApi.EntityFormOptions = {
      entityId: task.id,
      entityName,
      windowPosition: 1,
    };
    context.navigation.openForm(entityOptions);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    if (isSelected) {
      context.parameters.entityDataSet.setSelectedRecordIds([task.id]);
    } else {
      context.parameters.entityDataSet.clearSelectedRecordIds();
    }
  };

  let options: StylingOption & EventOption = {
    fontSize: "14px",
    fontFamily: "SegoeUI, Segoe UI",
    headerHeight: 50,
    rowHeight: 50,
    barCornerRadius: 0,
    listCellWidth: props.listCellWidth,
    TaskListHeader: createHeaderLocal(
      props.recordDisplayName,
      props.startDisplayName,
      props.endDisplayName
    ),
    TooltipContent: createTooltip(
      props.progressDisplayName,
      context.resources.getString("Duration"),
      context.resources.getString("Duration_Metric")
    ),
    TaskListTable: creatTaskListLocal(handleOpenRecord),
  };

  if (view === ViewMode.Month) {
    options.columnWidth = 300;
  } else if (view === ViewMode.Week) {
    options.columnWidth = 250;
  }

  if (props.isProgressing) {
    options.onProgressChange = handleProgressChange;
  }

  return (
    <div className="Gantt-Wrapper">
      <ViewSwitcher
        context={context}
        onViewChange={(viewMode) => {
          props.onViewChange(viewMode);
          setView(viewMode);
        }}
      />
      <Gantt
        {...props}
        {...options}
        viewMode={view}
        onDoubleClick={handleOpenRecord}
        onDateChange={handleDateChange}
        onTaskDelete={handleTaskDelete}
        onSelect={handleSelect}
      />
      <GanttFooter context={context} currentRecordsCount={props.tasks.length} />
    </div>
  );
};
