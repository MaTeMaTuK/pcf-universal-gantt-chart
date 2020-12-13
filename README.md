# pcf-universal-gantt-chart

## Interactive PCF Gantt Chart Control for Dynamics Grid and Canvas App

![example](https://github.com/MaTeMaTuK/pcf-universal-gantt-chart/blob/master/DocumentationAssets/ganttStandart.gif)

## Instruction

Quick guide for model driven app is [here](/Model Driven Guide.md)

## Configuration

| Parameter Name                                  | Description                                                     |
| :---------------------------------------------- | :-------------------------------------------------------------- |
| Record Display Name\*                           | Specifies name on bar and list table.                           |
| Start Time\*                                    | Specifies start time display.                                   |
| End Time\*                                      | Specifies end time display.                                     |
| Progress                                        | Specifies progress display.                                     |
| Display Color(Option)                           | Specifies colors by option set value color.                     |
| Display Color(Text)                             | Specifies colors by hex color value.                            |
| Display Mode\*                                  | Enables or disables drag and drop feature.                      |
| IsSubgrid\*                                     | Specifies gantt as subgrid control.                             |
| Default Duration View\*                         | Specifies default duration display.                             |
| Display Date Format\*                           | Specifies date and time display format.                         |
| Time Step\*                                     | Specifies allowed step for move events. Sets in milliseconds.   |
| Font Size\*                                     | Specifies font size.                                            |
| Header Height\*                                 | Specifies header height.                                        |
| Row Height\*                                    | Specifies row height.                                           |
| List`s Cell Width\*                             | Specifies task list width. You may set 0 value for list hiding. |
| Column Width for Quarter of Day\*               | Specifies period width for Quarter of Day.                      |
| Column Width for Column Width for Half of Day\* | Specifies period width for Column Width for Half of Day.        |
| Column Width for Column Width for Day\*         | Specifies period width for Column Width for Day.                |
| Column Width for Column Width for Week\*        | Specifies period width for Column Width for Week.               |
| Column Width for Column Width for Month\*       | Specifies period width for Column Width for Month.              |
| Custom Display Name                             | Overrides display name.                                         |
| Custom Start Name                               | Overrides start time name.                                      |
| Custom End Name                                 | Overrides end time name.                                        |
| Custom Progress Name                            | Overrides progress name.                                        |
| Custom Progress Color                           | Specifies the taskbar progress fill color.                      |
| Custom Progress Selected Color                  | Specifies the taskbar progress fill color on select.            |
| Custom Background Color                         | Specifies the taskbar background fill color.                    |
| Custom Background Selected Color                | Specifies the taskbar background fill color on select.          |

\*Required

### Coloring

You are able to setup record coloring on base color or custom colors.
The base color gets from option set, text value or entity color. You can create base color for record palette [here](https://ant.design/docs/spec/colors#Palette-Generation-Tool).
Custom colors might be configured for overriding if you don't like color generation.

## Additional information

If you need your language you may contact with me or open an issue, where you may share your translations.

#### License GPLv3

#### Special thanks to [Aleksandra Daskevica](mailto:aleksandra.daskevica@cgi.com)

#### [Based on](https://github.com/MaTeMaTuK/gantt-task-react)
