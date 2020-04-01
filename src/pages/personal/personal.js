import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './personal.less'

class Personal extends Component {
    config = {
        navigationBarTitleText: '个人中心'
    }

    componentWillMount() {
        wx.cloud.init({
            traceUser: true
        })
    }

    onReward() {
        Taro.previewImage({
            urls: ['cloud://pixel-painting-bkykm.7069-pixel-painting-bkykm-1301723573/admire-qrcode.jpg'],
        }).then(() => {

        }).catch(err => {})
    }

    render() {
        return (
            <View>
                <View className='block'>
                    <View className='item' onClick={this.onReward}>
                        <View className='left'>
                            <Text className='iconfont icon-dashang' style='font-size: 22px;'></Text>
                            <Text className='title'>请作者喝咖啡</Text>
                        </View>
                        <Text className='iconfont icon-jinru' style='font-size: 15px;'></Text>
                    </View>
                    <View className='line'></View>
                    <Button hoverClass='none' open-type='contact'>
                        <View className='item'>
                            <View className='left'>
                                <Text className='iconfont icon-jianyifankui' style='font-size: 22px;'></Text>
                                <Text className='title'>建议反馈</Text>
                            </View>
                            <Text className='iconfont icon-jinru' style='font-size: 15px;'></Text>
                        </View>
                    </Button>
                </View>
            </View>
        )
    }
}

export default Personal
