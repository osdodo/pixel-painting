import { Component } from '@tarojs/taro'
import { View, Text, Slider } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { changeEraserWidth } from '../../../actions/canvasSettings'

import './EraserSetting.css'

@connect(
    ({ canvasSetting: { isChooseEraser, eraserW } }) => ({
        isChooseEraser, 
        eraserW
    }),
    dispatch => ({
        onChangeEraserWidth(e) {
            dispatch(changeEraserWidth(e.detail.value))
        }
    })
)

class EraserSetting extends Component {

    render() {
        const {
            isChooseEraser, eraserW, 
            onChangeEraserWidth,
            isiPhoneX
        } = this.props
        let eraserSettingStyle = isChooseEraser
            ? 'transition: transform 800ms ease 0ms; transform: translateX(0px); transform-origin: 50% 50% 0px;'
            : 'transition: transform 800ms ease 0ms; transform: translateX(1100px); transform-origin: 50% 50% 0px;'
        if (isiPhoneX) {
            eraserSettingStyle = eraserSettingStyle + 'bottom: 20px;'
        }
        return (
            <View
                className='eraser-setting'
                style={eraserSettingStyle}
            >
                <View className='slider-box'>
                    <Text>橡皮\n大小</Text>
                    <Slider
                        className='slider'
                        min='5'
                        max='50'
                        step='1'
                        showValue
                        blockSize='17'
                        blockColor='lightgray'
                        activeColor='lightgray'
                        value={eraserW}
                        onChanging={onChangeEraserWidth}
                    />
                </View>
            </View>
        )
    }
}

export default EraserSetting
