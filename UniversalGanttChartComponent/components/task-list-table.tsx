import * as React from "react";
import { Task } from "gantt-task-react";

export const creatTaskListLocal = (
  includeTime: boolean,
  onClick: (task: Task) => void,
  formatDateShort: (value: Date, includeTime?: boolean) => string
): React.FunctionComponent<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
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
    onExpanderClick,
  }) => {
    return (
      <div
        className="Gantt-Task-List_Wrapper"
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {tasks.map((t) => {
          let expanderSymbol = "";
          if (t.hideChildren === false) {
            expanderSymbol = "▼";
          } else if (t.hideChildren === true) {
            expanderSymbol = "▶";
          }
          return (
            <div
              className="Gantt-Task-List_Row"
              style={{ height: rowHeight }}
              key={`${t.id}row`}
              onClick={() => {
                if (selectedTaskId === t.id) {
                  setSelectedTask("");
                } else {
                  setSelectedTask(t.id);
                }
              }}
            >
              <div className="Gantt-Task-List_Cell">
                <div
                  className={
                    selectedTaskId === t.id
                      ? "Gantt-Task-List-Checkbox__Checked"
                      : "Gantt-Task-List-Checkbox"
                  }
                ></div>
              </div>
              {/**
               * Name
               */}
              <div
                className="Gantt-Task-List_Cell"
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                title={t.name}
              >
                <div className="Gantt-Task-List_Name-Container">
                  <div
                    className={
                      expanderSymbol
                        ? "Gantt-Task-List_Cell__Expander"
                        : "Gantt-Task-List_Cell__Empty-Expander"
                    }
                    onClick={(e) => {
                      onExpanderClick(t);
                      e.stopPropagation();
                    }}
                  >
                    {expanderSymbol}
                  </div>
                  <div
                    className="Gantt-Task-List_Cell__Link"
                    onClick={() => onClick(t)}
                  >
                    {t.name}
                  </div>
                </div>
              </div>
              {/**
               * Start Time
               */}
              <div
                className="Gantt-Task-List_Cell"
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                title={formatDateShort(t.start, includeTime)}
              >
                &nbsp;{formatDateShort(t.start, includeTime)}
              </div>
              {/**
               * End Time
               */}
              <div
                className="Gantt-Task-List_Cell"
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                title={formatDateShort(t.end, includeTime)}
              >
                &nbsp;{formatDateShort(t.end, includeTime)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
};
