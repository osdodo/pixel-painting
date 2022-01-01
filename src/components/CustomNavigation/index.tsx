import React, { useState, useEffect, useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import IconFont from '../iconfont';

import { useRecoilState } from 'recoil';
import { showActionSheetState } from '../../store/atom';

import './index.less';

const CustomNavigation = ({ title = '像素涂画' }: { title: string }) => {
    const [statusBarHeight, setStatusBarHeight] = useState(20);
    const [showActionSheet, setShowActionSheet] = useRecoilState(
        showActionSheetState
    );

    useEffect(() => {
        Taro.getSystemInfo({
            success: res => {
                const statusBarHeight = res.statusBarHeight;
                setStatusBarHeight(statusBarHeight);
            },
            fail: () => {},
        });
    }, []);

    const openActionSheet = useCallback(() => {
        setShowActionSheet(true);
    }, []);

    const closeActionSheet = useCallback(e => {
        e.stopPropagation();
        setShowActionSheet(false);
    }, []);

    const handleTouchMove = useCallback(e => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const toAboutPage = useCallback(() => {
        Taro.navigateTo({
            url: '/pages/about/about',
        });
    }, []);

    const onReward = useCallback(() => {
        Taro.previewImage({
            urls: [
                'cloud://pixel-painting-bkykm.7069-pixel-painting-bkykm-1301723573/admire-qrcode.jpg',
            ],
        });
    }, []);

    return (
        <View>
            <View className="navigation">
                <View style={`height:${statusBarHeight}px;`}></View>
                <View className="toolbar">
                    <View className="icon" onClick={openActionSheet}>
                        <IconFont name="jiahao" size={20} color="#000" />
                    </View>
                    <View className="title">{title}</View>
                </View>
            </View>
            <View style={`height:${statusBarHeight + 42}px;`}></View>
            <View
                className="action-sheet"
                onClick={closeActionSheet}
                onTouchMove={handleTouchMove}
                style={showActionSheet ? '' : 'display: none;'}
            >
                <View
                    className="rectangle"
                    style={`top:${statusBarHeight + 50}px`}
                >
                    <View className="triangle-up"></View>
                    <Button
                        className="action-item"
                        hoverClass="button-hover"
                        openType="share"
                    >
                        <View className="left">
                            <IconFont name="share" size={20} color="#000" />
                            <Text className="text">分享给好友</Text>
                        </View>
                        <IconFont name="jiantou" size={10} color="#000" />
                    </Button>
                    <View className="action-item" onClick={onReward}>
                        <View className="left">
                            <IconFont name="kafei" size={20} color="#000" />
                            <Text className="text">请作者喝咖啡</Text>
                        </View>
                        <IconFont name="jiantou" size={10} color="#000" />
                    </View>
                    <Button
                        className="action-item"
                        hoverClass="button-hover"
                        openType="contact"
                    >
                        <View className="left">
                            <IconFont name="feedback" size={20} color="#000" />
                            <Text className="text">建议反馈</Text>
                        </View>
                        <IconFont name="jiantou" size={10} color="#000" />
                    </Button>
                    <View className="action-item" onClick={toAboutPage}>
                        <View className="left">
                            <IconFont name="about" size={20} color="#000" />
                            <Text className="text">关于</Text>
                        </View>
                        <IconFont name="jiantou" size={10} color="#000" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CustomNavigation;
