import { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

class Authorization extends Component {

    state = {
        userInfo: {
            nickName: ''
        }
    }

    componentWillMount() {
        try {
            const userInfo = Taro.getStorageSync('userInfo')
            if (userInfo) {
                this.setState({
                    userInfo
                })
            }
        } catch (e) {

        }
    }

    onGotUserInfo = (e) => {
        const userInfo = e.target.userInfo
        if (!userInfo) {
            return
        }

        this.setState({
            userInfo
        })

        Taro.setStorage({
            key: 'userInfo',
            data: userInfo
        })

        const { cb } = this.props
        cb && cb()
    }

    render() {
        const { userInfo } = this.state
        const { children } = this.props
        return (
            userInfo.nickName ?
                <View onClick={this.props.cb}>
                    {children}
                </View>
                :
                <Button
                    hoverClass='none'
                    openType='getUserInfo'
                    onGetUserInfo={this.onGotUserInfo}
                >
                    {children}
                </Button>
        )
    }
}

export default Authorization
