import { useGlobalIconFont } from './components/iconfont/helper';

export default {
    pages: ['pages/index/index', 'pages/about/about'],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '像素涂画',
        navigationBarTextStyle: 'black',
    },
    usingComponents: {
        // 定义需要引入的第三方组件
        // 1. key 值指定第三方组件名字，以小写开头
        // 2. value 值指定第三方组件 js 文件的相对路径
        ...useGlobalIconFont(),
        'color-picker': './components/color-picker/color-picker',
    },
};
