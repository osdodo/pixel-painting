import { 
    SHOW_SETTING_SWITCH, 
    CHANGE_BRUSH_WIDTH, 
    CHANGE_BRUSH_COLOR 
} from '../constants/brushSettings'

const INITIAL_STATE = {
    isShowPenSetting: false,
    brushW: 5,
    brushColor: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
    }
}

const brushSettings = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_SETTING_SWITCH:
            return {
                ...state,
                isShowPenSetting: !state.isShowPenSetting
            }
        case CHANGE_BRUSH_WIDTH:
            return {
                ...state,
                brushW: action.brushW
            }
        case CHANGE_BRUSH_COLOR:
            return {
                ...state,
                brushColor: {
                    ...state.brushColor,
                    ...action.brushColor
                }
            }
        default:
            return state
    }
}

export default brushSettings
