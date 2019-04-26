import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import BrushSetting from '../BrushSetting/BrushSetting'
import EraserSetting from '../EraserSetting/EraserSetting'
import Bitmap2Pixel from '../Bitmap2Pixel/Bitmap2Pixel'

import { connect } from '@tarojs/redux'
import { showSettingSwitch } from '../../actions/brushSettings'
import { 
    showGridSwitch, 
    changeDividingLineType, 
    eraserSwitch, 
    colorPickingToolSwitch
} from '../../actions/canvasSettings'
import { setImageToPixelInfo, showBitmapToPixelSwitch } from '../../actions/bitmapToPixelSetting'

import { save, clearCanvas, upload } from '../../utils/wx-tool'
import { drawLayerId } from '../../canvas-config'

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
        handleShowGridSwitch() {
            dispatch(showGridSwitch())
        },
        handleChangeDividingLineType(e) {
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

    dividingLineTypeList = ['无', '左右对称', '上下对称', '上下左右对称']

    handleShowSettingSwitch = () => {
        const { 
            showGrid, handleShowGridSwitch,
            isChooseEraser, eraserSwitch, 
            isChooseColorPickingTool, colorPickingToolSwitch, 
            showSettingSwitch 
        } = this.props
        
        if (!showGrid)                { handleShowGridSwitch() }
        if (isChooseEraser)           { eraserSwitch() }
        if (isChooseColorPickingTool) { colorPickingToolSwitch() }

        showSettingSwitch()
    }

    handleEraserSwitch = () => {
        const { 
            isShowPenSetting, showSettingSwitch, 
            isChooseColorPickingTool, colorPickingToolSwitch, 
            eraserSwitch 
        } = this.props

        if (isShowPenSetting)         { showSettingSwitch() }
        if (isChooseColorPickingTool) { colorPickingToolSwitch() }

        eraserSwitch()
    }

    handleColorPickingToolSwitch = () => {
        const { 
            isShowPenSetting, showSettingSwitch, 
            isChooseEraser, eraserSwitch, 
            colorPickingToolSwitch 
        } = this.props

        if (isShowPenSetting) { showSettingSwitch() }
        if (isChooseEraser)   { eraserSwitch() }
        
        colorPickingToolSwitch()
    }

    handleClearCanvas = () => {
        const { ctx, canvasW } = this.props.canvas
        clearCanvas(ctx, canvasW)
    }

    handleSave = () => {
        save(drawLayerId)
    }

    handleUpload = () =>{
        const { ctx, canvasW } = this.props.canvas
        upload(ctx, canvasW).then(imageToPixelInfo => {
            this.props.setImageToPixelInfo(imageToPixelInfo)
            this.props.showBitmapToPixelSwitch()
        })
    }
    
    render() {
        const {
            canvas: { canvasW },
            brushColor: { red, green, blue, alpha },
            showGrid, handleShowGridSwitch,
            dividingLineType, handleChangeDividingLineType,
            isChooseEraser, isChooseColorPickingTool,
            isIPhoneX
        } = this.props

        const childH = `height: ${(canvasW > 1000 ? 900 - 30 : canvasW - 30) / 10}px;` 

        return (
            <View>
                <View className='parent'>
                    <View 
                        className='child' 
                        style={childH}
                        onClick={this.handleShowSettingSwitch}
                    >
                        <Text
                            className='iconfont icon-pen'
                            style={`color: rgba(${red}, ${green}, ${blue}, ${alpha});font-size: 30px;`}
                        />
                        <Text className='child__title'>笔</Text>
                    </View>
                    <View className='child'   style={childH} onClick={handleShowGridSwitch}>
                        <Text
                            className='iconfont icon-wangge'
                            style={showGrid ? 'color: #543c8d;font-size: 30px;' : 'font-size: 30px;'}
                        />
                        <Text className='child__title'>网格</Text>
                    </View>
                    <View className='child' style={childH}>
                        <Picker range={this.dividingLineTypeList} onChange={handleChangeDividingLineType}>
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
                    <View className='child'  style={childH} onClick={this.handleEraserSwitch}>
                        <Text
                            className='iconfont icon-xiangpi'
                            style={isChooseEraser ? 'color: #543c8d;font-size: 30px;' : 'font-size: 30px;'}
                        />
                        <Text className='child__title'>橡皮擦</Text>
                    </View>
                    <View className='child'  style={childH} onClick={this.handleColorPickingToolSwitch}>
                        <Text
                            className='iconfont icon-quse' 
                            style={isChooseColorPickingTool ? 'color: #543c8d;font-size: 30px;' : 'font-size: 30px;'}
                        >
                        </Text>
                        <Text className='child__title'>取色器</Text>
                    </View>
                    <View className='child'  style={childH} onClick={this.handleClearCanvas}>
                        <Text
                            className='iconfont icon-shanchu'
                            style='font-size: 30px;'
                        />
                        <Text className='child__title'>清空画布</Text>
                    </View>
                    <View className='child'  style={childH} onClick={this.handleSave}>
                        <Text
                            className='iconfont icon-baocun'
                            style='font-size: 30px;'
                        />
                        <Text className='child__title'>保存</Text>
                    </View>
                    <View className='child'  style={childH}  onClick={this.handleUpload}>
                        <Text
                            className='iconfont icon-zhuanhuan'
                            style='font-size: 30px;'
                        />
                        <Text className='child__title'>位图转像素</Text>
                    </View>
                </View>
                <BrushSetting isIPhoneX={isIPhoneX}/>
                <EraserSetting isIPhoneX={isIPhoneX}/>
                <Bitmap2Pixel />
            </View>
        )
    }
}

export default ToolBox
