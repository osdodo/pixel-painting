import {
    SHOW_BITMAP_TO_PIXEL_SWITCH,
    SET_IMAGE_TO_PIXELINFO
} from '../constants/bitmapToPixelSetting'


export const showBitmapToPixelSwitch = () => {
    return {
        type: SHOW_BITMAP_TO_PIXEL_SWITCH
    }
}

export const setImageToPixelInfo = (imageToPixelInfo) => {
    return {
        type: SET_IMAGE_TO_PIXELINFO,
        imageToPixelInfo: imageToPixelInfo
    }
}
