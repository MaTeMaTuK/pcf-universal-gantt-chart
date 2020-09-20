import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";

export const GanttFooter: React.FunctionComponent<{
  context: ComponentFramework.Context<IInputs>;
  currentRecordsCount: number;
}> = ({ currentRecordsCount, context }) => {
  const paging = context.parameters.entityDataSet.paging;
  const pageSize = (paging as any).pageSize as number;
  if (paging.totalResultCount <= pageSize) return <></>;

  return (
    <div className="Gantt-Footer_Wrapper">
      <div className="Gantt-Footer_Paging-Text">
        <span>{`${currentRecordsCount} / ${paging.totalResultCount}`}</span>
      </div>
      {paging.hasNextPage && (
        <div className="Gantt-Footer_Action">
          {paging.hasNextPage && (
            <button
              className="Gantt-Button"
              onClick={() => {
                paging.loadNextPage();
              }}
            >
              <div className="Gantt-Footer_Button-Icon Gantt-Footer_Button-Icon__Next">
                <span className="Gantt-Footer_Paging-Text">
                  {context.resources.getString("More")}
                </span>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
