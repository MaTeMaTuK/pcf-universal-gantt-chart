import * as React from "react";
import { Task } from "gantt-task-react";

export const creatTaskListLocal = (
  onClick: (task: Task) => void
): React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
}> => {
  return ({
    rowHeight,
    rowWidth,
    tasks,
    fontFamily,
    fontSize,
    locale,
    selectedTaskId,
    setSelectedTask,
  }) => {
    const dateTimeOptions = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return (
      <div
        className="Gantt-Task-List_Wrapper"
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {tasks.map((t) => {
          return (
            <div
              className="Gantt-Task-List_Row"
              style={{ height: rowHeight }}
              key={`${t.id}row`}
            >
              <div
                className={
                  "Gantt-Task-List_Cell Gantt-Task-List_Cell-Select__Icon" +
                  (selectedTaskId === t.id
                    ? " Gantt-Task-List_Cell-Select__Selected"
                    : "")
                }
                onClick={() => {
                  if (selectedTaskId === t.id) {
                    setSelectedTask("");
                  } else {
                    setSelectedTask(t.id);
                  }
                }}
              />

              <div
                className="Gantt-Task-List_Cell Gantt-Task-List_Cell__Link"
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                onClick={() => onClick(t)}
                title={t.name}
              >
                &nbsp;{t.name}
              </div>
              <div
                className="Gantt-Task-List_Cell"
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                onClick={() => {
                  if (selectedTaskId === t.id) {
                    setSelectedTask("");
                  } else {
                    setSelectedTask(t.id);
                  }
                }}
              >
                &nbsp;{t.start.toLocaleDateString(locale, dateTimeOptions)}
              </div>
              <div
                className="Gantt-Task-List_Cell"
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                onClick={() => {
                  if (selectedTaskId === t.id) {
                    setSelectedTask("");
                  } else {
                    setSelectedTask(t.id);
                  }
                }}
              >
                &nbsp;{t.end.toLocaleDateString(locale, dateTimeOptions)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
};
