import {
    INIT_CANVAS,
    SHOW_GRID_SWITCH,
    CHANGE_DIVIDING_LINE,
    ERASER_SWITCH,
    CHANGE_ERASER_WIDTH,
    COLOR_PICKING_TOOL_SWITCH
} from '../constants/canvasSettings'

export const initCanvas = (canvas) => {
    return {
        type: INIT_CANVAS,
        canvas: canvas
    }
}

export const showGridSwitch = () => {
    return {
        type: SHOW_GRID_SWITCH
    }
}

export const changeDividingLineType = (dividingLineType) => {
    return {
        type: CHANGE_DIVIDING_LINE,
        dividingLineType: dividingLineType
    }
}

export const eraserSwitch = () => {
    return {
        type: ERASER_SWITCH
    }
}

export const changeEraserWidth = (w) => {
    return {
        type: CHANGE_ERASER_WIDTH,
        eraserW: w
    }
}

export const colorPickingToolSwitch = () => {
    return {
        type: COLOR_PICKING_TOOL_SWITCH
    }
}

