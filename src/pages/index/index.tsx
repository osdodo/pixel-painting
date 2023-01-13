import React, { useEffect, useCallback, useRef } from 'react';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { View, Text, Canvas } from '@tarojs/components';
import CustomNavigation from '@/components/CustomNavigation';
import ToolBox from '@/components/ToolBox';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
    showActionSheetState,
    penToolState,
    showGridToolState,
    showPickingToolState,
    dividingLineToolState,
    eraserToolState,
} from '@/store/atom';
import {
    drawCanvas,
    drawGrid,
    drawLine,
    rgbToHex,
} from '@/utils/helper';
import {
    backgroundLayerId,
    dividinglineLayerId,
    drawLayerId,
    gridLayerId,
} from '@/config/index';

import './index.less';

const Index = () => {
    const [penTool, setPenTool] = useRecoilState(penToolState);
    const [showPickingTool, setShowPickingTool] = useRecoilState(
        showPickingToolState
    );
    const showGridTool = useRecoilValue(showGridToolState);
    const dividingLineTool = useRecoilValue(dividingLineToolState);
    const eraserTool = useRecoilValue(eraserToolState);
    const showActionSheet = useRecoilValue(showActionSheetState);
    const screenWidthRef = useRef(0);

    useEffect(() => {
        screenWidthRef.current = Taro.getSystemInfoSync().screenWidth;
    }, []);

    useEffect(() => {
        if (showGridTool) {
            drawGrid({
                canvasId: gridLayerId,
                canvasW: screenWidthRef.current,
                brushW: penTool.brushW,
            });
        }
    }, [penTool, showGridTool]);

    useEffect(() => {
        drawLine({
            canvasId: dividinglineLayerId,
            canvasW: screenWidthRef.current,
            dividingLineType: dividingLineTool.type,
        });
    }, [dividingLineTool]);

    const handleTouchStart = useCallback(
        async e => {
            if (showPickingTool) {
                const { data } = await Taro.canvasGetImageData({
                    canvasId: drawLayerId,
                    x: e.touches[0].x,
                    y: e.touches[0].y,
                    width: 1,
                    height: 1,
                });
                const r = data[0];
                const g = data[1];
                const b = data[2];
                const a = Number((data[3] / 255).toFixed(1));
                if (a >= 0.1) {
                    if (!(r > 250 && g > 250 && b > 250)) {
                        setPenTool(old => {
                            return {
                                ...old,
                                color: rgbToHex(r, g, b),
                            };
                        });
                        if (showPickingTool) {
                            setShowPickingTool(false);
                        }
                    }
                }
            } else {
                const ctx = Taro.createCanvasContext(drawLayerId);
                drawCanvas({
                    ctx,
                    canvasW: screenWidthRef.current,
                    touchX: e.touches[0].x,
                    touchY: e.touches[0].y,
                    brushW: penTool.brushW,
                    brushColor: penTool.color,
                    dividingLineType: dividingLineTool.type,
                    isChooseEraser: eraserTool.show,
                    eraserW: eraserTool.eraserW,
                });
            }
        },
        [penTool, showPickingTool, dividingLineTool, eraserTool]
    );

    const handleTouchMove = useCallback(
        e => {
            if (showPickingTool) {
                Taro.showToast({
                    title: '正在取色器状态, 可点击“取色器”关闭它',
                    icon: 'none',
                    duration: 1000,
                });
                return;
            }
            const ctx = Taro.createCanvasContext(drawLayerId);
            drawCanvas({
                ctx,
                canvasW: screenWidthRef.current,
                touchX: e.touches[0].x,
                touchY: e.touches[0].y,
                brushW: penTool.brushW,
                brushColor: penTool.color,
                dividingLineType: dividingLineTool.type,
                isChooseEraser: eraserTool.show,
                eraserW: eraserTool.eraserW,
            });
        },
        [penTool, showPickingTool, dividingLineTool, eraserTool]
    );

    useShareAppMessage(() => {
        return {
            title: '像素涂画',
            path: '/pages/index/index',
            imageUrl: 'https://s2.loli.net/2022/10/11/WPZLQlKIV2zi9Ca.jpg',
        };
    });

    return (
        <View className="index">
            <CustomNavigation title="像素涂画" />
            <View
                className="container"
                style={
                    penTool.showPicker || showActionSheet
                        ? 'display: none;'
                        : ''
                }
            >
                <Canvas disableScroll canvasId={backgroundLayerId} />
                <Canvas
                    disableScroll
                    canvasId={gridLayerId}
                    style={showGridTool ? '' : 'display: none;'}
                />
                <Canvas disableScroll canvasId={dividinglineLayerId} />
                <Canvas
                    disableScroll
                    canvasId={drawLayerId}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                />
            </View>
            <View
                className="container"
                style={showActionSheet ? '' : 'display: none;'}
            >
                <Text className="tips">暂时收起画布</Text>
            </View>
            <ToolBox />
        </View>
    );
};

export default Index;
