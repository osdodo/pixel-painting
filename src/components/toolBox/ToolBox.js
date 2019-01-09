import { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import BrushSetting from './BrushSetting/BrushSetting'
import EraserSetting from './EraserSetting/EraserSetting'
import Bitmap2Pixel from './Bitmap2Pixel/Bitmap2Pixel'

import { connect } from '@tarojs/redux'
import { showSettingSwitch } from '../../actions/brushSettings'
import { 
    showGridSwitch, 
    changeDividingLineType, 
    eraserSwitch, 
    colorPickingToolSwitch
} from '../../actions/canvasSettings'
import { setImageToPixelInfo, showBitmapToPixelSwitch } from '../../actions/bitmapToPixelSetting'

import { canvasToTempFilePath, saveImageToPhotosAlbum } from '../../utils/utils';

import './ToolBox.css'
import '../../iconfont.css'

@connect(
    ({ brushSettings, canvasSetting }) => ({
        ...brushSettings,
        ...canvasSetting
    }),
    dispatch => ({
        showSettingSwitch() {
            dispatch(showSettingSwitch())
        },
        onShowGridSwitch() {
            dispatch(showGridSwitch())
        },
        onChangeDividingLineType(e) {
            dispatch(changeDividingLineType(Number(e.detail.value)))
        },
        eraserSwitch() {
            dispatch(eraserSwitch())
        },
        colorPickingToolSwitch() {
            dispatch(colorPickingToolSwitch())
        },
        setImageToPixelInfo(imageToPixelInfo) {
            dispatch(setImageToPixelInfo(imageToPixelInfo))
        },
        showBitmapToPixelSwitch() {
            dispatch(showBitmapToPixelSwitch())
        }
    })
)

class ToolBox extends Component {
    constructor(props) {
        super(props)
        this.dividingLineTypeList = ['无', '左右对称', '上下对称', '上下左右对称']
    }

    componentDidMount() {}

    onShowSettingSwitch() {
        const { 
            showGrid, onShowGridSwitch,
            isChooseEraser, eraserSwitch, 
            isChooseColorPickingTool, colorPickingToolSwitch, 
            showSettingSwitch 
        } = this.props
        
        if (!showGrid)                { onShowGridSwitch() }
        if (isChooseEraser)           { eraserSwitch() }
        if (isChooseColorPickingTool) { colorPickingToolSwitch() }

        showSettingSwitch()
    }

    onEraserSwitch() {
        const { 
            isShowPenSetting, showSettingSwitch, 
            isChooseColorPickingTool, colorPickingToolSwitch, 
            eraserSwitch 
        } = this.props

        if (isShowPenSetting)         { showSettingSwitch() }
        if (isChooseColorPickingTool) { colorPickingToolSwitch() }

        eraserSwitch()
    }

    onColorPickingToolSwitch() {
        const { 
            isShowPenSetting, showSettingSwitch, 
            isChooseEraser, eraserSwitch, 
            colorPickingToolSwitch 
        } = this.props

        if (isShowPenSetting) { showSettingSwitch() }
        if (isChooseEraser)   { eraserSwitch() }
        
        colorPickingToolSwitch()
    }

    onClearCanvas() {
        wx.showModal({
            content: '🐥确认清空画布吗？',
            success: (tip) => {
                if (tip.confirm) {
                    const { ctx, canvasW } = this.props.canvas
                    ctx.clearRect(0, 0, canvasW, canvasW)
                    ctx.draw()
                }
            }
        })
    }

    onSave() {
        wx.showModal({
            content: '🐥确认保存到手机相册吗？',
            success: (tip) => {
                if (tip.confirm) {
                    wx.showLoading({
                        title: '处理中',
                    })
                    canvasToTempFilePath(this.props.canvas.ctx.canvasId).then(filePath => {
                        saveImageToPhotosAlbum(filePath).then(() => {
                            wx.hideLoading()
                            wx.showToast({
                                title: '😁已保存至手机相册',
                                icon: 'none',
                                duration: 2000
                            })
                        }).catch(e => {
                            if (e.errMsg.indexOf('auth') != -1) {
                                wx.showModal({
                                    content: '❗同意访问您的相册，才能保存图片',
                                    showCancel: false,
                                    success: (tip) => {
                                        if (tip.confirm) {
                                            wx.openSetting({
                                                success: (res) => { }
                                            })
                                        }
                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: '❌保存失败，请重试',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        })
                    })
                }
            }
        })
    }

    onUpload = () =>{
        wx.showModal({
            title: '🐥小提示🐥',
            content: '上传对比度高的位图转化成的像素图效果更佳',
            showCancel: true,
            success: (tip) => {
                if (tip.confirm) {
                    wx.chooseImage({
                        count: 1,
                        sizeType: ['compressed'],
                        sourceType: ['album'],
                        success: (res) => {
                            let tempFilePath = res.tempFilePaths[0]
                            const { canvas } = this.props
                            wx.getImageInfo({
                                src: tempFilePath,
                                success: (res) => {
                                    let dWidth = res.width * 0.5
                                    let dHeight = res.height * 0.5
                                    let dx = canvas.canvasW / 4 - dWidth / 2
                                    let dy = canvas.canvasW / 4 - dHeight / 2
                                    canvas.ctx.drawImage(
                                        tempFilePath,
                                        dx, dy,
                                        dWidth, dHeight
                                    )
                                    canvas.ctx.draw()
                                    this.props.setImageToPixelInfo({
                                        dx, dy,
                                        dWidth, dHeight
                                    })
                                    this.props.showBitmapToPixelSwitch()
                                },
                                fail: (err) => {}
                            })
                        },
                        fail: () => { }
                    })
                } 
            }
        })
    }
    
    render() {
        const {
            brushColor,
            showGrid, onShowGridSwitch,
            dividingLineType, onChangeDividingLineType,
            isChooseEraser, isChooseColorPickingTool,
            isiPhoneX
        } = this.props

        const { red, green, blue, alpha } = brushColor

        let { canvasW } = this.props.canvas
        if (canvasW > 1000) { canvasW = 900 }
        const childH = `height: ${(canvasW - 30) / 10}px;` 

        return (
            <View>
                <View className='parent'>
                    <View 
                        className='child' 
                        style={childH}
                        onClick={this.onShowSettingSwitch}
                    >
                        <Text
                            className='iconfont icon-pen'
                            style={`color: rgba(${red}, ${green}, ${blue}, ${alpha});font-size: 30px;`}
                        />
                        <Text className='child__title'>笔</Text>
                    </View>
                    <View className='child'   style={childH} onClick={onShowGridSwitch}>
                        <Text
                            className='iconfont icon-wangge'
                            style={showGrid ? 'color: #543c8d;font-size: 30px;' : 'font-size: 30px;'}
                        />
                        <Text className='child__title'>网格</Text>
                    </View>
                    <View className='child' style={childH}>
                        <Picker range={this.dividingLineTypeList} onChange={onChangeDividingLineType}>
                            {
                                dividingLineType === 0 &&
                                <Text
                                    className='iconfont icon-symmetric'
                                    style='font-size: 30px;'
                                />
                            }
                            {
                                dividingLineType === 1 &&
                                <Text
                                    className='iconfont icon-symmetric'
                                    style='color: #543c8d;font-size: 30px;'
                                />
                            }
                            {
                                dividingLineType === 2 &&
                                <Text
                                    className='iconfont icon-symmetric1'
                                    style='color: #543c8d;font-size: 30px;'
                                />
                            }
                            {
                                dividingLineType === 3 &&
                                <Text
                                    className='iconfont icon-duicheng'
                                    style='color: #543c8d;font-size: 30px;'
                                />
                            }
                        </Picker>
                        <Text className='child__title'>对称轴</Text>
                    </View>
                    <View className='child'  style={childH} onClick={this.onEraserSwitch}>
                        <Text
                            className='iconfont icon-xiangpi'
                            style={isChooseEraser ? 'color: #543c8d;font-size: 30px;' : 'font-size: 30px;'}
                        />
                        <Text className='child__title'>橡皮擦</Text>
                    </View>
                    <View className='child'  style={childH} onClick={this.onColorPickingToolSwitch}>
                        <Text
                            className='iconfont icon-quse' 
                            style={isChooseColorPickingTool ? 'color: #543c8d;font-size: 30px;' : 'font-size: 30px;'}
                        >
                        </Text>
                        <Text className='child__title'>取色器</Text>
                    </View>
                    <View className='child'  style={childH} onClick={this.onClearCanvas}>
                        <Text
                            className='iconfont icon-shanchu'
                            style='font-size: 30px;'
                        />
                        <Text className='child__title'>清空画布</Text>
                    </View>
                    <View className='child'  style={childH} onClick={this.onSave}>
                        <Text
                            className='iconfont icon-baocun'
                            style='font-size: 30px;'
                        />
                        <Text className='child__title'>保存</Text>
                    </View>
                    <View className='child'  style={childH}  onClick={this.onUpload}>
                        <Text
                            className='iconfont icon-zhuanhuan'
                            style='font-size: 30px;'
                        />
                        <Text className='child__title'>位图转像素</Text>
                    </View>
                </View>
                <BrushSetting isiPhoneX={isiPhoneX}/>
                <EraserSetting isiPhoneX={isiPhoneX}/>
                <Bitmap2Pixel />
            </View>
        )
    }
}


export default ToolBox
