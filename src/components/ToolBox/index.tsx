import React, { useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Picker, ScrollView, Slider } from '@tarojs/components';
import IconFont from '../iconfont';
import { useRecoilState } from 'recoil';
import {
    penToolState,
    showGridToolState,
    dividingLineToolState,
    showPickingToolState,
    eraserToolState,
} from '../../store/atom';

import { save, clearCanvas } from '../../utils/helper';
import { drawLayerId, dividingLineList } from '../../config';

import './index.less';

const ToolBox = () => {
    const [penTool, setPenTool] = useRecoilState(penToolState);
    const [showPickingTool, setShowPickingTool] = useRecoilState(
        showPickingToolState
    );
    const [eraserTool, setEraserTool] = useRecoilState(eraserToolState);
    const [showGridTool, setShowGridTool] = useRecoilState(showGridToolState);
    const [dividingLineTool, setDividingLineTool] = useRecoilState(
        dividingLineToolState
    );

    const handleShowPenTool = useCallback(() => {
        setPenTool(old => {
            return {
                ...old,
                show: !old.show,
            };
        });

        if (eraserTool.show) {
            setEraserTool(old => {
                return {
                    ...old,
                    show: false,
                };
            });
        }

        if (showPickingTool) {
            setShowPickingTool(false);
        }
    }, [eraserTool]);

    const handleChangeBrushWidth = useCallback(e => {
        const brushW = Number(e.detail.value);
        setPenTool(old => {
            return {
                ...old,
                brushW,
            };
        });
    }, []);

    const handleShowPicker = useCallback(() => {
        setPenTool(old => {
            const showPicker = !old.showPicker;
            return {
                ...old,
                showPicker,
            };
        });
    }, []);

    const handleChangePenColor = useCallback(e => {
        const { hex } = e.currentTarget;
        if (hex) {
            setPenTool(old => {
                return {
                    ...old,
                    showPicker: false,
                    color: hex,
                };
            });
        }
    }, []);

    const handleShowGridTool = useCallback(() => {
        setShowGridTool(old => !old);
    }, []);

    const handleChangeDividingLine = useCallback(e => {
        const type = Number(e.detail.value);
        if (type === 0 || type === 1 || type === 2 || type === 3) {
            setDividingLineTool({
                type,
                show: false,
            });
        }
    }, []);

    const handleShowPickingTool = useCallback(() => {
        if (penTool.show) {
            setPenTool(old => {
                return {
                    ...old,
                    show: false,
                };
            });
        }

        if (eraserTool.show) {
            setEraserTool(old => {
                return {
                    ...old,
                    show: false,
                };
            });
        }

        setShowPickingTool(old => !old);
    }, [penTool, eraserTool]);

    const handleShowEraser = useCallback(() => {
        if (penTool.show) {
            setPenTool(old => {
                return {
                    ...old,
                    show: false,
                };
            });
        }

        if (showPickingTool) {
            setShowPickingTool(false);
        }

        setEraserTool(old => {
            const show = !old.show;
            return {
                ...old,
                show,
            };
        });
    }, [penTool, showPickingTool]);

    const handleChangeEraserWidth = useCallback(e => {
        const eraserW = Number(e.detail.value);
        if (eraserW) {
            setEraserTool(old => {
                return {
                    ...old,
                    eraserW,
                };
            });
        }
    }, []);

    const handleClearCanvas = useCallback(() => {
        const screenWidth = Taro.getSystemInfoSync().screenWidth;
        const ctx = Taro.createCanvasContext(drawLayerId);
        clearCanvas(ctx, screenWidth);
    }, []);

    const handleSave = useCallback(() => {
        save(drawLayerId);
    }, []);

    const penToolStyle = penTool.show
        ? 'transition: transform 800ms ease 0ms; transform: translateX(0); transform-origin: 50% 50% 0px;'
        : 'transition: transform 800ms ease 0ms; transform: translateX(-1100px); transform-origin: 50% 50% 0px;';

    const eraserToolStyle = eraserTool.show
        ? 'transition: transform 800ms ease 0ms; transform: translate(0, -55px); transform-origin: 50% 50% 0px;'
        : 'transition: transform 800ms ease 0ms; transform: translate(1100px, 0); transform-origin: 50% 50% 0px;';

    return (
        <View>
            <ScrollView
                className="tools"
                scrollX
                scrollWithAnimation
                lowerThreshold={20}
                upperThreshold={20}
            >
                <View className="options">
                    <View className="item" onClick={handleShowPenTool}>
                        <IconFont name="pen" color={penTool.color} size={25} />
                        <Text className="name">笔</Text>
                    </View>
                    <View className="item" onClick={handleShowGridTool}>
                        <IconFont
                            name="wangge"
                            size={25}
                            color={showGridTool ? 'green' : '#ccc'}
                        />
                        <Text className="name">网格线</Text>
                    </View>
                    <View className="item">
                        <Picker
                            range={dividingLineList}
                            onChange={handleChangeDividingLine}
                        >
                            <IconFont
                                name="flip"
                                size={25}
                                color={
                                    dividingLineTool.type !== 0
                                        ? 'green'
                                        : '#ccc'
                                }
                            />
                            <Text className="name">对称轴</Text>
                        </Picker>
                    </View>
                    <View className="item" onClick={handleShowPickingTool}>
                        <IconFont
                            name="quse"
                            size={25}
                            color={showPickingTool ? 'green' : '#ccc'}
                        />
                        <Text className="name">取色器</Text>
                    </View>
                    <View className="item" onClick={handleShowEraser}>
                        <IconFont
                            name="xiangpi"
                            size={25}
                            color={eraserTool.show ? 'green' : '#ccc'}
                        />
                        <Text className="name">橡皮</Text>
                    </View>
                    <View className="item" onClick={handleClearCanvas}>
                        <IconFont name="delete" size={25} />
                        <Text className="name">清空</Text>
                    </View>
                    <View className="item" onClick={handleSave}>
                        <IconFont name="save" size={25} />
                        <Text className="name">保存</Text>
                    </View>
                </View>
            </ScrollView>
            <View className="setting-box" style={penToolStyle}>
                <View className="slider-box">
                    <View className='label'>
                        <View>笔刷</View>
                        <View>尺寸</View>
                    </View>
                    <Slider
                        className="slider"
                        min={1}
                        max={50}
                        step={1}
                        showValue
                        blockSize={15}
                        activeColor="#000"
                        backgroundColor="#ccc"
                        blockColor="#000"
                        value={penTool.brushW}
                        onChanging={handleChangeBrushWidth}
                    />
                </View>
                <View className="color-btn" onClick={handleShowPicker}>
                    笔刷颜色
                </View>
            </View>
            {/* @ts-ignore */}
            <color-picker
                show={penTool.showPicker}
                color={penTool.color}
                onClose={handleShowPicker}
                onChange={handleChangePenColor}
            />
            <View className="setting-box" style={eraserToolStyle}>
                <View className="slider-box">
                    <View className='label'>
                        <View>橡皮</View>
                        <View>尺寸</View>
                    </View>
                    <Slider
                        className="slider"
                        min={1}
                        max={50}
                        step={1}
                        showValue
                        blockSize={15}
                        activeColor="#000"
                        backgroundColor="#ccc"
                        blockColor="#000"
                        value={eraserTool.eraserW}
                        onChange={handleChangeEraserWidth}
                    />
                </View>
            </View>
        </View>
    );
};

export default ToolBox;
