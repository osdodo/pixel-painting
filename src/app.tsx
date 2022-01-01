import React, { Component } from 'react';
import { RecoilRoot } from 'recoil';

import './app.less';

// 小程序里使用recoil时报错：`ReferenceError: Window is not defined`
// node_modules/recoil/es/recoil.js 文件中 value instanceof Window 打此补丁即可运行
if (typeof global !== 'undefined') {
    (global as any).Window = function Window() {};
}

class App extends Component {
    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // this.props.children 是将要会渲染的页面
    render() {
        return <RecoilRoot>{this.props.children}</RecoilRoot>;
    }
}

export default App;
