import { Component } from '@tarojs/taro'
import { View, Canvas, Button, Text } from '@tarojs/components'

import { drawRect, clearRect, getImageData } from '../../utils/utils'

import ToolBox from '../../components/toolBox/ToolBox'

import { connect } from '@tarojs/redux'
import { changeBrushColor } from '../../actions/brushSettings'
import { initCanvas , showBackgroundSettingSwitch, backgroundSwitch } from '../../actions/canvasSettings'

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
        isiPhoneX: false 
    }
    constructor(props) {
        super(props)
    }

    config = {
        navigationBarTitleText: '像素绘画助手',
        enablePullDownRefresh: false,
        disableScroll: true,
    }

    componentWillMount() {
        const { initCanvas } = this.props
        try {
            const systemInfo = wx.getSystemInfoSync()
            if (systemInfo.model.indexOf('iPhone X') != -1) {
                this.setState({
                    isiPhoneX: true
                })
            }
            initCanvas({
                ctx: wx.createCanvasContext('canvas'),
                canvasW: systemInfo.windowWidth * 2
            })
        } catch (e) {
            initCanvas({
                ctx: wx.createCanvasContext('canvas'),
                canvasW: 750
            })
        }
        this.drawGrid(this.props.brushW)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.brushW !== nextProps.brushW) {
            this.drawGrid(nextProps.brushW)
        }
    }

    onTouchStart(e) {
        const { isChooseColorPickingTool, changeBrushColor } = this.props
        if (isChooseColorPickingTool) {
            getImageData('canvas', e.touches[0].x, e.touches[0].y, 1, 1).then(data => {
                const r = data[0]
                const g = data[1]
                const b = data[2]
                const a = Number((data[3] / 255).toFixed(1))

                if (a >= 0.1) {
                    if (!(r > 250 && g > 250 && b > 250)) {
                        changeBrushColor({
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
            this.drawCanvas(e.touches[0].x, e.touches[0].y)
        }
    }

    onTouchMove(e) {
        const { isChooseColorPickingTool } = this.props
        if (isChooseColorPickingTool) return
        this.drawCanvas(e.touches[0].x, e.touches[0].y)
    }

    drawCanvas(touchX, touchY) {
        const {
            canvas,
            brushW, brushColor,
            dividingLineType,
            isChooseEraser, eraserW,
        } = this.props

        const { ctx, canvasW } = canvas
        const { red, green, blue, alpha } = brushColor
        const x = Number((touchX / brushW).toFixed(0)) * brushW
        const y = Number((touchY / brushW).toFixed(0)) * brushW
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`

        if (isChooseEraser) { clearRect(ctx, x, y, eraserW, eraserW) }
        else { drawRect(ctx, x, y, brushW, brushW, color) }

        if (dividingLineType !== 0) {
            let c = canvasW / 4
            let x2_ = x - c
            let x2 = 0
            let y2_ = y - c
            let y2 = 0
            if (dividingLineType === 1) {

                if (x2_ < 0) { x2 = c + x2_ * (-1) - brushW }
                else { x2 = c - x2_ - brushW }

                if (isChooseEraser) { clearRect(ctx, x2, y, eraserW, eraserW) }
                else { drawRect(ctx, x2, y, brushW, brushW, color) }

            }
            else if (dividingLineType === 2) {

                if (y2_ < 0) { y2 = c + y2_ * (-1) - brushW }
                else { y2 = c - y2_ - brushW }

                if (isChooseEraser) { clearRect(ctx, x, y2, eraserW, eraserW) }
                else { drawRect(ctx, x, y2, brushW, brushW, color) }

            }
            else if (dividingLineType === 3) {

                if (x2_ < 0) { x2 = c + x2_ * (-1) - brushW }
                else { x2 = c - x2_ - brushW }

                if (y2_ < 0) { y2 = c + y2_ * (-1) - brushW }
                else { y2 = c - y2_ - brushW }

                if (isChooseEraser) {
                    clearRect(ctx, x2, y, eraserW, eraserW)
                    clearRect(ctx, x, y2, eraserW, eraserW)
                    clearRect(ctx, x2, y2, eraserW, eraserW)
                }
                else {
                    drawRect(ctx, x2, y, brushW, brushW, color)
                    drawRect(ctx, x, y2, brushW, brushW, color)
                    drawRect(ctx, x2, y2, brushW, brushW, color)
                }
            }
        }
    }

    drawGrid(brushW) {
        const ctx = wx.createCanvasContext('grid')
        const { canvasW } = this.props.canvas
        ctx.save()
        ctx.setStrokeStyle('lightgray')
        ctx.setLineWidth(0.5)
        for (let i = brushW + 0.5; i < canvasW; i = i + brushW) {
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, canvasW)
            ctx.stroke()
        }
        for (let i = brushW + 0.5; i < canvasW; i = i + brushW) {
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(canvasW, i)
            ctx.stroke()
        }
        ctx.restore()
        ctx.draw()
    }

    drawLine() {
        const { dividingLineType } = this.props
        const ctx = wx.createCanvasContext('dividingline')
        const { canvasW } = this.props.canvas
        const C = canvasW / 4
        ctx.save()
        ctx.setStrokeStyle('#543c8d')
        ctx.setLineWidth(1)

        if (dividingLineType === 1) {
            ctx.beginPath()
            ctx.moveTo(C, 0)
            ctx.lineTo(C, canvasW)
            ctx.stroke()
        }
        else if (dividingLineType === 2) {
            ctx.beginPath()
            ctx.moveTo(0, C)
            ctx.lineTo(canvasW, C)
            ctx.stroke()
        }
        else if (dividingLineType === 3) {
            ctx.beginPath()
            ctx.moveTo(C, 0)
            ctx.lineTo(C, canvasW)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(0, C)
            ctx.lineTo(canvasW, C)
            ctx.stroke()
        }
        else {
            ctx.clearRect(0, 0, canvasW, canvasW)
        }

        ctx.restore()
        ctx.draw()
    }

    render() {
        this.drawLine()
        const { showGrid } = this.props
        const { isiPhoneX } = this.state
        let bottomBtnStyle = isiPhoneX ? 'bottom: 30px;' : ''
        if (this.props.canvas.canvasW > 1000) {
            bottomBtnStyle = 'display: none;'
        }
        return (
            <View className='painting'>
                <View className='canvas-container'>
                    <Canvas
                        canvasId='background'
                        disableScroll
                    >
                    </Canvas>
                    <Canvas
                        canvasId='grid'
                        disableScroll
                        style={showGrid ? '' : 'display: none;'}
                    />
                    <Canvas
                        canvasId='dividingline'
                        disableScroll
                    />
                    <Canvas
                        canvasId='canvas'
                        disableScroll
                        onTouchStart={this.onTouchStart}
                        onTouchMove={this.onTouchMove}
                    />
                </View>

                <ToolBox isiPhoneX={isiPhoneX}/>

                <View className='bottom-btn' style={bottomBtnStyle}>
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
                    <Text className='iconfont icon-shuxian-copy-copy' style='font-size: 20px;'></Text>
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
