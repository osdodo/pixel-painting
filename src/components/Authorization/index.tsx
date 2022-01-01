import React, { useState, useEffect, useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

const Authorization = ({
    children,
    cb,
}: {
    children: JSX.Element;
    cb: () => void;
}) => {
    const [userInfo, setUserInfo] = useState({
        nickName: '',
    });

    useEffect(() => {
        try {
            const userInfo = Taro.getStorageSync('userInfo');
            if (userInfo) {
                setUserInfo(userInfo);
            }
        } catch (e) {}
    }, []);

    const onGotUserInfo = useCallback(e => {
        const userInfo = e.target.userInfo;
        if (!userInfo) {
            return;
        }

        setUserInfo(userInfo);

        Taro.setStorage({
            key: 'userInfo',
            data: userInfo,
        });

        cb && cb();
    }, []);

    return userInfo.nickName ? (
        <View onClick={cb}>{children}</View>
    ) : (
        <Button
            hoverClass="none"
            openType="getUserInfo"
            onGetUserInfo={onGotUserInfo}
        >
            {children}
        </Button>
    );
};

export default Authorization;
