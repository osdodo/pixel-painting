import { 
    SHOW_BITMAP_TO_PIXEL_SWITCH,
    SET_IMAGE_TO_PIXELINFO
} from '../constants/bitmapToPixelSetting'

const INITIAL_STATE = {
    isBitmapToPixelIng: false,
    imageToPixelInfo: {
        dx: 0, 
        dy: 0,
        dWidth: 1, 
        dHeight: 1
    },
}

const bitmapToPixelSetting = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_BITMAP_TO_PIXEL_SWITCH:
            return {
                ...state,
                isBitmapToPixelIng: !state.isBitmapToPixelIng
            }
        case SET_IMAGE_TO_PIXELINFO: 
            return {
                ...state,
                imageToPixelInfo: action.imageToPixelInfo
            }
        default:
            return state
    }
}

export default bitmapToPixelSetting
