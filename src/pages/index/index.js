import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import ToolBox from '../../components/ToolBox'
import CustomNavigation from '../../components/CustomNavigation'
import { connect } from '@tarojs/redux'
import { changeBrushColor, showSettingSwitch } from '../../actions/brushSettings'
import { initCanvas, colorPickingToolSwitch } from '../../actions/canvasSettings'
import { drawCanvas, getImageData, drawGrid, drawLine } from '../../utils/wx-tool'
import {
    backgroundLayerId, gridLayerId,
    dividinglineLayerId, drawLayerId
} from '../../canvas-config'

import './index.less'

@connect(
    ({ brushSettings, canvasSetting }) => ({
        ...brushSettings,
        ...canvasSetting
    }),
    dispatch => ({
        initCanvas(canvas) {
            dispatch(initCanvas(canvas))
        },
        changeBrushColor(brushColor) {
            dispatch(changeBrushColor(brushColor))
        },
        showSettingSwitch() {
            dispatch(showSettingSwitch())
        },
        colorPickingToolSwitch() {
            dispatch(colorPickingToolSwitch())
        },
    })
)
class Index extends Component {

    config = {
        navigationBarTitleText: '像素涂画',
        enablePullDownRefresh: false,
        disableScroll: true,
        navigationStyle: 'custom'
    }

    state = {
        showCanvas: true
    }

    componentWillMount() {
        const { initCanvas } = this.props
        try {
            const { screenWidth } = Taro.getSystemInfoSync()
            initCanvas({
                ctx: Taro.createCanvasContext(drawLayerId),
                canvasW: screenWidth
            })
        } catch (e) {

        }

        wx.cloud.init({
            traceUser: true
        })
    }

    handleTouchStart = e => {
        const {
            isShowPenSetting, showSettingSwitch,
        } = this.props

        if (isShowPenSetting) {
            showSettingSwitch()
        }

        if (this.props.isChooseColorPickingTool) {
            getImageData({
                canvasId: drawLayerId,
                dx: e.touches[0].x,
                dy: e.touches[0].y,
                dWidth: 1, dHeight: 1
            }).then(data => {
                const r = data[0]
                const g = data[1]
                const b = data[2]
                const a = Number((data[3] / 255).toFixed(1))

                if (a >= 0.1) {
                    if (!(r > 250 && g > 250 && b > 250)) {
                        this.props.changeBrushColor({
                            red: r,
                            green: g,
                            blue: b,
                            alpha: a
                        })

                        // 切换成笔的状态
                        const { isChooseColorPickingTool, colorPickingToolSwitch } = this.props
                        if (isChooseColorPickingTool) {
                            colorPickingToolSwitch()
                        }
                    }
                }
            })
        }
        else {
            const {
                canvas: { ctx, canvasW },
                brushW,
                brushColor,
                dividingLineType,
                isChooseEraser,
                eraserW
            } = this.props
            drawCanvas({
                ctx, canvasW,
                touchX: e.touches[0].x,
                touchY: e.touches[0].y,
                brushW, brushColor,
                dividingLineType,
                isChooseEraser, eraserW
            })
        }
    }

    handleTouchMove = e => {
        if (this.props.isChooseColorPickingTool) {
            Taro.showToast({
                title: '正在取色器状态, 可点击“取色器”关闭它',
                icon: 'none',
                duration: 1000
            })
            return
        }
        const {
            canvas: { ctx, canvasW },
            brushW,
            brushColor,
            dividingLineType,
            isChooseEraser,
            eraserW
        } = this.props
        drawCanvas({
            ctx, canvasW,
            touchX: e.touches[0].x,
            touchY: e.touches[0].y,
            brushW, brushColor,
            dividingLineType,
            isChooseEraser, eraserW
        })
    }

    handleSwitchAction = ({ isOpenedNavActionSheet }) => {
        this.setState({
            showCanvas: !isOpenedNavActionSheet
        })
    }

    render() {
        const { isShowPenSetting, showGrid, brushW, canvas: { canvasW }, dividingLineType } = this.props
        const { showCanvas } = this.state
        drawGrid({
            canvasId: gridLayerId,
            canvasW, brushW
        })
        drawLine({
            canvasId: dividinglineLayerId,
            canvasW, dividingLineType
        })

        return (
            <View className='index'>
                <CustomNavigation
                    title='像素涂画'
                    onSwitch={this.handleSwitchAction}
                />
                <View
                    className='container'
                    style={isShowPenSetting || !showCanvas ? 'display: none;' : ''}
                >
                    <Canvas
                        canvasId={backgroundLayerId}
                        disableScroll
                    >
                    </Canvas>
                    <Canvas
                        canvasId={gridLayerId}
                        disableScroll
                        style={showGrid ? '' : 'display: none;'}
                    />
                    <Canvas
                        canvasId={dividinglineLayerId}
                        disableScroll
                    />
                    <Canvas
                        canvasId={drawLayerId}
                        disableScroll
                        onTouchStart={this.handleTouchStart}
                        onTouchMove={this.handleTouchMove}
                    />
                </View>
                <View
                    className='container'
                    style={!showCanvas ? '' : 'display: none;'}
                >
                   <Text className='tips'>暂时收起画布</Text>
                </View>
                <ToolBox />
            </View>
        )
    }

    onShareAppMessage() {
        return {
            path: '/pages/index/index',
            title: '像素涂画',
            imageUrl: 'cloud://pixel-painting-bkykm.7069-pixel-painting-bkykm-1301723573/share.jpeg',
            success: res => { },
            fail: err => { }
        }
    }
}

export default Index
