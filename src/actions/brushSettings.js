import {
    SHOW_SETTING_SWITCH,
    CHANGE_BRUSH_WIDTH,
    CHANGE_BRUSH_COLOR
} from '../constants/brushSettings'

export const showSettingSwitch = () => {
    return {
        type: SHOW_SETTING_SWITCH
    }
}

export const changeBrushWidth = (w) => {
    return {
        type: CHANGE_BRUSH_WIDTH,
        brushW: w
    }
}

export const changeBrushColor = (color) => {
    return {
        type: CHANGE_BRUSH_COLOR,
        brushColor: color
    }
}
