import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IconFont from '../iconfont'

import './index.less'

class CustomNavigation extends Component {

    static defaultProps = {
        title: '像素涂画',
        onSwitch: () => { }
    }

    state = {
        statusBarHeight: 20,
        isOpenedNavActionSheet: false
    }

    componentWillMount() {
        Taro.getSystemInfo({
            success: res => {
                const statusBarHeight = res.statusBarHeight
                this.setState({
                    statusBarHeight,
                })
            },
            fail: err => { }
        })
    }

    openActionSheet = () => {
        this.setState({
            isOpenedNavActionSheet: true
        })
        this.props.onSwitch({ isOpenedNavActionSheet: true })
    }

    closeActionSheet = (e) => {
        e.stopPropagation()
        if (e.target.dataset.turnoff === '1') {
            this.setState({
                isOpenedNavActionSheet: false
            })
            this.props.onSwitch({ isOpenedNavActionSheet: false })
        }
    }

    handleTouchMove = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    toAboutPage = () => {
        Taro.navigateTo({
            url: '/pages/about/about'
        })
    }

    // onReward() {
    //     Taro.previewImage({
    //         urls: ['cloud://image-filter-f6l96.696d-image-filter-f6l96-1302313890/admire-qrcode.jpg'],
    //     }).then(() => {

    //     }).catch(err => {})
    // }


    render() {
        const { title } = this.props
        const { statusBarHeight, isOpenedNavActionSheet } = this.state

        return (
            <View>
                <View className='navigation'>
                    <View style={`height:${statusBarHeight}px;`}></View>
                    <View className='toolbar'>
                        <View className='icon' onClick={this.openActionSheet}><IconFont name='jiahao' size={50} color='#000' /></View>
                        <View className='title'>{title}</View>
                    </View>
                </View>
                <View style={`height:${statusBarHeight + 42}px;`}></View>
                <View
                    className='action-sheet'
                    onClick={this.closeActionSheet}
                    onTouchMove={this.handleTouchMove}
                    style={isOpenedNavActionSheet ? '' : 'display: none;'}
                    dataTurnoff='1'
                >
                    <View
                        className='rectangle'
                        style={`top:${statusBarHeight + 50}px`}
                    >
                        <View className='triangle-up'></View>
                        <Button className='action-item' hoverClass='button-hover' openType='share' dataTurnoff='1'>
                            <View className='left'>
                                <IconFont name='share' size={30} color='#000'/>
                                <Text className='text' dataTurnoff='1'>分享给好友</Text>
                            </View>
                            <IconFont name='jiantou' size={20} color='#000'/>
                        </Button>
                        {/* <View className='action-item' dataTurnoff='1' onClick={this.onReward}>
                            <View className='left'>
                                <IconFont name='kafei' size={30} color='#000'/>
                                <Text className='text' dataTurnoff='1'>请作者喝咖啡</Text>
                            </View>
                            <IconFont name='jiantou' size={20} color='#000'/>
                        </View> */}
                        <Button className='action-item' hoverClass='button-hover' openType='contact' dataTurnoff='1'>
                            <View className='left'>
                                <IconFont name='feedback' size={30} color='#000'/>
                                <Text className='text' dataTurnoff='1'>建议反馈</Text>
                            </View>
                            <IconFont name='jiantou' size={20} color='#000'/>
                        </Button>
                        <View className='action-item' dataTurnoff='1' onClick={this.toAboutPage}>
                            <View className='left'>
                                <IconFont name='about' size={30} color='#000'/>
                                <Text className='text' dataTurnoff='1'>关于</Text>
                            </View>
                            <IconFont name='jiantou' size={20} color='#000'/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CustomNavigation
