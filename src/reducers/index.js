import { combineReducers } from 'redux'
import brushSettings from './brushSettings'
import canvasSetting from './canvasSettings'

export default combineReducers({
    brushSettings,
    canvasSetting
})
