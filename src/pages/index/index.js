import Taro, { Component } from '@tarojs/taro'
import { View, Canvas, Button, Text } from '@tarojs/components'
import ToolBox from '../../components/ToolBox/ToolBox'

import { connect } from '@tarojs/redux'
import { changeBrushColor } from '../../actions/brushSettings'
import { initCanvas, showBackgroundSettingSwitch, backgroundSwitch } from '../../actions/canvasSettings'

import { drawCanvas, getImageData, drawGrid, drawLine } from '../../utils/wx-tool'
import { backgroundLayerId, gridLayerId, dividinglineLayerId, drawLayerId } from '../../canvas-config'

import './index.css'
import '../../iconfont.css'
import logo from '../../image/logo.png'

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
        showBackgroundSettingSwitch() {
            dispatch(showBackgroundSettingSwitch())
        },
        backgroundSwitch(color) {
            dispatch(backgroundSwitch(color))
        }
    })
)
class Index extends Component {
    state = {
        isIPhoneX: false 
    }

    config = {
        navigationBarTitleText: '像素绘画助手',
        enablePullDownRefresh: false,
        disableScroll: true,
    }

    componentWillMount() {
        const { initCanvas } = this.props
        try {
            const systemInfo = Taro.getSystemInfoSync()
            if (systemInfo.model.indexOf('iPhone X') != -1) {
                this.setState({
                    isIPhoneX: true
                })
            }
            initCanvas({
                ctx: Taro.createCanvasContext(drawLayerId),
                canvasW: systemInfo.windowWidth * 2
            })
        } catch (e) {
            initCanvas({
                ctx: Taro.createCanvasContext(drawLayerId),
                canvasW: 750
            })
        }
    }

    handleTouchStart = e => {
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
        const { isIPhoneX } = this.state
        
        drawGrid(gridLayerId, canvasW, brushW)
        drawLine(dividinglineLayerId, canvasW, dividingLineType)

        return (
            <View className='painting'>
                <View className='canvas-container'>
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

                <ToolBox isIPhoneX={isIPhoneX}/>

                <View 
                    className='bottom-btn' 
                    style={isIPhoneX ? canvasW > 1000 ? 'display: none;' : 'bottom: 30px;' : '' }
                >
                    <Button 
                        className='contact-button'
                        openType='contact'
                    >
                        意见反馈
                    </Button>
                    <Text className='iconfont icon-shuxian-copy-copy' style='font-size: 20px;'></Text>
                    <Button 
                        className='share-button'
                        openType='share'
                    >
                        推荐好友
                    </Button>
                </View>
            </View>
        )
    }

    onShareAppMessage() {
        return {
            path: '/pages/index/index',
            title: '🐥像素绘画小工具',
            imageUrl: logo,
            success: res => { },
            fail: err => { }
        }
    }
}

export default Index
