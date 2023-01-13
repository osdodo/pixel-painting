import React from 'react';
import { RecoilRoot } from 'recoil';

import './app.less';

// 小程序里使用recoil时报错：`ReferenceError: Window is not defined`
// node_modules/recoil/es/recoil.js 文件中 value instanceof Window 打此补丁即可运行
// @ts-ignore
if (typeof global !== 'undefined') {
    // @ts-ignore
    (global as any).Window = function Window() {};
}

const App = ({ children }) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};

export default App;
