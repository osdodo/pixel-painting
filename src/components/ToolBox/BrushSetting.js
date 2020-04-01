import { Component } from '@tarojs/taro'
import { View, Text, Slider } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import {
    showSettingSwitch,
    changeBrushWidth,
    changeBrushColor
} from '../../actions/brushSettings'

import './BrushSetting.less'

@connect(
    ({ brushSettings }) => brushSettings,
    dispatch => ({
        handleShowSettingSwitch() {
            dispatch(showSettingSwitch())
        },
        handleChangeBrushWidth(e) {
            dispatch(changeBrushWidth(e.detail.value))
        },
        handleChangeBrushColor(e) {
            const brushColor = {}
            brushColor[e.target.dataset.color] = e.detail.value
            dispatch(changeBrushColor(brushColor))
        }
    })
)
class BrushSetting extends Component {

    render() {
        const {
            isShowPenSetting, handleShowSettingSwitch,
            brushW, handleChangeBrushWidth,
            brushColor, handleChangeBrushColor,
        } = this.props

        const { red, green, blue, alpha } = brushColor

        const penSettingStyle = isShowPenSetting
            ? 'transition: transform 800ms ease 0ms; transform: translateX(0px); transform-origin: 50% 50% 0px;'
            : 'transition: transform 800ms ease 0ms; transform: translateX(-1100px); transform-origin: 50% 50% 0px;'
            
        return (
            <View
                className='pen-setting'
                style={penSettingStyle}
            >
                <View className='choose-container'>
                    <View className='slider-box'>
                        <Text>笔刷\n大小</Text>
                        <Slider
                            className='slider'
                            min='1'
                            max='50'
                            step='1'
                            showValue
                            blockSize='12'
                            blockColor='#FFFFFF'
                            activeColor='#FFFFFF'
                            value={brushW}
                            onChanging={handleChangeBrushWidth}
                        />
                    </View>
                    <View className='slider-box'>
                        <Text>R</Text>
                        <Slider
                            className='slider'
                            min='0'
                            max='255'
                            step='1'
                            showValue
                            blockSize='12'
                            blockColor='#FFFFFF'
                            activeColor='#FFFFFF'
                            value={red}
                            dataColor='red'
                            onChanging={handleChangeBrushColor}
                        />
                    </View>
                    <View className='slider-box'>
                        <Text>G</Text>
                        <Slider
                            className='slider'
                            min='0'
                            max='255'
                            step='1'
                            showValue
                            blockSize='12'
                            blockColor='#FFFFFF'
                            activeColor='#FFFFFF'
                            value={green}
                            dataColor='green'
                            onChanging={handleChangeBrushColor}
                        />
                    </View>
                    <View className='slider-box'>
                        <Text>B</Text>
                        <Slider
                            className='slider'
                            min='0'
                            max='255'
                            step='1'
                            showValue
                            blockSize='12'
                            blockColor='#FFFFFF'
                            activeColor='#FFFFFF'
                            value={blue}
                            dataColor='blue'
                            onChanging={handleChangeBrushColor}
                        />
                    </View>
                    <View className='slider-box'>
                        <Text>A</Text>
                        <Slider
                            className='slider'
                            min='0'
                            max='1'
                            step='0.1'
                            showValue
                            blockSize='12'
                            blockColor='#FFFFFF'
                            activeColor='#FFFFFF'
                            value={alpha}
                            dataColor='alpha'
                            onChanging={handleChangeBrushColor}
                        />
                    </View>
                    <Text
                        className='iconfont icon-shouqi4-copy'
                        style='font-size: 20px;'
                        onClick={handleShowSettingSwitch}
                    >
                    </Text>
                </View>
            </View>
        )
    }
}

export default BrushSetting
