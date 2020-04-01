import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import ToolBox from '../../components/ToolBox'

import { connect } from '@tarojs/redux'
import { changeBrushColor, showSettingSwitch } from '../../actions/brushSettings'
import { initCanvas } from '../../actions/canvasSettings'

import { drawCanvas, getImageData, drawGrid, drawLine } from '../../utils/wx-tool'
import { backgroundLayerId, gridLayerId, dividinglineLayerId, drawLayerId } from '../../canvas-config'

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
    })
)
class Index extends Component {

    config = {
        navigationBarTitleText: '像素表情生成',
        enablePullDownRefresh: false,
        disableScroll: true,
    }

    componentWillMount() {
        const { initCanvas } = this.props
        try {
            const systemInfo = Taro.getSystemInfoSync()
            initCanvas({
                ctx: Taro.createCanvasContext(drawLayerId),
                canvasW: systemInfo.screenWidth
            })
        } catch (e) {
            initCanvas({
                ctx: Taro.createCanvasContext(drawLayerId),
                canvasW: 750
            })
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
            getImageData(drawLayerId, e.touches[0].x, e.touches[0].y, 1, 1).then(data => {
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
            drawCanvas(
                ctx, canvasW,
                e.touches[0].x, e.touches[0].y,
                brushW, brushColor,
                dividingLineType,
                isChooseEraser, eraserW
            )
        }
    }

    handleTouchMove = e => {
        if ( this.props.isChooseColorPickingTool) return
        const {
            canvas: { ctx, canvasW },
            brushW,
            brushColor,
            dividingLineType,
            isChooseEraser,
            eraserW
        } = this.props
        drawCanvas(
            ctx, canvasW,
            e.touches[0].x, e.touches[0].y,
            brushW, brushColor,
            dividingLineType,
            isChooseEraser, eraserW
        )
    }

    render() {
        const { showGrid, canvas: { canvasW }, brushW, dividingLineType } = this.props

        drawGrid(gridLayerId, canvasW, brushW)
        drawLine(dividinglineLayerId, canvasW, dividingLineType)

        return (
            <View className='index'>
                <View className='container' style={`height: ${canvasW}px`}>
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
                <ToolBox />
            </View>
        )
    }

    onShareAppMessage() {
        return {
            path: '/pages/index/index',
            title: '像素表情生成',
            imageUrl: 'cloud://pixel-painting-bkykm.7069-pixel-painting-bkykm-1301723573/share.jpeg',
            success: res => { },
            fail: err => { }
        }
    }
}

export default Index
