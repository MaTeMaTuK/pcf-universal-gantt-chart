import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Task, ViewMode } from "gantt-task-react";
import { UniversalGantt } from "./components/universal-gantt";
import { generate } from "@ant-design/colors";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class UniversalGanttChartComponent
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
  private displayNameStr = "displayName";
  private scheduledStartStr = "scheduledStart";
  private scheduledEndStr = "scheduledEnd";
  private progressStr = "progress";
  private viewMode: ViewMode;
  private locale: string;

  constructor() {
    this.handleViewModeChange = this.handleViewModeChange.bind(this);
  }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    // Need to track container resize so that control could get the available width. The available height won't be provided even this is true
    context.mode.trackContainerResize(true);
    this._container = container;
    this.viewMode = <ViewMode>context.parameters.viewMode.raw;
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.updateViewAsync(context);
  }

  /**
   * Async wrapper for update view method
   */
  private async updateViewAsync(context: ComponentFramework.Context<IInputs>) {
    this._context = context;
    const dataset = context.parameters.entityDataSet;
    const columns = dataset.columns;
    const nameField = columns.find((c) => c.alias === this.displayNameStr);
    const startField = columns.find((c) => c.alias === this.scheduledStartStr);
    const endField = columns.find((c) => c.alias === this.scheduledEndStr);
    const progressField = columns.find((c) => c.alias === this.progressStr);

    if (
      !nameField ||
      !startField ||
      !endField ||
      !context.parameters.timeStep.raw
    )
      return;

    try {
      const crmLanguageCode = context.userSettings.languageId;
      const response = await context.webAPI.retrieveMultipleRecords(
        "languagelocale",
        `?$top=1&$select=code&$filter=localeid%20eq%20${crmLanguageCode}`
      );
      if (response.entities.length > 0 && !this.locale) {
        this.locale = response.entities[0]["code"];
      } else if (!this.locale) {
        this.locale = "en";
      }

      const tasks = await this.generateTasks(context, dataset, !!progressField);
      const additionalOffset = 150;
      const listCellWidth = !!context.parameters.defaultListCellWidth.raw
        ? `${context.parameters.defaultListCellWidth.raw}px`
        : "";

      const progressFieldName = !!progressField ? progressField.name : "";
      const progressDisplayName = !!progressField
        ? progressField.displayName
        : "";

      const gantt = React.createElement(UniversalGantt, {
        context,
        tasks,
        ganttHeight: this._container.offsetHeight - additionalOffset,
        recordDisplayName: nameField.displayName,
        startDisplayName: startField.displayName,
        endDisplayName: endField.displayName,
        progressDisplayName: progressDisplayName,
        startFieldName: startField.name,
        endFieldName: endField.name,
        progressFieldName: progressFieldName,
        listCellWidth: listCellWidth,
        timeStep: context.parameters.timeStep.raw,
        isProgressing: !!progressField,
        locale: this.locale,
        viewMode: this.viewMode,
        onViewChange: this.handleViewModeChange,
      });

      ReactDOM.render(gantt, this._container);
    } catch (e) {
      console.error(e);
    }
  }

  private async generateTasks(
    context: ComponentFramework.Context<IInputs>,
    dataset: ComponentFramework.PropertyTypes.DataSet,
    isProgressing: boolean
  ) {
    let entityTypesAndColors: {
      entityLogicalName: string;
      backgroundColor: string;
      backgroundSelectedColor: string;
      progressColor: string;
      progressSelectedColor: string;
    }[] = [];
    let tasks: Task[] = [];

    for (const recordId of dataset.sortedRecordIds) {
      const record = dataset.records[recordId];
      const name = <string>record.getValue(this.displayNameStr);
      const start = <string>record.getValue(this.scheduledStartStr);
      const end = <string>record.getValue(this.scheduledEndStr);
      const progress = isProgressing
        ? Number(record.getValue(this.progressStr))
        : 0;

      const entRef = record.getNamedReference();
      const entName = entRef.etn || <string>(<any>entRef).logicalName;

      let entityColorTheme = entityTypesAndColors.find(
        (e) => e.entityLogicalName === entName
      );

      if (!entityColorTheme) {
        entityColorTheme = await this.generateColorTheme(context, entName);
        entityTypesAndColors.push(entityColorTheme);
      }

      if (!name || !start || !end) continue;
      tasks.push({
        id: record.getRecordId(),
        name,
        start: new Date(start),
        end: new Date(end),
        progress: progress,
        styles: { ...entityColorTheme },
      });
    }
    return tasks;
  }

  private async generateColorTheme(
    context: ComponentFramework.Context<IInputs>,
    entName: string
  ) {
    const result = await context.utils.getEntityMetadata(entName, [
      "EntityColor",
    ]);
    const entityColor = result["EntityColor"];
    const colors = generate(entityColor);
    const backgroundColor = context.parameters.backgroundColor.raw || colors[2];
    const backgroundSelectedColor =
      context.parameters.backgroundSelectedColor.raw || colors[3];
    const progressColor = context.parameters.progressColor.raw || colors[4];
    const progressSelectedColor =
      context.parameters.progressSelectedColor.raw || colors[5];

    return {
      entityLogicalName: entName,
      backgroundColor: backgroundColor,
      backgroundSelectedColor: backgroundSelectedColor,
      progressColor: progressColor,
      progressSelectedColor: progressSelectedColor,
    };
  }

  private handleViewModeChange(viewMode: ViewMode) {
    this.viewMode = viewMode;
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this._container);
  }
}
