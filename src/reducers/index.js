import { combineReducers } from 'redux'
import brushSettings from './brushSettings'
import canvasSetting from './canvasSettings'
import bitmapToPixelSetting from './bitmapToPixelSetting'

export default combineReducers({
    brushSettings,
    canvasSetting,
    bitmapToPixelSetting
})
