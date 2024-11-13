import { NUMBER_OF } from "./config";

// here (x,y) is the standard mathematical grid (positive x is to the right, positive y is up) and the origin is the lower left
export const ledIndexToX = ledIndex => (ledIndex - 1) % 10;
export const ledIndexToY = ledIndex => Math.floor(ledIndex / 10) - 1;
export const xyToLedIndex = (x, y) => 10 * (y + 1) + x + 1;

export const stepIndexToX = stepIndex => stepIndex % NUMBER_OF.COLUMNS;
export const stepIndexToY = stepIndex => NUMBER_OF.ROWS - Math.floor(stepIndex / NUMBER_OF.COLUMNS) - 1;
export const xyToStepIndex = (x, y) => (NUMBER_OF.ROWS - y - 1) * NUMBER_OF.COLUMNS + x;
export const stepToLedIndex = stepIndex => xyToLedIndex(stepIndexToX(stepIndex), stepIndexToY(stepIndex));

// all the xy above refer to the launchpad hardware
export const guiXyToStepIndex = (x, y) => x + y * NUMBER_OF.COLUMNS;
