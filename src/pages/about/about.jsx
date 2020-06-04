import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IconFont from '../../components/iconfont'
import './about.less'

class About extends Component {
    config = {
        navigationBarTitleText: '关于',
    }

    render() {
        return (
            <View className='about'>
                <View className='container'>
                    <Text style='color:#7c7b7b;'>喝牛奶的鸵鸟</Text>
                    <Text class='planet left'></Text>
                    <IconFont name='tuoniao' color='#000' size={40} />
                    <Text class='planet right'></Text>
                    <Text style='color:#7c7b7b;'>欢迎来到真实的荒漠</Text>
                </View>
                <View className='info'>联系方式：dodomatrix@protonmail.com</View>
            </View>
        )
    }
}

export default About
