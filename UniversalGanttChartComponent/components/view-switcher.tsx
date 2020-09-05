import * as React from "react";
import { ViewMode } from "gantt-task-react";
import { IInputs } from "../generated/ManifestTypes";

export const ViewSwitcher: React.SFC<{
  context: ComponentFramework.Context<IInputs>;
  onViewChange: (viewMode: ViewMode) => void;
}> = ({ context, onViewChange }) => {
  return (
    <div className="Gantt-Header">
      <button
        className="Gantt-Button Gantt-Button_Header"
        onClick={() => onViewChange(ViewMode.QuarterDay)}
      >
        {context.resources.getString("Quarter_Of_Day_Name")}
      </button>
      <div className="Gantt-Header_Separator">|</div>
      <button
        className="Gantt-Button Gantt-Button_Header"
        onClick={() => onViewChange(ViewMode.HalfDay)}
      >
        {context.resources.getString("Half_Of_Day_Name")}
      </button>
      <div className="Gantt-Header_Separator">|</div>
      <button
        className="Gantt-Button Gantt-Button_Header"
        onClick={() => onViewChange(ViewMode.Day)}
      >
        {context.resources.getString("Day_Name")}
      </button>
      <div className="Gantt-Header_Separator">|</div>
      <button
        className="Gantt-Button Gantt-Button_Header"
        onClick={() => onViewChange(ViewMode.Week)}
      >
        {context.resources.getString("Week_Name")}
      </button>
      <div className="Gantt-Header_Separator">|</div>
      <button
        className="Gantt-Button Gantt-Button_Header"
        onClick={() => onViewChange(ViewMode.Month)}
      >
        {context.resources.getString("Month_Name")}
      </button>
    </div>
  );
};
