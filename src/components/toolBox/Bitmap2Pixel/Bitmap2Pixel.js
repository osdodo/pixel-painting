import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { showBitmapToPixelSwitch } from '../../../actions/bitmapToPixelSetting'

import { getImageData, putImageData, thresholdConvert } from '../../../utils/utils';

@connect(
    ({ bitmapToPixelSetting, canvasSetting: { canvas } }) => ({
        ...bitmapToPixelSetting,
        canvas
    }),
    dispatch => ({
        showBitmapToPixelSwitch() {
            dispatch(showBitmapToPixelSwitch())
        }
    })
)

class Bitmap2Pixel extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.isBitmapToPixelIng) {
            this.toPixel().then(() => {
                this.props.showBitmapToPixelSwitch()
            }).catch(err => {
                wx.showToast({
                    title: '😭转换失败',
                    icon: 'none',
                    duration: 2000
                })
                this.props.showBitmapToPixelSwitch()
            })
        }
    }

    toPixel() {
        return new Promise((resolve, reject) => {
            wx.showLoading({ title: '转换中...' })
            setTimeout(() => {
                const { canvas, imageToPixelInfo } = this.props
                const { dx, dy, dWidth, dHeight } = imageToPixelInfo
                getImageData(canvas.ctx.canvasId, dx, dy, dWidth, dHeight).then(imageData => {
                    thresholdConvert(imageData, 128)
                    putImageData(canvas.ctx.canvasId, dx, dy, dWidth, dHeight, imageData).then(() => {
                        canvas.ctx.draw(true)
                        wx.hideLoading()
                        resolve()
                    }).catch(err => {
                        wx.hideLoading()
                        reject(err)
                    })
                }).catch(err => {
                    wx.hideLoading()
                    reject(err)
                })
            },1000)
        })
    }

    render() {
        return (
            <View> </View>
        )
    }
}

export default Bitmap2Pixel
