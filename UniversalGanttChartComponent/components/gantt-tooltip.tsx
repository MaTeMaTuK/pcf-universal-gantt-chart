import * as React from "react";
import { Task } from "gantt-task-react";

export const createTooltip = (
  startDisplayName: string,
  endDisplayName: string,
  progressDisplayName: string,
  durationDisplayName: string,
  metricDisplayName: string,
  formatDateShort: (value: Date, includeTime?: boolean) => string
): React.FC<{
  task: Task;
  fontSize: string;
  fontFamily: string;
}> => {
  return ({ task, fontSize, fontFamily }) => {
    const style = {
      fontSize,
      fontFamily,
    };
    return (
      <div className={"Gantt-Tooltip_Container"} style={style}>
        <p
          className={
            "Gantt-Tooltip_Paragraph Gantt-Tooltip_Paragraph__Information"
          }
          style={{ fontSize: fontSize + 6 }}
        >
          {task.name}
        </p>

        <p
          className={"Gantt-Tooltip_Paragraph"}
        >{`${startDisplayName}: ${formatDateShort(task.start, true)}`}</p>

        <p
          className={"Gantt-Tooltip_Paragraph"}
        >{`${endDisplayName}: ${formatDateShort(task.end, true)}`}</p>

        <p className={"Gantt-Tooltip_Paragraph"}>{`${durationDisplayName}: ${~~(
          (task.end.getTime() - task.start.getTime()) /
          (1000 * 60 * 60 * 24)
        )} ${metricDisplayName}`}</p>

        <p className={"Gantt-Tooltip_Paragraph"}>
          {!!task.progress && `${progressDisplayName}: ${task.progress} %`}
        </p>
      </div>
    );
  };
};
