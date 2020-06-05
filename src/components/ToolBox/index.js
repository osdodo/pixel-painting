import { Component } from '@tarojs/taro'
import { View, Text, Picker, ScrollView, Slider } from '@tarojs/components'
import IconFont from '../iconfont'
import { connect } from '@tarojs/redux'
import {
    showSettingSwitch,
    changeBrushWidth,
    changeBrushColor
} from '../../actions/brushSettings'
import {
    showGridSwitch,
    changeDividingLineType,
    eraserSwitch,
    colorPickingToolSwitch,
    changeEraserWidth
} from '../../actions/canvasSettings'
import { save, clearCanvas } from '../../utils/wx-tool'
import { drawLayerId } from '../../canvas-config'

import './index.less'

@connect(
    ({ brushSettings, canvasSetting }) => ({
        ...brushSettings,
        ...canvasSetting
    }),
    dispatch => ({
        showSettingSwitch() {
            dispatch(showSettingSwitch())
        },
        handleChangeBrushWidth(e) {
            dispatch(changeBrushWidth(e.detail.value))
        },
        handleChangeBrushColor(brushColor) {
            dispatch(changeBrushColor(brushColor))
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
        showBitmapToPixelSwitch() {
            dispatch(showBitmapToPixelSwitch())
        },
        changeEraserWidth(e) {
            dispatch(changeEraserWidth(e.detail.value))
        }
    })
)
class ToolBox extends Component {

    config = {
        // 定义需要引入的第三方组件
        usingComponents: {
            'color-picker': '../../components/color-picker/color-picker'
        }
    }

    state = {
        showSettingBox: false
    }

    dividingLineTypeList = ['无', '左右对称', '上下对称', '上下左右对称']

    handleEraserSwitch = () => {
        const {
            isShowPenSetting, showSettingSwitch,
            isChooseColorPickingTool, colorPickingToolSwitch,
            eraserSwitch
        } = this.props

        if (isShowPenSetting) { showSettingSwitch() }
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
        if (isChooseEraser) { eraserSwitch() }

        colorPickingToolSwitch()
    }

    handleClearCanvas = () => {
        const { ctx, canvasW } = this.props.canvas
        clearCanvas(ctx, canvasW)
    }

    handleSave = () => {
        save(drawLayerId)
    }

    handleSwitchShowSettingBox = () => {
        this.setState({
            showSettingBox: !this.state.showSettingBox
        })

        const {
            showGrid, handleShowGridSwitch,
            isChooseEraser, eraserSwitch,
            isChooseColorPickingTool, colorPickingToolSwitch,
        } = this.props

        if (!showGrid) { handleShowGridSwitch() }
        if (isChooseEraser) { eraserSwitch() }
        if (isChooseColorPickingTool) { colorPickingToolSwitch() }
    }

    onHideColorPicker = () => {
        this.props.showSettingSwitch()
    }

    onColorSelect = (e) => {
        const { red, green, blue } = e.currentTarget
        if (red) {
            this.props.handleChangeBrushColor({
                red, green, blue
            })
            this.props.showSettingSwitch()
        }
    }

    render() {
        const {
            isShowPenSetting, showSettingSwitch, brushW, handleChangeBrushWidth,
            brushColor: { red, green, blue, alpha },
            showGrid, handleShowGridSwitch,
            dividingLineType, handleChangeDividingLineType,
            isChooseEraser, eraserW, changeEraserWidth,
            isChooseColorPickingTool
        } = this.props

        const { showSettingBox } = this.state
        const penSettingStyle = showSettingBox
            ? 'transition: transform 800ms ease 0ms; transform: translateX(0px); transform-origin: 50% 50% 0px;'
            : 'transition: transform 800ms ease 0ms; transform: translateX(-1100px); transform-origin: 50% 50% 0px;'

        const eraserSettingStyle = isChooseEraser
            ? 'transition: transform 800ms ease 0ms; transform: translateX(0px); transform-origin: 50% 50% 0px;'
            : 'transition: transform 800ms ease 0ms; transform: translateX(1100px); transform-origin: 50% 50% 0px;'

        return (
            <View>
                <ScrollView
                    className='tools'
                    scrollX
                    scrollWithAnimation
                    lowerThreshold='20'
                    upperThreshold='20'
                >
                    <View className='options'>
                        <View
                            className='item'
                            onClick={this.handleSwitchShowSettingBox}
                        >
                            <IconFont
                                name='pen'
                                color={`rgba(${red}, ${green}, ${blue}, ${alpha})`}
                                size={50}
                            />
                            <Text className='name'>笔</Text>
                        </View>
                        <View
                            className='item'
                            onClick={handleShowGridSwitch}
                        >
                            <IconFont
                                name='wangge'
                                size={50}
                                color={showGrid ? '' : '#ccc'}
                            />
                            <Text className='name'>网格线</Text>
                        </View>
                        <View
                            className='item'
                        >
                            <Picker
                                range={this.dividingLineTypeList}
                                onChange={handleChangeDividingLineType}
                            >
                                <IconFont
                                    name='flip'
                                    size={50}
                                    color={dividingLineType !== 0 ? '' : '#ccc'}
                                />
                                <Text className='name'>对称轴</Text>
                            </Picker>
                        </View>
                        <View
                            className='item'
                            onClick={this.handleColorPickingToolSwitch}
                        >
                            <IconFont
                                name='quse'
                                size={50}
                                color={isChooseColorPickingTool ? '' : '#ccc'}
                            />
                            <Text className='name'>取色器</Text>
                        </View>
                        <View
                            className='item'
                            onClick={this.handleEraserSwitch}
                        >
                            <IconFont
                                name='xiangpi'
                                size={50}
                                color={isChooseEraser ? '' : '#ccc'}
                            />
                            <Text className='name'>橡皮</Text>
                        </View>
                        <View className='item' onClick={this.handleClearCanvas}>
                            <IconFont
                                name='delete'
                                size={50}
                            />
                            <Text className='name'>清空</Text>
                        </View>
                        <View className='item' onClick={this.handleSave}>
                            <IconFont
                                name='save'
                                size={50}
                            />
                            <Text className='name'>保存</Text>
                        </View>
                    </View>
                </ScrollView>
                <View className='setting-box' style={penSettingStyle}>
                    <View className='slider-box'>
                        <Text>笔刷\n大小</Text>
                        <Slider
                            className='slider'
                            min='1'
                            max='50'
                            step='1'
                            showValue
                            blockSize='15'
                            activeColor='#000'
                            backgroundColor='#ccc'
                            blockColor='#000'
                            value={brushW}
                            onChanging={handleChangeBrushWidth}
                        />
                    </View>
                    <View className='color-btn' onClick={showSettingSwitch}>笔刷颜色</View>
                </View>
                <color-picker
                    show={isShowPenSetting}
                    color='#000'
                    onClose={this.onHideColorPicker}
                    onChange={this.onColorSelect}
                />
                <View className='setting-box' style={eraserSettingStyle}>
                    <View className='slider-box'>
                        <Text>橡皮\n大小</Text>
                        <Slider
                            className='slider'
                            min='1'
                            max='50'
                            step='1'
                            showValue
                            blockSize='15'
                            activeColor='#000'
                            backgroundColor='#ccc'
                            blockColor='#000'
                            value={eraserW}
                            onChange={changeEraserWidth}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default ToolBox
