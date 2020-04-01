import {
    INIT_CANVAS,
    SHOW_GRID_SWITCH,
    CHANGE_DIVIDING_LINE,
    ERASER_SWITCH,
    CHANGE_ERASER_WIDTH,
    COLOR_PICKING_TOOL_SWITCH
} from '../constants/canvasSettings'

const INITIAL_STATE = {
    canvas: {
        ctx: {},
        canvasW: 750
    },
    showGrid: true,
    dividingLineType: 0, //无: 0, 垂直: 1, 横向: 2, horizontal && vertical: 3
    isChooseEraser: false,
    eraserW: 10,
    isChooseColorPickingTool: false,
}

const canvasSetting = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_CANVAS:
            return {
                ...state,
                canvas: action.canvas
            }
        case SHOW_GRID_SWITCH:
            return {
                ...state,
                showGrid: !state.showGrid
            }
        case CHANGE_DIVIDING_LINE:
            return {
                ...state,
                dividingLineType: action.dividingLineType
            }
        case ERASER_SWITCH:
            return {
                ...state,
                isChooseEraser: !state.isChooseEraser
            }
        case CHANGE_ERASER_WIDTH:
            return {
                ...state,
                eraserW: action.eraserW
            }
        case COLOR_PICKING_TOOL_SWITCH:
            return {
                ...state,
                isChooseColorPickingTool: !state.isChooseColorPickingTool
            }
        default:
            return state
    }
}

export default canvasSetting
